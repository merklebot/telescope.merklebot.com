import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./ui";
import Fragment from "vue-fragment";
import Vuex from 'vuex'; // for some global data
// import { checkAddress } from "@polkadot/util-crypto";
import VueHead from 'vue-head'; // for injecting to <head/>
import axios from "axios"

Vue.use(Fragment.Plugin);
Vue.use(Vuex);
Vue.use(VueHead);

const store = new Vuex.Store({
  state: {
    service: [],
    telescope: [],
    astronomicalObjects: [],
    watcherApiData: null,
    accountActive: null,
    email: localStorage.email ? localStorage.email : '',
    // user: []
  },
  mutations: {
    getService(state) {
      axios.get("https://api.merklebot.com/beyond-the-sky/status").then(response => {
        state.service = response.data
        console.log("[Vuex getService]:", { "status": response.data.status, "message": response.data.message })
      })
    },
    getTelescope(state) {
      axios.get("https://api.merklebot.com/beyond-the-sky/telescopes/{telescope_id}/is_free").then(response => {
        state.telescope = response.data
      })
    },
    getAstronomicalObjects(state) {
      axios.get("https://api.merklebot.com/beyond-the-sky/astronomical-objects").then(response => {
        state.astronomicalObjects = response.data
        console.log("[Vuex getAstronomicalObjects]:", response.data)
      })
    },
    setAccountActive(state, address) {
      // if(checkAddress(address, 2)[0]){
        state.accountActive = address
        // localStorage.setItem('accountActive', state.accountActive)
      // }
    },
    setEmail(state, value) {
      state.email = value
      localStorage.setItem('email', state.email)
    },
  },
  actions: {
    watchApiData({ state, commit }) {
      
      commit('getService')
      commit('getAstronomicalObjects')
      commit('getTelescope')

      state.watcherApiData = setInterval(() => {
        commit('getService')
        commit('getAstronomicalObjects')
        commit('getTelescope')
      }, 10000)
    },

    stopApiData({ state }) {
      clearInterval(state.watcherApiData)
    }
  }
});

Vue.config.productionTip = false;
Vue.prototype.$discord = "https://discord.com/invite/5UWNGNaAUf";

new Vue({
  router,
  render: h => h(App),
  store
}).$mount("#app");