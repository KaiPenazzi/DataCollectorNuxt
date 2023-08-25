import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient()
    const id = event.context.params?.id;

    if (id != undefined) {
        const result =  await prisma.action.delete({
            where: {
                id: parseInt(id)
            }
        })

        mqttBroker.endClient(result.id)
    }
})