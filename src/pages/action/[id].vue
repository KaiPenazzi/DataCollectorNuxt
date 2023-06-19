<script setup>
import { onMounted } from 'vue';

definePageMeta({
    middleware: [
        "auth"
    ]
})

const route = useRoute()

let name = ref(0)
let startAction = ref(0)
let stopAction = ref(0)
let state = ref(0)
let deviceid = ref(0)


const {data: action} = await useFetch('/api/action/' + route.params.id)

onMounted(()=> {
    name.value.value = action.value.name
    startAction.value.value = action.value.startAction
    stopAction.value.value = action.value.stopAction
    state.value.checked = action.value.state
    deviceid.value.value = action.value.deviceid
})

function updateDevice() {
    useFetch('/api/action/' + route.params.id, {
        method: "put",
        body: {
            name: name.value.value,
            startAction: startAction.value.value,
            stopAction: stopAction.value.value,
            state: Boolean(state.value.checked)
        }
    })

    navigateTo({
        path: "/actions"
    })
}

</script>

<template>
    <div class="card">
        <div class="card-header">update action</div>
        <div class="card-body">
            <input class="form-control" type="text" ref="name" placeholder="name" />
            <input class="form-control" type="text" ref="deviceid" placeholder="device"/>
            <input class="form-control" type="text" ref="startAction" placeholder="start action" />
            <input class="form-control" type="text" ref="stopAction" placeholder="stop action" />
            <div class="form-check form-switch"><input class="form-check-input" type="checkbox" ref="state"/></div>
        </div>
        <div class="card-footer">
            <button class="btn btn-primary" @click="updateDevice">update</button>
        </div>
    </div>
</template>