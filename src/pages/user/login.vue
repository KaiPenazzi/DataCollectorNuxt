<script setup>
import { ref } from 'vue'

const email = ref(null)
const psw = ref(null)

let date = new Date()
date.setMonth(date.getMonth() + 3)

function login() {
    document.cookie = 'email=' + email.value.value + '; expires=' + date + ' ; path=/'
    document.cookie = 'psw=' + psw.value.value + '; expires=' + date + ' ; path=/'
    navigateTo('/home')
}
</script>

<template>
    <h2>Login</h2>

    <div class="card">
        <div class="card-body">
            <input class="form-control" ref="email" type="email" placeholder="email" />
            <input class="form-control" ref="psw" type="password" placeholder="Password" />
        </div>
        <div class="card-footer">
            <button class="btn btn-success" id="login" @click="login">login</button>
        </div>
    </div>
</template>



