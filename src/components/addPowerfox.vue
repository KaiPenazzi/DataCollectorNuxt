<script setup>

const namePF = ref(0)
const usernamePF = ref(0)
const passwordPF = ref(0)

function AddPF() {
    useFetch('/api/device/powerfox', {
        method: 'post',
        body: {
            name: namePF.value.value + "",
            username: usernamePF.value.value + "",
            password: passwordPF.value.value + ""
        }
    })

    navigateTo('/devices')
}

</script>

<template>
    <div class="card">
        <div class="card-header">
            <input class="form-control" type="text" placeholder="name" ref="namePF"/>
        </div>
        <div class="card-body">
            <input class="form-control" type="text" placeholder="username for powerfox" ref="usernamePF"/>
            <input class="form-control" type="password" placeholder="password for Powerfox" ref="passwordPF"/>
        </div>
        <div class="card-footer">
            <button class="btn btn-success" @click="AddPF">add</button>
        </div>
    </div>
</template>