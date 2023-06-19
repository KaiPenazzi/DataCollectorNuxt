import prisma from '../../../prisma/prisma'

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id
    const device = await readBody(event)

    if (id != undefined) {
        return await prisma.action.update({
            where:  {
                id: Number(id),
            },
            data: device
        })
    }
})