import { PrismaClient } from "@prisma/client"

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient()
    const id = event.context.params?.id

    if (id != undefined) {
        const action =  await prisma.action.findFirst({
            where:  {
                id: Number(id),
            },
            include: {
                device: true
            }
        })

        if (action) {
            if (action?.state) {
                mqttBroker.sendMSG({
                    id: Number(action.device?.id),
                    username: action.device?.username + "",
                    device_id: action.device?.device_id + "",
                    key: action.device?.key + "",
                }, action.stopAction + "")

                return await prisma.action.update({
                    where:  {
                        id: Number(id),
                    },
                    data: {
                        state: false
                    }
                })
            }
            else {
                mqttBroker.sendMSG({
                    id: Number(action.device?.id),
                    username: action.device?.username + "",
                    device_id: action.device?.device_id + "",
                    key: action.device?.key + "",
                }, action?.startAction + "")

                return await prisma.action.update({
                    where:  {
                        id: Number(id),
                    },
                    data: {
                        state: true
                    }
                })
            }
        }
    }
})