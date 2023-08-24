import {MqttClient, connect} from 'mqtt';

interface Device {
    id: Number;
    username: string;
    device_id: string;
    key: string;
}

interface MQTTClientCstm extends MqttClient {
    id: Number;
}

class MqttBroker {
    private clients: MQTTClientCstm[] = [];

    constructor() {
        this.init()
    }

    private async init() {
        const result = await prisma.device.findMany()

        for (let i = 0; i < result.length; i++) {
            this.addClient({
                id: result[i].id,
                username: result[i].username + "",
                device_id: result[i].device_id + "",
                key: result[i].key + ""
            })
        }
    }

    public addClient(device: Device): void {
        const topic = `v3/${device.username}@ttn/devices/${device.device_id}/up`;
        const client = connect("mqtt://eu1.cloud.thethings.network", {
            username: device.username,
            password: device.key
        }) as MQTTClientCstm;

        client.on("connect", () => {
            console.log(`device: ${device.username} connected: ${client.connected}`);
            client.id = device.id;
            this.clients.push(client);
        });

        client.subscribe(topic);

        client.on("message", async (topic, msg) => {
            await prisma.data.create({
                data: {
                    collectedDate: new Date(),
                    dataString: msg.toString(),
                    device: {
                        connect: { id: Number(device.id) }
                    }
                }
            });
        });

        client.on('error', function (error) {
            client.end();
        });
    }

    public getClient(id: Number): MQTTClientCstm | undefined {
        return this.clients.find(client => client.id == id);
    }

    public sendMSG(device: Device, data: string): void {
        const client = this.getClient(device.id);

        const publish_topic = `v3/${device.username}/devices/${device.device_id}/down/push`;
        const payload = hexToBase64(data);

        const message = {
            "downlinks": [{
                "f_port": 5,
                frm_payload: payload,
                "priority": "NORMAL"
            }]
        };

        client?.publish(publish_topic, JSON.stringify(message), (err) => {
            if (err) {
                console.log(err);
                return;
            }
        });
    }

    public endClient(id: Number) {
        this.getClient(id)?.end()
    }
}

const mqttBroker = new MqttBroker()

export default mqttBroker;
