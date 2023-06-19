import prisma from '../../../prisma/prisma'
import cookieParser from '../../../tools/cookieParser'

export default defineEventHandler(async (event) => {
    let retArry: any[] = [];
    const cookies = cookieParser(event.node.req.headers.cookie)

    const user = await prisma.user.findUnique({
        where: {
            email: cookies["email"],
        },
        include: {
            devices: true,
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

        retArry.push({
            device: user.devices[i],
            data: JSON.parse(lastItem?.dataString + "")
        })
    }

    return retArry;
})