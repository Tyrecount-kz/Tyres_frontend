<template>
    <v-card>
        <v-card-title class="subheading font-weight-bold">
            Characteristics
        </v-card-title>

        <v-divider></v-divider>

        <v-list dense>
            <v-list-item v-for="(key, val) in car" :key="key">
                <v-list-item-content>
                    {{ val }}:
                </v-list-item-content>
                <v-list-item-content class="align-end">
                    {{ key }}
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script>

    export default {
        data() {
            return {
                item: {
                    "name": 'Frozen Yogurt',
                    "calories": 159,
                    "fat": 6.0,
                    "carbs": 24,
                    "protein": 4.0,
                    "sodium": 87,
                    "calcium": '14%',
                    "iron": '1%',
                },
            }
        },

        props: ['car'],

        computed: {
        },
        methods: {},
    }
</script>