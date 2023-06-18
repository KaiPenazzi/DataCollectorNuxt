import prisma from '../../../prisma/prisma'
import cookieParser from '../../../tools/cookieParser'

export default defineEventHandler(async (event) => {
    const result = "err"
    
    const device = await readBody(event)
    const cookies = cookieParser(event.node.req.headers.cookie)

    const user = await prisma.user.findUnique({
        where: {
            email: cookies["email"]
        }
    })
    
    if (user != null) {
        const result = await prisma.device.create({
            data: {
                name: device.name,
                username: device.username,
                device_id: device.device_id,
                key: device.key,
                user: {
                    connect: {id: user.id}
                }
            }
        })

        return result
    }

    return result
})