import prisma from '../../../prisma/prisma'
import broker from '../../../mqttStuff/broker';

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;

    if (id != undefined) {
        const result =  await prisma.action.delete({
            where: {
                id: parseInt(id)
            }
        })

        broker.endClient(result.id)
    }
})