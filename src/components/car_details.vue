<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">

        <h3> Car details </h3>

        <h1> {{car.post_name}} </h1>


        <v-btn 
          v-if="car.added_to_wishlist === 1"
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
          color="grey" 
          x-large 
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
          <h3> Description </h3>
          <p> {{car.post_description}} </p>
          <h3> City </h3>
          <p> {{car.city}} </p>
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

          <v-img :aspect-ratio="16/9" :width="width" :src="img_link_placeholder"></v-img>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import characteristics from '../components/characteristics.vue';
  import axios from 'axios';

  import {
    mapActions,
    mapGetters
  } from 'vuex'

  export default {
    name: 'App',
    data: () => ({
      width: 600,
      img_link_placeholder: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
    }),

    computed: {
      ...mapGetters(['car']),

      CarCharacteristics() {
        var chars = {
          // "company": this.car.company,
          "model": this.car.car_model,
          "shell": this.car.shell,
          "mileage": this.car.mileage + ' km',
          "rudder": this.car.rudder,
          "color": this.car.color,
          "gear": this.car.gear,
          "custom_clear": this.car.custom_clear,
          "engine_volume": this.car.engine_volume,
          "transmission": this.car.transmission,
          "release_year": this.car.release_year,
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

      postRequest(url, id){
        const headers = { 
            "Authorization": "Bearer my-token",
            "My-Custom-Header": "foobar"
        };
        axios.post("https://2almas016.pythonanywhere.com/api/cars/" + url + id, { headers });
      },
      
      ToWishlist(id) {
        this.car.added_to_wishlist = 1;
        console.log("will be added from ws: " + id);
        this.postRequest('wishlist-add/', id);
      },

      DeleteFromWishlist(id) {
        this.car.added_to_wishlist = 0;
        this.postRequest('wishlist-del/', id);
        console.log("will be deleted from ws: " + id);
      }

    }
  }
</script>