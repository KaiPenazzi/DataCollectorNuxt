import prisma from '../../../prisma/prisma'
import cookieParser from '../../../tools/cookieParser'

export default defineEventHandler(async (event) => {
    let mqtt: any[] = [];
    let powerfox: any[] = [];
    const cookies = cookieParser(event.node.req.headers.cookie)

    const user = await prisma.user.findUnique({
        where: {
            email: cookies["email"],
        },
        include: {
            devices: true,
            powerfox: true,
        },
    });

    if (!user) {
        return []; // oder eine geeignete Fehlerbehandlung
    }

    for (let i = 0; i < user.devices.length; i++) {
        const lastItem = await prisma.data.findFirst({
            where: {
              deviceid: Number(user.devices[i].id),
            },
            orderBy: {
              collectedDate: 'desc',
            },
        });

        if (lastItem) {
            mqtt.push({
                device: user.devices[i],
                data: JSON.parse(lastItem?.dataString + "")
            })
        }
        else {
            mqtt.push({
                device: user.devices[i],
                data: {uplink_message: {decoded_payload: {msg: "wait for the first message"}}}
            })
        }
    }

    for (let i = 0; i < user.powerfox.length; i++) {
        const lastItem = await prisma.powerfoxData.findFirst({
            where: {
              powerfoxid: Number(user.powerfox[i].id),
            },
            orderBy: {
              timestamp: 'desc',
            },
        });

        if (lastItem) {
            powerfox.push({
                powerfox: user.powerfox[i],
                data: lastItem
            })
        }
        else {
            powerfox.push({
                powerfox: user.powerfox[i],
                data: "no data"
            })
        }
    }

    return {
        mqtt,
        powerfox
    };
})