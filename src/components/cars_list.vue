<template>
    <v-card class="mx-auto" max-width="400">
        <v-card-title class="white--text primary">
            Cars list
            <v-spacer></v-spacer>
        </v-card-title>

        <!-- <v-card-text class="pt-4">
            you can compare cars
        </v-card-text> -->

        <v-divider></v-divider>

        <v-virtual-scroll :items="items" :item-height="50" height="350">
            <template v-slot:default="{ item }">
                <v-list-item>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.fullName }}</v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action >
                        <v-btn 
                            icon 
                            color="pink" 
                            depressed small
                            @click="DeleteFromWishlist(1)"
                        >
                        <v-icon>mdi-delete </v-icon>
                        </v-btn>
                    </v-list-item-action>

                    <v-list-item-action>
                        <v-btn 
                            icon 
                            small
                            @click="openCarDetail(1)"
                        >
                            <v-icon
                                color="primary  "
                            >
                                mdi-open-in-new
                            </v-icon>
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
            </template>
        </v-virtual-scroll>
    </v-card>
</template>

<script>

    import {
        mapActions,
        // mapGetters
    } from 'vuex';

    export default {
        data: () => ({
            colors: ['#2196F3', '#90CAF9', '#64B5F6', '#42A5F5', '#1E88E5', '#1976D2', '#1565C0', '#0D47A1',
                '#82B1FF', '#448AFF', '#2979FF', '#2962FF'
            ],
            names: ['Oliver', 'Jake', 'Noah', 'James', 'Jack', 'Connor', 'Liam', 'John', 'Harry', 'Callum',
                'Mason', 'Robert', 'Jacob', 'Jacob', 'Jacob', 'Michael', 'Charlie', 'Kyle', 'William',
                'William', 'Thomas', 'Joe', 'Ethan', 'David', 'George', 'Reece', 'Michael', 'Richard',
                'Oscar', 'Rhys', 'Alexander', 'Joseph', 'James', 'Charlie', 'James', 'Charles', 'William',
                'Damian', 'Daniel', 'Thomas', 'Amelia', 'Margaret', 'Emma', 'Mary', 'Olivia', 'Samantha',
                'Olivia', 'Patricia', 'Isla', 'Bethany'
            ],
            surnames: ['Smith', 'Anderson', 'Clark', 'Wright', 'Mitchell', 'Johnson', 'Thomas', 'Rodriguez',
                'Lopez', 'Perez', 'Williams', 'Jackson', 'Lewis', 'Hill', 'Roberts', 'Jones', 'White',
                'Lee', 'Scott', 'Turner', 'Brown', 'Harris', 'Walker', 'Green', 'Phillips', 'Davis',
                'Martin', 'Hall', 'Adams', 'Campbell', 'Miller', 'Thompson', 'Allen', 'Baker', 'Parker',
                'Wilson', 'Garcia', 'Young', 'Gonzalez', 'Evans', 'Moore', 'Martinez', 'Hernandez',
                'Nelson', 'Edwards', 'Taylor', 'Robinson', 'King', 'Carter', 'Collins'
            ],
        }),

        computed: {
            items() {
                const namesLength = this.names.length
                const surnamesLength = this.surnames.length
                const colorsLength = this.colors.length

                return Array.from({
                    length: 10000
                },() => {

                    // var t = k + v;

                    const name = this.names[this.genRandomIndex(namesLength)]
                    const surname = this.surnames[this.genRandomIndex(surnamesLength)]

                    return {
                        color: this.colors[this.genRandomIndex(colorsLength)],
                        fullName: `${name} ${surname}`,
                        initials: `${name[0]} ${surname[0]}`,
                    }
                })
            },
        },

        methods: {
            ...mapActions(['fetchCar']),

            genRandomIndex(length) {
                return Math.ceil(Math.random() * (length - 1))
            },

            DeleteFromWishlist(id) {
                console.log("will be deleted to ws: " + id);
            },
            
            openCarDetail(id) {
                this.fetchCar(id);

                this.$router.push('/car_detail');
            },
        },
    }
</script>