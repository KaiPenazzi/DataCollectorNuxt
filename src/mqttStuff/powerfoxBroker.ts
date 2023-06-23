import prisma from "~/prisma/prisma";

interface Device {
    id: Number;
    auth: String;
}

class powerfoxBroker {

    private clientIntervals: Map<Number, NodeJS.Timeout>;

    constructor() {
        this.clientIntervals = new Map();
        this.init()
    }

    private async init() {

        const result = await prisma.powerfox.findMany()

        for (let i = 0; i < result.length; i++) {
            this.addClient({
                id: result[i].id,
                auth: result[i].auth + ""
            })
        }
    }

    addClient(device: Device) {

        const timer = setInterval(async () => {
            fetch('https://backend.powerfox.energy/api/2.0/my/main/current', {
                headers: {
                    Authorization: 'Basic ' + device.auth
                }
            })
                .then(response => response.json())
                .then(data => {
                    // Process the response data
                    prisma.powerfoxData.create({
                        data: {
                            timestamp: new Date(data.Timestamp * 1000),
                            watt: data.Watt,
                            powerfox: {
                                connect: { id: Number(device.id) }
                            }
                        }
                    })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                })
                .catch(error => {
                    // Handle any errors that occurred during the request
                    console.log(error);
                    this.closeClient(Number(device.id))
                });

        }, 15000)

        console.log("datacollection is started: " + device.id)

        this.clientIntervals.set(device.id, timer)
    }

    closeClient(deviceId: number) {
        const intervalTimer = this.clientIntervals.get(deviceId);
        if (intervalTimer) {
            clearInterval(intervalTimer); // Stop the interval associated with the specified deviceId
            this.clientIntervals.delete(deviceId); // Remove the device ID and interval timer pair from the map
        }
    }

}

export default powerfoxBroker