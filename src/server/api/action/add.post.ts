import prisma from '../../../prisma/prisma'
import cookieParser from '../../../tools/cookieParser'

export default defineEventHandler(async (event) => {
    const result = "err"

    const action = await readBody(event)
    const cookies = cookieParser(event.node.req.headers.cookie)

    const user = await prisma.user.findUnique({
        where: {
            email: cookies["email"]
        }
    })

    console.log(action)

    if (user != null ) {
        const result = await prisma.action.create({
            data: {
                name: action.name,
                startAction: action.startAction,
                stopAction: action.stopAction,
                state: Boolean(action.state),
                user: {
                    connect: { id: user.id }
                },
                device: {
                    connect: {id: action.deviceid}
                }
            }
        })

        return result
    }

    return result
})