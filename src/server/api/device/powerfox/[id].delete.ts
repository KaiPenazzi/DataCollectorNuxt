import { PrismaClient } from '@prisma/client';
import cookieParser from '../../../../tools/cookieParser'

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient()
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
