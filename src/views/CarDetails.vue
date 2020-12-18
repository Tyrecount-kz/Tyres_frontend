<template>
    <v-container>
        <car_details />

    </v-container>
</template>

<script>
    import car_details from '../components/car_details.vue';

    export default {

        data: () => ({
            ecosystem: [],
        }),

        components: {
            car_details
        }

    }
</script>