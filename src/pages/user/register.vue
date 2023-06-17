<script setup>
import { ref } from 'vue'

const email = ref(null)
const psw = ref(null)

let date = new Date()
date.setMonth(date.getMonth() + 3)

function login() {
    document.cookie = 'email=' + email.value.value + '; expires=' + date + ' ; path=/'
    document.cookie = 'psw=' + psw.value.value + '; expires=' + date + ' ; path=/'
    window.open('/test', '_self')
}

function register() {
    useFetch('/api/user', {
        method: 'post',
        body: {
            email: email.value.value,
            password: psw.value.value
        }
    })

    login()
}

</script>

<template>
    <h2>Register</h2>

    <div class="card">
        <div class="card-body">
            <input class="form-control" ref="email" type="email" placeholder="email" />
            <input class="form-control" ref="psw" type="password" placeholder="Password" />
        </div>
        <div class="card-footer">
            <button class="btn btn-success" id="login" @click="register">login</button>
        </div>
    </div>
</template>