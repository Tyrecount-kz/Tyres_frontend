<template>
  <v-container>
    <v-row class="text-center">
        <v-col cols="12">

           <h1> Car details </h1>

          <h1> {{car.company}} </h1>

        </v-col>
    </v-row>
  </v-container>
</template>

<script>

    import { mapGetters } from 'vuex'

    export default {
        name: 'App',
        data(){
            return {
            };
        },
      
        computed: {
          ...mapGetters(['car']),
        },

        components: {
            
        },
        methods: {
              
          goBack: function(){
              this.$router.go(-1);
          },
        }
    }

</script>
