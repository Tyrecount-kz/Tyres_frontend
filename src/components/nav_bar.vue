<template>
  <v-app-bar app color="white" flat>
    <v-container class="py-0 fill-height">

      <v-btn v-for="(url, link) in links" :key="link" text @click="goToPage(url)">
        {{ link }}
      </v-btn>

      <v-spacer></v-spacer>

      <!-- <v-responsive max-width="260">
        <v-text-field dense flat hide-details rounded solo-inverted></v-text-field>
      </v-responsive> -->
    </v-container>
  </v-app-bar>
</template>

<script>

  export default {
    name: 'App',
    data: () => ({
      links: {
        'Profile' : 'profile',
        'Market' : 'market',
        'Add car' : 'add_new_car',
        'Wishlist' : 'profile/wishlist',
      },
    }),

    mounted() {},

    computed: {},

    components: {},
    methods: {

      goToPage: function (url) {
        this.$router.push('/'+url);
      },

      goBack: function () {
        this.$router.go(-1);
      },
    }
  }
</script>