import prisma from '../prisma/prisma'

export default defineNuxtRouteMiddleware(async (to, from) => {
    // skip middleware on client side entirely
    if (process.client) return

    const email = useCookie("email");
    const psw = useCookie("psw");

    if (email.value != undefined && psw.value != undefined) {
        const res = await prisma.user.findMany({
            where: {
                email: email.value,
                password: psw.value
            }
        })

        if (res.length == 1) {
            return
        }
    }

    return navigateTo('/login')
})