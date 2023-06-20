import {MqttClient, connect} from 'mqtt';
import hexToBase64 from '../tools/hexToBase64';
import prisma from '../prisma/prisma';

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
    private static clients: MQTTClientCstm[] = [];
    private static anz: number = 0;

    constructor() {
        MqttBroker.anz++;
        console.log("constructor call: " + MqttBroker.anz)
    }

    public addClient(device: Device): void {
        const topic = `v3/${device.username}/devices/${device.device_id}/up`;
        const client = connect("mqtt://eu1.cloud.thethings.network", {
            username: device.username,
            password: device.key
        }) as MQTTClientCstm;

        client.on("connect", () => {
            console.log(`device: ${device.username} connected: ${client.connected}`);
            client.id = device.id;
            MqttBroker.clients.push(client);
            console.log("clients length: " + MqttBroker.clients.length)
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
            console.log("Can't connect" + error);
            client.end();
        });
    }

    public getClient(id: Number): MQTTClientCstm | undefined {
        console.log("clients length: " + MqttBroker.clients.length)
        return MqttBroker.clients.find(client => client.id == id);
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

            console.log("Message sent");
        });
    }

    public endClient(id: Number) {
        console.log("end Client: " + id)
        this.getClient(id)?.end()
    }
}

export default MqttBroker;
