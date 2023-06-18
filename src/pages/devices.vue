<script setup>
definePageMeta({
    middleware: [
        'auth'
    ]
})

const { data: devices } = await useFetch('/api/devices')

function openAdd() {
    navigateTo({
        path: "/device/add"
    })
}

function remove(id) {
    useFetch('/api/device/' + id, {
        method: "delete"
    })
    location.reload(true);
}

function edit(id) {
    navigateTo({
        path: "/device/" + id
    })
}
</script>

<template>
    <button class="btn btn-success" @click="openAdd">add</button>
    <table class="table">
        <tbody>
            <tr v-for="item in devices">
                <td>
                    <div class="card">
                        <div class="card-header">{{ item.name }}</div>
                        <div class="card-body">
                            <p>{{ item.username }}</p>
                            <p>{{ item.device_id }}</p>
                        </div>
                    </div>
                </td>
                <td class="col-3">
                    <button class="btn btn-danger" @click="remove(item.id)">remove</button>
                    <button class="btn btn-primary" @click="edit(item.id)">edit</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>