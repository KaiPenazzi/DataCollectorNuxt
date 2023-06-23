import prisma from '../../../../prisma/prisma'
import cookieParser from '../../../../tools/cookieParser'
import broker from '../../../../mqttStuff/broker'
import stringToBase64 from '../../../../tools/stringToBase64'
import { PFBroker } from '../../../../mqttStuff/deviceBrokers'

export default defineEventHandler(async (event) => {
    const result = "err"

    const powerfox = await readBody(event)
    const cookies = cookieParser(event.node.req.headers.cookie)

    const user = await prisma.user.findUnique({
        where: {
            email: cookies["email"]
        }
    })

    if (user != null) {

        const result = await prisma.powerfox.create({
            data: {
                name: powerfox.name,
                auth: stringToBase64(powerfox.username + ":" + powerfox.password),
                user: {
                    connect: { id: user.id }
                }
            }
        })

        PFBroker.addClient({
            id: result.id,
            auth: result.auth + ""
        })

        return result
    }

    return result
})