import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);
Vue.use(VueAxios, axios)

const router = new VueRouter({
    mode: 'history',
    routes
})
export default router;