import prisma from '../../../prisma/prisma'
import cookieParser from '../../../tools/cookieParser'

export default defineEventHandler(async (event) => {
    const deviceId = event.context.params?.id

    if (deviceId != undefined) {
        const device = await prisma.device.findUnique({
            where:  {
                id: Number(deviceId),
            },
            include: {
                data: true,
            }
        })

        if (!device) {
            return [];
        }

        return device.data
    }
})