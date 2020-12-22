<template>
    <v-container>
        <v-row class="text-center">

            <v-col>
                <h1> Wishlist </h1>
                <small> you can compare liked cars and pick one for you </small>
            </v-col>

        </v-row>
        <v-row>
            <v-col cols="8">
                <Chart />
            </v-col>
            
            <v-col cols="4">
                <carsList />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {
        mapActions,
        mapGetters
    } from 'vuex';

    import Chart from '../components/chart_comp';
    import carsList from '../components/cars_list';

    export default {
        name: 'App',
        data() {
            return {
            };
        },

        mounted() {
            this.fetchCars();
        },

        components: {
            Chart, 
            carsList
        },

        computed: {
            ...mapGetters(['cars']),
            
        },

        methods: {
            ...mapActions(['fetchCar', 'fetchCars']),

            openCarDetail(id) {
                this.fetchCar(id);

                this.$router.push('/car_detail');
            },

        }
    }
</script>