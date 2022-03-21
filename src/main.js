import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./ui";
import Fragment from "vue-fragment";
import Vuex from 'vuex'; // for some global data
// import { checkAddress } from "@polkadot/util-crypto";
import VueHead from 'vue-head'; // for injecting to <head/>
import ToggleSwitch from 'vuejs-toggle-switch'

import { getProvider, getInstance, getAccounts } from "./services/substrate";
import config from "./config";
import {
  readServiceStatus,
  readAstronomicalObjectsList,
  readIsTelescopeFree,
  readOrderById,
  readPriceStrgznPicoKsm,
} from "./services/api"

console.log("App info:", JSON.stringify(config.APP_INFO))

Vue.use(Fragment.Plugin);
Vue.use(Vuex);
Vue.use(VueHead);
Vue.use(ToggleSwitch)

const store = new Vuex.Store({
  state: {
    service: { message: null, status: null },
    telescope: [],
    astronomicalObjects: [],
    polkadot: {
      message: 'init',
      api: null,
      accounts: null
    },
    app: {
      status: 'start',
      account: localStorage.account ? localStorage.account : null,
      balance: 0,
      balanceUnsubscribe: null,
      email: localStorage.email ? localStorage.email : null,
      picoKsmBalance: null,
      picoKsmBalanceUnsubscribe: null,

      /*
      For messages about payment from Stripe;
      Payment ok: app.url/#/?checkout=success
      Payment not ok: app.url/#/?checkout=error
      */
      checkoutStatus: false
    },
    order: null, // active order tracked
    priceStrgznPicoKsm: null,
  },
  mutations: {
    setIsTelescopeFree(state, value) {
      state.telescope = value
    },
    setEmail(state, value) {
      state.app.email = value
      localStorage.setItem('email', state.app.email)
    },
    setAppStatus(state, value) {
      state.app.status = value
    },
    setServiceStatus(state, value) {
      state.service = value
      console.log("[Vuex setServiceStatus]:", { "status": state.service.status, "message": state.service.message })
    },
    setAstronomicalObjects(state, value) {
      state.astronomicalObjects = value
      console.log("[Vuex setAstronomicalObjects]:", value)
    },
    setPolkadotInfo(state, value) {
      state.polkadot = value
    },
    setAppInfo(state, value) {
      state.app = value
    },
    setCheckoutStatus(state, value) {
      state.app.checkoutStatus = value
    },
    setActiveOrder(state, value) {
      state.order = value
    },
    setPriceStrgznPicoKsm(state, value) {
      state.priceStrgznPicoKsm = value
    },
  },
  actions: {
    async setAccountActive({ state, commit }, address) {

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

        /* Set active account */
        commit('setAppInfo', {...state.app, account: address})
        state.app.account = address
        localStorage.setItem('account', state.app.account)

        /* Get balance for active account, unsubscribe for previous if exists */
        if ( state.app.balanceUnsubscribe ) {
          state.app.balanceUnsubscribe();
        }

        state.app.balanceUnsubscribe = await state.polkadot.api.query.assets.account(
          config.ID_ASSET,
          state.app.account,
          (result) => {
            let currentBalance = 0
            if (!result.isNone) {
              currentBalance = result.value.balance.toNumber()
            }
            commit('setAppInfo', {...state.app, balance: currentBalance})
          }
        )

        if (state.app.picoKsmBalanceUnsubscribe) {
          state.spp.picoKsmBalanceUnsubscribe()
        }
        state.app.picoKsmBalanceUnsubscribe = await state.polkadot.api.query.system.account(
          state.app.account,
          ({ data: { free: currentFree }}) => {
            currentFree = parseInt(currentFree)
            commit('setAppInfo', {...state.app, picoKsmBalance: currentFree})
          }
        )
      }
    },

    async polkadotConnect({ state, dispatch, commit }) {
      try {
        /* Provider */
        const provider = getProvider()
        provider.on("error", () => {
          commit('setPolkadotInfo', {...state.polkadot, message: 'provider not connected'})
          commit('setAppInfo', {...state.app, status: 'extension error'})
        });
        provider.on("connect", () => {
          commit('setPolkadotInfo', {...state.polkadot, message: 'provider connected'})
        });

        /* Api */
        state.polkadot.api = await getInstance()
        if ( state.polkadot.api ) {
          commit('setPolkadotInfo', {...state.polkadot, message: 'api connected'})
        } else {
          commit('setPolkadotInfo', {...state.polkadot, message: 'api not connected'})
          commit('setAppInfo', {...state.app, status: 'extension error'})
        }

        /* Accounts */
        commit('setPolkadotInfo', {...state.polkadot, accounts: await getAccounts(state.polkadot.api)})

        if ( state.polkadot.accounts.length > 0 ) {
          commit('setPolkadotInfo', {...state.polkadot, message: 'accounts found'})
        } else {
          commit('setPolkadotInfo', {...state.polkadot, message: 'accounts not found'})
          commit('setAppInfo', {...state.app, status: 'extension error'})
        }
      } catch (error) {

        /* Catch other errors */
        commit('setPolkadotInfo', {...state.polkadot, message: error.message})
        commit('setAppInfo', {...state.app, status: 'extension error'})
      } finally {

        /* Ready if we have not any errors during trying */
        if(state.app.status !== 'extension error') {
          commit('setAppInfo', {...state.app, status: 'extension ready'})
        }

        /* Set active account */
        if ( state.app.account ) {
          dispatch("setAccountActive", state.app.account)
        } else {
          dispatch("setAccountActive", state.polkadot.accounts[0].address)
        }
      }
    },
    setServiceStatus({ commit }, new_status) {
      commit('setServiceStatus', new_status)
    },
    setAstronomicalObjects({ commit }, newAstronomicalObjectsList) {
      commit('setAstronomicalObjects', newAstronomicalObjectsList)
    },
    setIsTelescopeFree({ commit }, isFree) {
      commit('setIsTelescopeFree', isFree)
    },

    onMount({ commit, state }, route) {
      if(route.query.checkout) {
        commit("setCheckoutStatus", route.query.checkout)

        // if status success, we do not need to store it forever
        setTimeout(() => {
          if( state.app.checkoutStatus === 'success') {
            commit("setCheckoutStatus", false)
          }
        }, 50000);
      }
    },
    async updateActiveOrder({ commit, state }) {
      if (!state.order) return
      const order = await readOrderById(state.order.id)
      commit('setActiveOrder', order)
    },
    async updatePriceStrgznPicoKsm({ commit, state }) {
      const priceStrgnKsm = await readPriceStrgznPicoKsm(
        state.priceStrgznPicoKsm ?? 0,
        config.API_SERVER_LONG_POLLING_TIMEOUT,
      )
      commit('setPriceStrgznPicoKsm', priceStrgnKsm)
    },
  },
});

Vue.config.productionTip = false;
Vue.prototype.$discord = "https://discord.com/invite/5UWNGNaAUf";

new Vue({
  router,
  render: h => h(App),
  store,
  created: function () {
    this.$store.dispatch("polkadotConnect")

    const subscribeServiceStatus = async () => {
      let status = await readServiceStatus(
        this.$store.state.service.status,
        this.$store.state.service.message,
        config.API_SERVER_LONG_POLLING_TIMEOUT,
      )
      this.$store.dispatch('setServiceStatus', status)
      await new Promise(r => setTimeout(r, 5000))
      await subscribeServiceStatus() // ToDo: are recursive promises ok?
    }
    subscribeServiceStatus()

    readAstronomicalObjectsList().then(initAstronomicalObjectsList => {
      this.$store.dispatch('setAstronomicalObjects', initAstronomicalObjectsList)
    })
    const subscribeAstronomicalObjectsListUpdates = async () => {
      let astronomicalObjectsList = await readAstronomicalObjectsList(config.API_SERVER_LONG_POLLING_TIMEOUT)
      this.$store.dispatch('setAstronomicalObjects', astronomicalObjectsList)
      await new Promise(r => setTimeout(r, 5000))
      await subscribeAstronomicalObjectsListUpdates()
    }
    subscribeAstronomicalObjectsListUpdates()

    readIsTelescopeFree().then(isFree => {
      this.$store.dispatch('setIsTelescopeFree', isFree)
    })
    const subscribeIsTelescopeFree = async () => {
      await new Promise(r => setTimeout(r, 1000))
      let isFree = await readIsTelescopeFree(config.API_SERVER_LONG_POLLING_TIMEOUT, this.$store.state.telescope)
      this.$store.dispatch('setIsTelescopeFree', isFree)
    }
    subscribeIsTelescopeFree()

    const subscribePriceStrgznKsm = async () => {
      await this.$store.dispatch('updatePriceStrgznPicoKsm')
      setTimeout(subscribePriceStrgznKsm, 1000)
    }
    subscribePriceStrgznKsm()
  }
}).$mount("#app");
