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

onMounted(async ()=> {
    const device = await useFetch('/api/device/' + route.params.id)

    name.value.value = device.name
    username.value.value = device.username
    device_id.value.value = device.device_id
    key.value.value = device.key
})

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