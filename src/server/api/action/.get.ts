import prisma from '../../../prisma/prisma'
import cookieParser from '../../../tools/cookieParser'

export default defineEventHandler(async (event) => {
    const cookies = cookieParser(event.node.req.headers.cookie)

    const user = await prisma.user.findUnique({
        where: {
            email: cookies["email"],
        },
        include: {
            actions: true,
        },
    });

    if (!user) {
        return []; // oder eine geeignete Fehlerbehandlung
    }

    return user.actions;
})