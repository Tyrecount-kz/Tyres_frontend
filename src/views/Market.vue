<template>
    <v-container>

        <nav_bar />
        
        <v-sheet min-height="70vh" class="my-5" rounded="lg">
            <cars :title='title'/>
        </v-sheet>

    </v-container>
</template>

<script>
    import nav_bar from '../components/nav_bar';
    import cars from '../components/cars.vue';

    export default {

        data: () => ({
            ecosystem: [],
            title: 'Cars in market',
        }),

        components: {
            nav_bar,
            cars
        }

    }
</script>