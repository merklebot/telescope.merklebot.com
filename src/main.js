import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./ui";
import Fragment from "vue-fragment";
import Vuex from 'vuex'; // for some global data
// import { checkAddress } from "@polkadot/util-crypto";
import VueHead from 'vue-head'; // for injecting to <head/>
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'
import axios from "axios"

Vue.use(Fragment.Plugin);
Vue.use(Vuex);
Vue.use(VueHead);

Vue.use(VueMoment, {
  moment,
});

const store = new Vuex.Store({
  state: {
    service: null,
    // accountActive: localStorage.accountActive ? localStorage.accountActive : '',
    // email: localStorage.email ? localStorage.email : '',
  },
  mutations: {
    setService(state, data) {
      state.service = data
      console.log("[Vuex setService] Service status:", { "status": data.status, "message": data.message })
    }
  },
  actions: {
    getService({ commit }) {
      
      axios.get("https://api.merklebot.com/beyond-the-sky/status").then(response => {
        commit('setService', response.data)
      })

      setInterval(() => {
        axios.get("https://api.merklebot.com/beyond-the-sky/status").then(response => {
          commit('setService', response.data)
        })
      }, 10000)
    }
    // setAccountActive(state, address) {
    //   if(checkAddress(address, 2)[0]){
    //     state.accountActive = address
    //     localStorage.setItem('accountActive', state.accountActive)
    //   }
    // },

    // setEmail(state, value) {
    //   state.email = value
    //   localStorage.setItem('email', state.email)
    // },
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
  store
}).$mount("#app");