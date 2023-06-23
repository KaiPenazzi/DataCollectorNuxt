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

async function remove(id) {
    const confirmed = confirm("confirm to remove the device")

    if (confirmed) {
        // DELETE-Anfrage an die API senden
        await useFetch('/api/device/mqtt/' + id, {
            method: 'delete'
        });

        // Seite neu laden
        location.reload(true);
    }
}

function edit(id) {
    navigateTo({
        path: "/device/mqtt" + id
    })
}

async function removePF(id) {
    const confirmed = confirm("confirm to remove the device")

    if (confirmed) {
        // DELETE-Anfrage an die API senden
        await useFetch('/api/device/powerfox/' + id, {
            method: 'delete'
        });

        // Seite neu laden
        location.reload(true);
    }
}

</script>

<template>
    <button class="btn btn-success" @click="openAdd">add</button>
    <table class="table">
        <tbody>
            <tr v-for="item in devices.devices">
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
            <tr v-for="item in devices.powerfox">
                <td>
                    <div class="card">
                        <div class="card-header">{{ item.name }}</div>
                        <div class="card-body">
                        </div>
                    </div>
                </td>
                <td class="col-3">
                    <button class="btn btn-danger" @click="removePF(item.id)">remove</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>