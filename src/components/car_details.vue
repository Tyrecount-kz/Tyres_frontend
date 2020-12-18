<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">

        <h1> Car details </h1>

        <h1> {{car.title}} </h1>

      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <characteristics :car="CarCharacteristics" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import characteristics from '../components/characteristics.vue';

  import {
    mapGetters
  } from 'vuex'

  export default {
    name: 'App',
    data() {
      return {};
    },

    computed: {
      ...mapGetters(['car']),

      CarCharacteristics(){
        var chars = {
          "company" : this.car.company,
          "model" : this.car.model,
          "shell" : this.car.shell,
          "mileage" : this.car.mileage,
          "rudder" : this.car.rudder,
          "color" : this.car.color,
          "gear" : this.car.gear,
          "custom_clear" : this.car.custom_clear,
          "engine_volume" : this.car.engine_volume,
          "transmission" : this.car.transmission,
        };
        return chars;
      }

    },

    components: {
      characteristics,
    },
    methods: {

      goBack: function () {
        this.$router.go(-1);
      },
    }
  }
</script>