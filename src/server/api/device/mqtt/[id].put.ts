
export default defineEventHandler(async (event) => {
    const id = event.context.params?.id
    const device = await readBody(event)

    if (id != undefined) {
        return await prisma.device.update({
            where:  {
                id: Number(id),
            },
            data: device
        })
    }
})