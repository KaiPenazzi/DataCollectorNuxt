import cookieParser from '../../../../tools/cookieParser'

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;

    if (id != undefined) {
        const result =  await prisma.powerfox.delete({
            where: {
                id: parseInt(id)
            }
        })
        
        if (result) {
            PFBroker.closeClient(result.id)
        }

        return result
    }
})
