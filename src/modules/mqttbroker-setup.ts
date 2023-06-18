import { defineNuxtModule } from 'nuxt/kit'
import broker from '../mqttStuff/broker'
import prisma from '../prisma/prisma'

export default defineNuxtModule({
    meta:{
        name: "start listening to devices"
    },
    async setup() {
        const result = await prisma.device.findMany()

        for (let i = 0; i < result.length; i++) {
            broker.addClient(result[i])
        }
    }
})