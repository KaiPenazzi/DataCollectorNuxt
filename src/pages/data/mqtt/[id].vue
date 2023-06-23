<script setup>
import { onMounted } from 'vue';

definePageMeta({
    middleware: [
        'auth'
    ]
})

const route = useRoute()
const { data } = await useFetch('/api/data/mqtt/' + route.params.id)

onMounted( async () => {


    for (const item of data.value) {
        var arr = []

        for(let i = 0; i < item.data.length; i++) {
            arr.push({
                x: new Date(item.data[i].x),
                y: item.data[i].y
            })
        }


        var dataset = {
            theme: "light2",
            title: {
                text: item.title
            },
            axisX:{      
                valueFormatString: "DD-MM-YY HH:mm" ,
                type: 'dateTime', // Specify the type as 'dateTime'
            },
            data: [{
                type: "line",
                indexLabelFontSize: 16,
                dataPoints: arr
            }]
        }

        var chart = new CanvasJS.Chart(item.title , dataset);
        chart.render();
    }

})
</script>

<template>
    <table class="table">
        <tbody>
            <tr v-for="item in data">
                <td>
                    <div class="card">
                        <div class="card-body">
                            <div :id="item.title" style="height: 300px; width: 100%;"></div>
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>