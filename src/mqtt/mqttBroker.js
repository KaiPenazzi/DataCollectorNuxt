const mqtt = require('mqtt')
const hexToBase64 = require('../tools/hexToBase64')

import prisma from '../../prisma/prisma'

class mqttBroker {

    constructor() {
        this.clients = []
    }

    addClient(device) {
        device.port = 1883;
        var topic = 'v3/' + device.username + '/devices/' + device.device_id + '/up'
        var client = mqtt.connect("mqtt://eu1.cloud.thethings.network", device)

        client.on("connect", () => {
            console.log('device : ' + device.username + " connected: " + client.connected)
            client.id = device.id
            this.clients.push(client)
        })

        client.subscribe(topic, { pos: 1 })

        client.on("message", async (topic, msg) => {

            console.log(await prisma.user.create({
                data: {
                    collectedDate: new Date(),
                    dataString: msg,
                    device: {
                        connect: {id: device.id}
                    }
                }
            }))
        })

        client.on('error', function (error) {
            console.log("Can't connect" + error);
            client.end()
        });
    }

    getClient(id) {
        for (let i = 0; i < this.clients.length; i++) {
            if (this.clients[i].id == id) {
                return this.clients[i]
            }
        }
    }

    sendMSG(device, data) {
        var client = this.getClient(device.username)

        var publish_topic = 'v3/' + device.username + '/devices/' + device.device_id + '/down/push'
        var payload = hexToBase64.hexToBase64(data)

        var message = {
            "downlinks": [{
                "f_port": 5,
                frm_payload: payload,
                "priority": "NORMAL"
            }]
        }

        client.publish(publish_topic, JSON.stringify(message), (err) => {
            if (err) {
                console.log(err)
                return
            }

            console.log("Message send")
        })
    }
}

module.exports = mqttBroker