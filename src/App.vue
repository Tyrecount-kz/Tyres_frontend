<template>
  <div id="app">
      <!-- <transition name="slide-fade" mode="out-in"> -->
        <router-view class="child-view"></router-view>
      <!-- </transition> -->
  </div>
</template>

<script>



export default {
  name: 'App',
  data () {
    // return { transitionName: null }
  },
}
</script>

