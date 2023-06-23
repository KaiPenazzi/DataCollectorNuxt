import prisma from '../../../../prisma/prisma'
import cookieParser from '../../../../tools/cookieParser'
import broker from '../../../../mqttStuff/broker';

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id

    if (id != undefined) {
        return await prisma.device.findFirst({
            where:  {
                id: Number(id),
            }
        })
    }
})