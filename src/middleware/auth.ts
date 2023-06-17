//import prisma from '../prisma/prisma'

export default defineNuxtRouteMiddleware(async (to, from) => {
    // skip middleware on client side entirely

    const userSend = {
        email: useCookie("email"),
        psw: useCookie("psw")
    }

    let {data: user} = await useFetch('/api/checkUser', {
        method: "post",
        body: userSend
    })

    if (user.value) {
        return
    }

    return navigateTo('/user/login')
})