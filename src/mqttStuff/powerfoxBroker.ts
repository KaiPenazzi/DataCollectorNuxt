import prisma from "../prisma/prisma";


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
        console.log(result.length)

        for (let i = 0; i < result.length; i++) {
            this.addClient({
                id: result[i].id,
                auth: result[i].auth + ""
            })
        }
    }

    public addClient(device: Device) {

        const timer = setInterval( () => this.APICaller(device), 15000)

        console.log("datacollection is started: " + device.id)

        this.clientIntervals.set(device.id, timer)
    }

    public closeClient(deviceId: number) {
        const intervalTimer = this.clientIntervals.get(deviceId);
        if (intervalTimer) {
            clearInterval(intervalTimer); // Stop the interval associated with the specified deviceId
            this.clientIntervals.delete(deviceId); // Remove the device ID and interval timer pair from the map
            console.log("client closed: " + deviceId)
        }
    }

    private async APICaller(device: Device) {
        let res = await fetch('https://backend.powerfox.energy/api/2.0/my/main/current', {
            headers: {
                Authorization: 'Basic ' + device.auth
            }
        })

        if (res.ok) {
            let data = await res.json()
            let ret = await prisma.powerfoxData.create({
                data: {
                    timestamp: new Date(data.Timestamp * 1000),
                    watt: data.Watt,
                    powerfox: {
                        connect: { id: Number(device.id) }
                    }
                }
            })
        }
        else {
            this.closeClient(Number(device.id))
        }

        //heapdump.writeSnapshot('~/Downloads/' + Date.now() + '.heapsnapshot');
    }
}

export default powerfoxBroker