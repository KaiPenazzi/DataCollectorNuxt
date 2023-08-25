import { PrismaClient } from "@prisma/client"

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient()
    const id = event.context.params?.id

    if (id != undefined) {
        return await prisma.action.findFirst({
            where:  {
                id: Number(id),
            }
        })
    }
})