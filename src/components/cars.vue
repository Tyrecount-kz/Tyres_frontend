<template>
    <v-container>
        <v-row class="text-center">

            <v-col>
                <h1> {{title}} </h1>
            </v-col>
            <v-col>

                <a @click="openCarDetail(1)"> Car detail </a>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4" v-for="car in cars" :key="car.id">

                <card
                    v-if="car.id%2==0"
                 />
                <card v-else :car="car" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import card from "../components/card";

    import {
        mapActions,
        mapGetters
    } from 'vuex';

    export default {
        name: 'App',
        data() {
            return {
                car_placeholder: {
                    "id": 0,
                    "title": "Nichols Ruiz",
                    "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq3ykgrvyQhgXuogNNjlvziP3X7nf88FiT6A&usqp=CAU",
                    "description": "Qui id deserunt pariatur amet ut eu incididunt",
                    "city": "Ut amet Lorem elit est.",
                    "views": 553
                },
            };
        },

        mounted() {
            this.fetchCars();
        },


        props: ['title'],

        components: {
            card,
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