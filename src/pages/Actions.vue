<script setup>

definePageMeta({
    middleware: [
        'auth'
    ]
})

const {data: actions} = useFetch('/api/actions')

function openAdd() {
    navigateTo('/action/add')
}

function edit(id) {
    navigateTo('/action/' + id)
}

</script>

<template>
    <button class="btn btn-success" @click="openAdd">add</button>
    <table class="table">
        <tbody>
            <tr v-for="item in actions">
                <td>
                    <div class="card">
                        <div class="card-header">{{ item.name }}</div>
                        <div class="card-body">
                            <div class="form-check form-switch"><input class="form-check-input" type="checkbox" :checked="item.state"/></div>
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