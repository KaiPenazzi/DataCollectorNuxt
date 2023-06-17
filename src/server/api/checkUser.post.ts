import prisma from '../../prisma/prisma'

export default defineEventHandler(async (event) => {
    const user = await readBody(event)

    if (user.email != undefined && user.psw != undefined) {
        const result = await prisma.user.findMany({
            where: {
                email: user.email,
                password: user.psw
            }
        })
        return result
    }

    return
})