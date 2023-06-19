<template>
    <Line id="my-chart-id" :data="data()" />
</template>
  
<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(LineElement, CategoryScale, LinearScale)

export default {
    name: 'LineChart',
    components: { Line },
    data() {
        return {
            labels: ['January', 'February', 'March'],
            chartData: {
                datasets: [{
                    label: 'Data One',
                    backgroundColor: '#f87979',
                    data: [40, 20, 12]
                }]
            }
        }
    }
}
</script>