<script setup>

definePageMeta({
    middleware: [
        'auth'
    ]
})

let name = ref(0)
let startAction = ref(0)
let stopAction = ref(0)
let state = ref(0)
let deviceid = ref(0)

function sendDevice() {
    console.log(deviceid.value)

    useFetch("/api/action/add", {
        method: 'post',
        body: {
            name: name.value.value,
            startAction: startAction.value.value,
            stopAction: stopAction.value.value,
            state: Boolean(state.value.checked),
            deviceid: Number(deviceid.value.value)
        }
    })

    navigateTo({
        path: '/actions'
    })
}

const {data: devices} = await useFetch('/api/devices')

</script>

<template>
    <div class="card">
        <div class="card-header">add new action</div>
        <div class="card-body">
            <input class="form-control" type="text" ref="name" placeholder="name" />
            <select class="form-control" ref="deviceid" placeholder="device">
                <option v-for="device in devices" :value="device.id">
                    {{ device.name }}
                </option>
            </select>
            <input class="form-control" type="text" ref="startAction" placeholder="start action" />
            <input class="form-control" type="text" ref="stopAction" placeholder="stop action" />
            <div class="form-check form-switch"><input class="form-check-input" type="checkbox" ref="state" /></div>
        </div>
        <div class="card-footer">
            <button class="btn btn-success" @click="sendDevice">add</button>
        </div>
    </div>
</template>