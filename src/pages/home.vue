<script setup>

definePageMeta({
    middleware: [
        'auth'
    ]
})

const { data } = await useFetch('/api/data/overview')

const router = useRouter()

setInterval(() => {
    router.go(0)
}, 10000)

function formatDate(timestamp) {
    let date = new Date(timestamp)
    return date.toLocaleString('de')
}

function openData(id) {
    navigateTo('/data/mqtt/' + id)
}

</script>

<template>
    <table class="table">
        <tbody>
            <tr v-for="item in data.powerfox">
                <div class="card">
                    <div class="card-header"><a @click="openDataPF(item.powerfox.id)" style="text-decoration: underline;">{{
                        item.powerfox.name }} | {{ formatDate(item.data.timestamp) }}</a></div>
                    <div class="card-body">
                        {{ item.data.watt }}
                    </div>
                </div>
            </tr>
            <tr v-for="item in data.mqtt">
                <td>
                    <div class="card">
                        <div class="card-header"><a @click="openData(item.device.id)" style="text-decoration: underline;">{{
                            item.device.name }} | {{ formatDate(item.data.received_at) }}</a></div>
                        <div class="card-body">
                            <ul>
                                <li v-for="(value, key) in item.data.uplink_message.decoded_payload" :key="key">
                                    {{ key }}: {{ value }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>