import prisma from '../../../prisma/prisma'
import cookieParser from '../../../tools/cookieParser'

interface Graphdata {
    x: String;
    y: String;
}

interface TransformedData {
    title: string;
    data: Graphdata[];
  }

export default defineEventHandler(async (event) => {
    const deviceId = event.context.params?.id

    if (deviceId != undefined) {
        const device = await prisma.device.findUnique({
            where: {
                id: Number(deviceId),
            },
            include: {
                data: true,
            }
        })

        if (!device) {
            return [];
        }

        const transformedArray: TransformedData[] = [];

        for (const obj of device.data) {
            const data = JSON.parse(obj.dataString + "")
            const keys = Object.keys(data.uplink_message.decoded_payload)

            for (const key of keys) {
                const title = key
                const date = new Date(data.received_at)
                const x = date.toString()
                const y = data.uplink_message.decoded_payload[key]

                const existingEntry = transformedArray.find((entry) => entry.title === title);

                if (existingEntry) {
                    existingEntry.data.push({
                        x,
                        y
                    });
                }
                else {
                    const newEntry:TransformedData = {
                        title,
                        data: [{
                            x,
                            y
                        }]
                    };
                    transformedArray.push(newEntry);
                }
            }

        }
        
        return transformedArray
    }
})