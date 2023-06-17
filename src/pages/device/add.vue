<script setup>
definePageMeta({
    middleware: [
        'auth'
    ]
})

const name = ref(0)
const username = ref(0)
const device_id = ref(0)
const key = ref(0)

function sendDevice()  {
    useFetch("/api/device", {
        method: 'post',
        body: {
            name: name.value.value,
            username: username.value.value,
            device_id: device_id.value.value,
            key: key.value.value
        }
    })

    window.open('/devices', '_self')
}

</script>

<template>
    <div class="card">
        <div class="card-header">add new device</div>
        <div class="card-body">
            <input class="form-control" type="text" ref="name" placeholder="name" />
            <input class="form-control" type="text" ref="username" placeholder="username" />
            <input class="form-control" type="text" ref="device_id" placeholder="device id" />
            <input class="form-control" type="text" ref="key" placeholder="key" />
        </div>
        <div class="card-footer">
            <button class="btn btn-success" @click="sendDevice">add</button>
        </div>
    </div>
</template>