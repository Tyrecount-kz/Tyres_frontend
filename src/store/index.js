import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const CarModule = {
    state: () => ({
        Cars: [],
        Car: {},
        Wishlist: {},
    }),
    mutations: {
        setCars(state, data) {
            console.log("setting Cars");

            state.Cars = [];
            for (var i = 0; i < data.length; i++) {
                state.Cars.push(data[i]);
            }

            console.log(state.Cars);
        },
        setCar(state, data) {
            console.log("setting Car");
            state.Car = data;
            console.log(state.Car.company);
        },
        setWishlist(state, data) {
            console.log('setting wishlist');
            state.Wishlist = data;
            console.log(state.Wishlist);
        }
    },
    actions: {
        fetchCars({ commit }) {
            axios.get("https://2almas016.pythonanywhere.com/api/cars/")
                .then(
                    response => {
                        console.log(response.data);
                        commit("setCars", response.data["results"]);
                    }
                );
        },
        fetchMyCars({ commit }) {
            axios.get("https://next.json-generator.com/api/json/get/VyCyeAXhY")
                .then(
                    response => {
                        console.log(response.data);
                        commit("setCars", response.data["my cars"]);
                    }
                );
        },
        fetchCar({ commit }, id) {
            console.log(id);
            axios.get("https://2almas016.pythonanywhere.com/api/cars/" + id)
                .then(
                    response => {
                        console.log(response.data);
                        commit("setCar", response.data);
                    }
                );
        },
        fetchWishlist({ commit }) {
            axios.get("https://2almas016.pythonanywhere.com/api/cars/")

            // axios.get("https://2almas016.pythonanywhere.com/api/wishlist/")
            .then(
                response => {
                    console.log(response.data);
                    commit("setWishlist", response.data);
                }
            );
        }
    },
    getters: {
        cars(state) {
            return state.Cars;
        },
        car(state) {
            return state.Car;
        },
        wishlist(state) {
            return state.Wishlist;
        }
    },
}

const ProfileModule = {
    state: () => ({
        Profile: {},
    }),
    mutations: {
        setProfile(state, data) {
            console.log("setting profile");
            state.Profile = data;
            console.log(state.Profile.title);
        },
    },
    actions: {
        fetchProfile({ commit }, id) {
            console.log(id);
            axios.get("https://next.json-generator.com/api/json/get/4ki4LA73F")
                .then(
                    response => {
                        console.log(response.data["Profile"][0]);
                        commit("setProfile", response.data["Profile"][0]);
                    }
                );
        }
    },
    getters: {
        Profile(state) {
            return state.Profile;
        },
    },
}

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        main: CarModule,
        ProfileModule,
    }
});