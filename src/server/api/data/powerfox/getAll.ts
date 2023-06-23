import prisma from "../../../../prisma/prisma"

export default defineEventHandler(async (event) => {
    const res = prisma.powerfoxData.findMany()

    return res
})