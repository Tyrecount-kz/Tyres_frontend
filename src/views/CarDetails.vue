<template>
    <v-container>

        <nav_bar />
        <car_details />

    </v-container>
</template>

<script>
    import nav_bar from '../components/nav_bar';
    import car_details from '../components/car_details.vue';

    export default {

        data: () => ({
            ecosystem: [],
        }),

        components: {
            nav_bar,
            car_details
        }

    }
</script>