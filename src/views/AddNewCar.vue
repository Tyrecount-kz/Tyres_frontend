<template>
    <v-container>

        <add_new_car />

    </v-container>
</template>

<script>
    import add_new_car from '../components/add_new_car';

    export default {

        data: () => ({
            ecosystem: [],
        }),

        components: {
            add_new_car
        }

    }
</script>