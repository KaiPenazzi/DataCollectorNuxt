<script setup>
import { onMounted } from 'vue';

definePageMeta({
    middleware: [
        "auth"
    ]
})

const route = useRoute()

let name = ref(0)
let username = ref(0)
let device_id = ref(0)
let key = ref(0)


const {data: device} = await useFetch('/api/device/' + route.params.id)

onMounted(()=> {
    name.value.value = device.value.name
    username.value.value = device.value.username
    device_id.value.value = device.value.device_id
    key.value.value = device.key
})

function updateDevice() {
    useFetch('/api/device/' + route.params.id, {
        method: "put",
        body: {
            name: name.value.value,
            username: username.value.value,
            device_id: device_id.value.value,
            key: key.value.value
        }
    })

    navigateTo({
        path: "/devices"
    })
}

</script>

<template>
    <div class="card">
        <div class="card-header">update device</div>
        <div class="card-body">
            <input class="form-control" type="text" ref="name" placeholder="name" />
            <input class="form-control" type="text" ref="username" placeholder="username" />
            <input class="form-control" type="text" ref="device_id" placeholder="device id" />
            <input class="form-control" type="text" ref="key" placeholder="key" />
        </div>
        <div class="card-footer">
            <button class="btn btn-success" @click="updateDevice">update</button>
        </div>
    </div>
</template>