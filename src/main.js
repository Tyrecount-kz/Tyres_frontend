window.Vue = require('vue');

import Vue from 'vue'
// import Vuex from 'vuex'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store'
import VuePageTransition from 'vue-page-transition'

// Vue.use(ReadMore);
Vue.use(VuePageTransition);

new Vue({
    el: '#app',
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app');