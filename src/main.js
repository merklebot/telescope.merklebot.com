import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./ui";
import Fragment from "vue-fragment";
import Vuex from 'vuex'; // for some global data
// import { checkAddress } from "@polkadot/util-crypto";
import VueHead from 'vue-head'; // for injecting to <head/>
import axios from "axios";

import { getProvider, getInstance, getAccounts } from "./services/substrate";

Vue.use(Fragment.Plugin);
Vue.use(Vuex);
Vue.use(VueHead);

const store = new Vuex.Store({
  state: {
    service: [],
    telescope: [],
    astronomicalObjects: [],
    watcherApiData: null,
    polkadot: {
      message: 'init',
      api: null,
      accounts: null
    },
    app: {
      status: 'start',
      account: localStorage.account ? localStorage.account : null,
      email: localStorage.email ? localStorage.email : null
    }
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
    setEmail(state, value) {
      state.app.email = value
      localStorage.setItem('email', state.app.email)
    },
    setAppStatus(state, value) {
      state.app.status = value
    }

  },
  actions: {
    async watchApiData({ state, commit, dispatch }) {
      
      commit('getService')
      commit('getAstronomicalObjects')
      commit('getTelescope')
      dispatch("polkadotConnect")

      state.watcherApiData = setInterval(() => {
        commit('getService')
        commit('getAstronomicalObjects')
        commit('getTelescope')
      }, 10000)
    },

    stopApiData({ state }) {
      clearInterval(state.watcherApiData)
    },

    setAccountActive({ state }, address) {

      /* Check if address is in the extention list */
      let accountExists = false
      if(state.polkadot.accounts) {
        for (const value of state.polkadot.accounts) {
          if(value.address == address) {
            accountExists = true
          }
        }
      }

      if(accountExists){
        state.app.account = address
        localStorage.setItem('account', state.app.account)
      }
    },

    async polkadotConnect({ state, dispatch }) {
      try {
        /* Provider */
        const provider = getProvider()
        provider.on("error", () => {
          state.polkadot.message = 'provider not connected'
          state.app.status = 'extension error'
        });
        provider.on("connect", () => {
          state.polkadot.message = 'provider connected'
        });

        /* Api */
        state.polkadot.api = await getInstance()
        if ( state.polkadot.api ) {
          state.polkadot.message = 'api connected'
        } else {
          state.polkadot.message = 'api not connected'
          state.app.status = 'extension error'
        }

        /* Accounts */
        state.polkadot.accounts = await getAccounts(state.polkadot.api)
        
        if ( state.polkadot.accounts.length > 0 ) {
          state.polkadot.message = 'accounts found'
        } else {
          state.polkadot.message = 'accounts not found'
          state.app.status = 'extension error'
        }
      } catch (error) {

        /* Catch other errors */
        state.polkadot.message = error.message
        state.app.status = 'extension error'

      } finally {

        /* Ready if we have not any errors during trying */
        if(state.app.status !== 'extension error') {
          state.app.status = 'extension ready'
        }

        /* Set active account */
        if ( state.app.account ) {
          dispatch("setAccountActive", state.app.account)
        } else {
          dispatch("setAccountActive", state.polkadot.accounts[0].address)
        }
      }
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