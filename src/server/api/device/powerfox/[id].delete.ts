import prisma from '../../../../prisma/prisma'
import cookieParser from '../../../../tools/cookieParser'
import broker from '../../../../mqttStuff/broker';

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;

    if (id != undefined) {
        const result =  await prisma.powerfox.delete({
            where: {
                id: parseInt(id)
            }
        })

    }
})
