<template>
  <v-container>
    <v-row class="text-center">

        <h1> Cars </h1>
        <a @click="openCarDetail(1)"> Car detail </a>
        
        

    </v-row>
  </v-container>
</template>

<script>

    import { mapActions, mapGetters } from 'vuex';

    export default {
        name: 'App',
        data(){
            return {
            };
        },

        mounted() {
            this.fetchCars();
        },
        
        components: {
        },
        
        computed: {
            ...mapGetters(['cars']),
        },

        methods: {
            ...mapActions(['fetchCar', 'fetchCars']),

            openCarDetail(id){
                this.fetchCar(id);
                            
                this.$router.push('/car_detail');
            },
            
        }
    }


</script>
