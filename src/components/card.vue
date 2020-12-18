<template>
    <v-card 
        v-if="typeof car != 'undefined'" 
        class="mx-auto" 
        max-width="400"
    >
        <v-img class="white--text align-end" height="200px" :src="car.img">
            <v-card-title>{{car.title}}</v-card-title>
        </v-img>

        <v-card-subtitle class="pb-0">
            {{ onlyDate(car.date) }}
        </v-card-subtitle>

        <v-card-text class="text--primary">
            <div>{{car.description}}</div>
        </v-card-text>

        <v-card-actions>
            <v-btn color="blue" text @click="openCarDetail(car.id)">
                View
            </v-btn>

            <v-btn color="green" text>
                Viewed: {{car.views}}
            </v-btn>
        </v-card-actions>
    </v-card>

    <v-card 
        v-else
        class="mx-auto" 
        max-width="400"
        loading
    >
    <!-- <v-img class="white--text align-end" height="200px" :src="img_link_placeholder">
            <v-card-title>No data</v-card-title>
        </v-img> -->

        <v-card-subtitle class="pb-0">
            No Data
        </v-card-subtitle>

        <v-card-text class="text--primary">
            <div>No data</div>
        </v-card-text>

        <v-card-actions>
            <v-btn color="red" text>
                No data
            </v-btn>
        </v-card-actions>
    </v-card>

</template>

<script>
    import {
        mapActions,
        // mapGetters
    } from 'vuex';

    export default {

        data() {
            return {
                img_link_placeholder: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
            }
        },

        props: [
            'car',
        ],

        mounted() {
            
        },

        components: {
        },

        computed: {
        },

        methods: {
            ...mapActions(['fetchCar']),

            openCarDetail(id) {
                this.fetchCar(id);

                this.$router.push('/car_detail');
            },
            onlyDate(c_date){
                var n_date = new Date(c_date);
                return n_date.toDateString();
            },
        },

    }
</script>