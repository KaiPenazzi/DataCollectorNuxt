import prisma from "../../../../prisma/prisma";

interface Graphdata {
    x: String;
    y: String;
}

interface TransformedData {
    title: string;
    data: Graphdata[];
}

export default defineEventHandler(async (event) => {
    const deviceId = event.context.params?.id

    if (deviceId != undefined) {
        const device = await prisma.powerfox.findUnique({
            where: {
                id: Number(deviceId),
            },
            include: {
                data: true,
            }
        })

        if (!device) {
            return [];
        }

        return device
    }
})