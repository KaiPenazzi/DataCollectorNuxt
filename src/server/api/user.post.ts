import { PrismaClient } from "@prisma/client"

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient()
    const user = await readBody(event)
    
    const result = await prisma.user.create({
        data: {
            email: user.email,
            password: user.password
        }
    })

    return result
})