<script setup>
definePageMeta({
    middleware: [
        'auth'
    ]
})

const {data: devices} = await useFetch('/api/devices')

</script>

<template>
    <div class="card" v-for="item in devices">
        <div class="card-header">{{ item.name }}</div>
        <div class="card-body">
            <p>{{ item.username }}</p>
            <p>{{ item.device_id }}</p>
        </div>
    </div>
</template>