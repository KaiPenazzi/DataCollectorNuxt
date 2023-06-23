<script setup>
import { onMounted } from 'vue';

definePageMeta({
    middleware: [
        'auth'
    ]
})

const route = useRoute()
const { data } = await useFetch("/api/data/powerfox/" + route.params.id)

onMounted(async () => {
    var arr = []

    for (let i = 0; i < data.value.data.length; i++) {
        arr.push({
            x: new Date(data.value.data[i].timestamp),
            y: data.value.data[i].watt
        })
    }

    var dataset = {
        theme: "light2",
        title: {
            text: "Watt"
        },
        axisX: {
            valueFormatString: "DD-MM-YY HH:mm",
            type: 'dateTime', // Specify the type as 'dateTime'
        },
        data: [{
            type: "line",
            indexLabelFontSize: 16,
            dataPoints: arr
        }]
    }

    var chart = new CanvasJS.Chart("space", dataset);
    chart.render();
    

})
</script>

<template>
    <table class="table">
        <tbody>
            <tr>
                <td>
                    <div class="card">
                        <div class="card-body">
                            <div id="space" style="height: 300px; width: 100%;"></div>
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>