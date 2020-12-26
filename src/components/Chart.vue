<script>
  import { Line } from 'vue-chartjs';
  //import axios from 'axios'
  import {
      // mapActions,
      // mapGetters
  } from 'vuex';

  export default {
    extends: Line,
    data () {
      return {
        chartData: {
          // cars titles  
          labels: ["Toyota Camry",	"Mercedez",	"Daegu",	"Jerusalem",	"Fairfield",	"New York",	"Gangtok", "Buenos Aires", "Hafar Al-Batin", "Idlib"],
          datasets: [
            {
              label: 'Price',
              // prices
              data: [600,	1150,	342,	6050,	2522,	3241,	1259,	157,	1545, 9841],
              fill: false,
              borderColor: '#2554FF',
              backgroundColor: '#2554FF',
              borderWidth: 1
            },
            {
              label: 'Year',
              // years
              data: [6000,	150, 32, 60500,	25222,	30241,	259, 157,	1545, 9841],
              fill: false,
              borderColor: '#32a852',
              backgroundColor: '#32a852',
              borderWidth: 1
            },
            {
              label: 'Engine Volume',
              // engine volumes
              data: [600,	1150,	342,	6050,	2522,	3241,	1259,	157,	1545, 9841],
              fill: false,
              borderColor: '#fcba03',
              backgroundColor: '#fcba03',
              borderWidth: 1
            },
            {
              label: 'Mileage',
              // mileages
              data: [600,	1150,	342,	6050,	2522,	3241,	1259,	157,	1545, 9841],
              fill: false,
              borderColor: '#910f2b',
              backgroundColor: '#910f2b',
              borderWidth: 1
            },
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

    computed: {      
      // ...mapGetters(['wishlist']),  
    },

    methods: {
      // ...mapActions(['fetchWishlist']),
    },

    mounted () {
      this.renderChart(this.chartData, this.options);  
    }
  }
</script>