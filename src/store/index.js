import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const CarModule = {
    state: () => ({
        Cars: [],
        Car: {},
    }),
    mutations: {
        setCars(state, data) {
            console.log("setting Cars");

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
    },
    actions: {
        fetchCars({ commit }) {
            axios.get("https://next.json-generator.com/api/json/get/Nk9w1CQ3Y")
                .then(
                    response => {
                        console.log(response.data);
                        commit("setCars", response.data["cars"]);
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
            axios.get("https://next.json-generator.com/api/json/get/NJvlGAQ2F")
                .then(
                    response => {
                        console.log(response.data["car detail"][0]);
                        commit("setCar", response.data["car detail"][0]);
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
        }
    },
}

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        main: CarModule,
    }
});