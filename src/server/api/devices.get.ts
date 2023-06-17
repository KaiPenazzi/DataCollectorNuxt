import prisma from '../../prisma/prisma'

export default defineEventHandler(async (event) => {
    const result = await prisma.device.findMany()

    return result
})