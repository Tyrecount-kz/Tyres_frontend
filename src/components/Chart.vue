<script>
  import { Line } from 'vue-chartjs'

  export default {
    extends: Line,
    data () {
      return {
        chartData: {
          labels: ["Toyota Camry",	"Mercedez",	"Daegu",	"Jerusalem",	"Fairfield",	"New York",	"Gangtok", "Buenos Aires", "Hafar Al-Batin", "Idlib"],
          datasets: [
            {
              label: 'Price',
              data: [600,	1150,	342,	6050,	2522,	3241,	1259,	157,	1545, 9841],
              fill: false,
              borderColor: '#2554FF',
              backgroundColor: '#2554FF',
              borderWidth: 1
            },
            {
              label: 'Mileage',
              data: [6000,	150, 32, 60500,	25222,	30241,	259, 157,	1545, 9841],
              fill: false,
              borderColor: '#32a852',
              backgroundColor: '#32a852',
              borderWidth: 1
            },
            {
              label: 'Engine Volume',
              data: [600,	1150,	342,	6050,	2522,	3241,	1259,	157,	1545, 9841],
              fill: false,
              borderColor: '#9e0da8',
              backgroundColor: '#9e0da8',
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted () {
      this.renderChart(this.chartData, this.options)
    }
  }
</script>