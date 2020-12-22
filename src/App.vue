<template>
  <v-app id="app">
    <!-- <transition name="slide-fade" mode="out-in"> -->
      
    <nav_bar />
    
    <v-main class="grey lighten-4 stable">
      <router-view class="child-view"></router-view>
    </v-main>

    <Footer />

    <!-- </transition> -->
  </v-app>
</template>

<script>

  import nav_bar from './components/nav_bar';
  import Footer from './components/footer';

  export default {
    name: 'App',

    components: {
      nav_bar,
      Footer,
    }
  }
</script>

<style scoped>
  .stable {
    padding: 56px 0px 0px !important;
  }
</style>