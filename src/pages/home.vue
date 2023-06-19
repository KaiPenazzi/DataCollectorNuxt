<script setup>

definePageMeta({
    middleware: [
        'auth'
    ]
})

const { data } = await useFetch('/api/data/overview')

const router = useRouter()

setInterval(()=> {
    router.go(0)
}, 10000)

function formatDate(timestamp) {
    let date = new Date(timestamp)
    return date.toLocaleString('de')
}

</script>

<template>
    <table class="table">
        <tbody>
            <tr v-for="item in data">
                <td>
                    <div class="card">
                        <div class="card-header">{{ item.device.name }} |  {{formatDate(item.data.received_at)}}</div>
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