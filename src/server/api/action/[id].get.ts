import prisma from '../../../prisma/prisma'

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id

    if (id != undefined) {
        return await prisma.action.findFirst({
            where:  {
                id: Number(id),
            }
        })
    }
})