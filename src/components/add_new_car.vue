<template>
   
   <v-container>
       <v-row>
           <v-col>
               <h1> 
                  Add new car and predict it's
               </h1>
           </v-col>
       </v-row>
       <v-row>
         <v-col cols="12"> 
          <stepper />
         </v-col>
       </v-row>
   </v-container>

</template>

<script>
    import {
        // mapActions,
        // mapGetters
    } from 'vuex';

    import stepper from '../components/stepper';

    export default {

        data() {
          return {

          };
        },

        props: [
            'car',
        ],

        mounted() {
            
        },

        components: {
          stepper,
        },

        computed: {
        },

        methods: {
        },

    }
</script>