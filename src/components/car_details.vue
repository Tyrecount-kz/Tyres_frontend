<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">

        <h3> Car details </h3>

        <h1> {{car.title}} </h1>


        <v-btn 
          v-if="car.isAdded"
          icon 
          color="pink" 
          x-large 
          @click="DeleteFromWishlist(car.id)"
        >
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        
        <v-btn 
          v-else
          icon 
          color="pink" 
          x-large 
          disabled
          @click="ToWishlist(car.id)"
        >
          <v-icon>mdi-heart</v-icon>
        </v-btn>

      </v-col>
    </v-row>

    <v-row class="text-center">
      <v-col cols="4">
        <v-card class="pa-md-4 mx-lg-auto" min-height="175">
          <h1> Car's Price </h1>
          <p> Predicted by our Machine Learning algorithms </p>

          <h3 class="blue--text"> {{car.price}} </h3>
        </v-card>
      </v-col>
      <v-col cols="8">
        <v-card class="pa-md-4 mx-lg-auto" min-height="175">
          <h1> Description </h1>
          <p> {{car.description}} </p>
        </v-card>
      </v-col>
    </v-row>
    
    <v-row>
      <v-col cols="4">
        <characteristics :car="CarCharacteristics" />
      </v-col>
      <v-col>
        <div class="d-flex flex-column justify-space-between align-center">
          <v-slider v-model="width" class="align-self-stretch" min="400" max="750" step="1"></v-slider>

          <v-img :aspect-ratio="16/9" :width="width" :src="car.img"></v-img>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import characteristics from '../components/characteristics.vue';

  import {
    mapActions,
    mapGetters
  } from 'vuex'

  export default {
    name: 'App',
    data: () => ({
      width: 600,
    }),

    computed: {
      ...mapGetters(['car']),

      CarCharacteristics() {
        var chars = {
          "company": this.car.company,
          "model": this.car.model,
          "shell": this.car.shell,
          "mileage": this.car.mileage,
          "rudder": this.car.rudder,
          "color": this.car.color,
          "gear": this.car.gear,
          "custom_clear": this.car.custom_clear,
          "engine_volume": this.car.engine_volume,
          "transmission": this.car.transmission,
          // "isAdded": this.car.isAdded,
        };
        return chars;
      }

    },

    components: {
      characteristics,
    },
    methods: {

      ...mapActions([]),

      goBack: function () {
        this.$router.go(-1);
      },

      ToWishlist(id) {
        console.log("will be added to ws: " + id);
      },

      DeleteFromWishlist(id) {
        console.log("will be deleted to ws: " + id);
      }

    }
  }
</script>