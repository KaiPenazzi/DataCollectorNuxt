import prisma from '../../prisma/prisma'

export default defineEventHandler(async (event) => {
    const user = await readBody(event)
    
    const result = await prisma.user.create({
        data: {
            email: user.email,
            password: user.password
        }
    })

    return result
})