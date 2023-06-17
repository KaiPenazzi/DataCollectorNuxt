import { PrismaClient } from "@prisma/client"

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient()
    const device = await readBody(event)
    
    const result = await prisma.device.create({
        data: {
            name: device.name,
            username: device.username,
            device_id: device.device_id,
            key: device.key,
            user: {
                connect: {id: device.userId}
            }
        }
    })

    return result
})