import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./ui";
import Fragment from "vue-fragment";
import Vuex from 'vuex'; // for some global data
import { checkAddress } from "@polkadot/util-crypto";
import VueHead from 'vue-head'; // for injecting to <head/>
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'

Vue.use(Fragment.Plugin);
Vue.use(Vuex);
Vue.use(VueHead);

Vue.use(VueMoment, {
  moment,
});

const store = new Vuex.Store({
  state: {
    accountActive: localStorage.accountActive ? localStorage.accountActive : '', // checkout
    email: localStorage.email ? localStorage.email : '', // checkout
  },
  mutations: {
    setAccountActive(state, address) {
      if(checkAddress(address, 2)[0]){
        state.accountActive = address
        localStorage.setItem('accountActive', state.accountActive)
      }
    },

    setEmail(state, value) {
      state.email = value
      localStorage.setItem('email', state.email)
    },
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
  store
}).$mount("#app");