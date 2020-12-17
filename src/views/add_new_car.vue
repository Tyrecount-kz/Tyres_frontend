<template>
    <v-container>

        <nav_bar />
        <cars />

    </v-container>
</template>

<script>
    import nav_bar from '../components/nav_bar';
    import cars from '../components/cars';

    export default {

        data: () => ({
            ecosystem: [],
        }),

        components: {
            nav_bar,
            cars
        }

    }
</script>