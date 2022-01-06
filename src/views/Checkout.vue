<template>
  <div>
      <div class="banner">
        <div class="banner-top" :class="dayStatusName">
          <div class="banner-top-content">
            <h1>Connecting Universe to Metaverse!</h1>
            <div class="layout-narrow">
              <p>Connect to our autonomous telescope in the dark night of Atacama desert in Chile, select an astronomical object and mint unique NFTs in a few clicks.</p>
            </div>
            <Button v-on:click.native="start">Start</Button>
          </div>

          <div class="banner-telescope" aria-hidden="true">
              <img aria-hidden="true" src="i/banner-telescope-pod-1.png" class="banner-telescope-pod-1" />
              <img aria-hidden="true" src="i/banner-telescope-pod-2.png" class="banner-telescope-pod-2" />
              <img aria-hidden="true" src="i/banner-telescope-head.png" class="banner-telescope-head" />
            </div>

          <div class="banner-top-art" aria-hidden="true">
            <div class="banner-grass"></div>
            <img aria-hidden="true" src="i/banner-stone.png" class="banner-stone" />
            <img aria-hidden="true" src="i/banner-sights.png" class="banner-sights" />
          </div>
        </div>
        <div class="banner-bottom">
          <div class="telecopePause layout-narrow" v-if="!telescopeOn()">
             <div class="telecopePause-content" v-if="dayStatusName !== 'night'">
                <p class="telecopePause-title">Telescope is Waiting for night…</p>
                <p>{{ time }} left</p>
              </div>
          </div>
        </div>
      </div>

      <section id="start" class="section-blue">
        <div class="layout-narrow">
          <h2>Follow the steps and mint your nft Of astronomical object</h2>
        </div>
      </section>

      <section class="section-blue-mid">
        <div class="layout-narrow">
          <h3>1. Create or choose your account</h3>

          <p class="hyphens">
            We use
            <a href="https://polkadot.js.org/extension/" target="_blank"
              >Polkadot.js extension</a
            >
            to manage user accounts. Here is the
            <a href="https://medium.com/merklebot/how-to-create-an-account-using-polkadot-js-extension-bd02a0953946" target="_blank"
              >initial setup guide.</a
            >
          </p>

          <section v-if="!isReady && !connectAccountClicked">
            <Button v-on:click.native="connectAccount">Connect account</Button>
          </section>

          <template v-if="!isReady && error === null && connectAccountClicked">
            <section>
              <span class="loader"></span>
              <i>Checking Polkadot.js extension</i>
            </section>
          </template>

          <template v-if="isReady">
              <template v-if="accounts.length > 0">
                <section>
                  <form>
                    <p>
                      <select class="container-full" v-model="account">
                        <option
                          v-for="(account, key) in accounts"
                          :key="key"
                          :value="account.address"
                        >
                          {{ account.meta.name }} –
                          {{ addressShort(account.address) }}
                        </option>
                      </select>
                    </p>
                  </form>
                </section>
                <Button v-on:click.native="openSingularUI">Check my NFTs</Button>
              </template>
            <template v-else>
               <section>
                <p class="error-title">Account not found</p>
                <p class="error-text">Please create an account or switch on account's visibility in
                <a href="https://polkadot.js.org/extension/" target="_blank"
                  >Polkadot.js extension</a
                >. Then reload this page.</p>
              </section>
            </template>
          </template>

          <template v-else-if="error && connectAccountClicked">
            <template v-if="error === 'NOT_FOUND_EXTENSION'">
              <section>
                <p class="error-title">Extension not found</p>
                <p class="error-text">Please install
                <a href="https://polkadot.js.org/extension/" target="_blank"
                  >Polkadot.js extension</a
                >, create and add Web3 account. Then reload this page.</p>
              </section>
            </template>
            <template v-else-if="!accounts || accounts.length < 1">
              <section>
                <p class="error-title">You currently don't have any accounts</p>
                <p class="error-text">Please create an account
                  or switch on account's visibility in
                  <a href="https://polkadot.js.org/extension/" target="_blank">Polkadot.js extension</a>. Then reload this page.</p>
              </section>
            </template>
            <template v-else>
              <section>
                <p class="error-title">Some error occured</p>
                <p class="error-text">{{ error }}</p>
              </section>
            </template>
          </template>
        </div>
      </section>


      <section class="section-blue-dark p-b-0">
        <div class="layout-narrow">
          <h3>2. Get telescope tokens</h3>

          <p class="hyphens">
            Our telescope only accepts special $STRGZN tokens and you can buy them below using your credit card. 
          </p>
        </div>

        <section class="tokenSection layout-sm">
          <div class="tokenSection-info">
            <h4>Your balance <span>{{ balance }} $STRGZN</span></h4>
            <p>1 $STRGZN = {{ pricePerToken }} USD</p>
            <p>With 1 $STRGZN you can<br/> get 1 telescope NFT</p>
          </div>

          <div class="tokenSection-form">
            <h4>Purchase tokens</h4>

            <p v-if="accounts.length < 1 || !isReady" class="error-title text-small">Please connect the account first</p>

            <form @onChange="onChange" @submit.prevent="handleSubmit" :class="{
              disabled: accounts.length < 1 || !isReady,
            }">
              <div class="inputNumbers">
                <div class="less" @click="setQuantity(-1)">-</div>
                <input type="number" v-model.number="quantity" value="quantity" required />
                <div class="more" @click="setQuantity(+1)">+</div>
              </div>

              <h5>Total: {{ totalPaymentUSD }} USD</h5>

              <Button class="container-full" size="mid">
                <span class="text">Pay with</span>
                <img class="label" alt="Stripe" src="i/stripe.svg" />
              </Button>
            </form>
          </div>
        </section>
      </section>



    <div>
      <astronomicalObjectCard :accounts="this.accounts"  :isReady="this.isReady" :balance="this.balance"/>
    </div>


    
  </div>  

</template>

<script>
import { checkout, serviceStatus } from "../services/api";
import stripe from "../services/stripe";
import { getProvider, getInstance, getAccounts } from "../services/substrate";
import config from "../config";
import { loadScript } from "../utils/tools";

import moment from 'moment-timezone';

export default {
  components: {
    astronomicalObjectCard: () => import('../components/includes/AstronomicalObjectCard.vue'),
    Button: () => import('../components/includes/Button.vue')
  },
  data() {
    return {
      isReady: false,
      connectAccountClicked: localStorage.getItem('connectAccountClicked') || false,
      error: null,
      api: null,
      unsubscribe: null,
      balance: 0,
      accounts: [],
      accountDefault: "",
      status: false,

      // Contains information if telescope is in operations or not.
      // Possible "status" values are: "off" and "on".
      // Additonally "message" says why it works or not right now.
      serviceStatus: {
        "status": undefined,
        "message": "",
      },

      // How much STRGZN tokens user selected to purchase
      quantity: 50, // filtered value
      minBuy: 1,
      maxBuy: 100,

      // USD price per one STRGZN
      pricePerToken: (config.PRICE_PER_LESSON_CENTS / 100).toFixed(2),

      time: "00:00:00",
      hourStartNight: "06",
      hourEndNight: "02",
      currentHour: "00",
      dayStatusName: "day"

    };
  },

  async created() {
    try {
      // Poll telescope status
      setImmediate(async () => {
        this.serviceStatus = await serviceStatus()
      })
      setInterval(async () => {
        this.serviceStatus = await serviceStatus()
        console.log("Service status:", { "status": this.serviceStatus.status, "message": this.serviceStatus.message })
      }, 10000)

      if(this.connectAccountClicked) {
        await this.connectAccount()
      }

    } catch (error) {
      this.error = error.message;
    }
  },


  mounted() {
  
      var self = this
      this.time = this.countdown(this.currentTime())
      this.currentHour = this.getCurrentHour()

      setInterval(() => {
        self.time = self.countdown(self.currentTime())
        self.currentHour = self.getCurrentHour()
      }, 10000)
  },
  destroyed() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  },
  watch: {
    status: async function(newValue, oldValue) {
      if (oldValue === false && newValue === true) {
        await loadScript(
          "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"
        );
      }
    },
    account: function(newValue, oldValue) {
      this.onChange({
        name: "account",
        newValue: newValue,
        oldValue: oldValue,
      });
    },
    currentHour: function(){
      this.dayStatusName = this.dayStatus()
    }
  },

  computed: {
    totalPaymentUSD: {
      get() {
        return (this.quantity * this.pricePerToken).toFixed(2)
      }
    },
    account: {
      get() {
        return this.$store.state.accountActive
          ? this.$store.state.accountActive
          : this.accountDefault;
      },
      set(value) {
        this.$store.commit("setAccountActive", value);
      },
    },
    email: {
      get() {
        return this.$store.state.email;
      },
      set(value) {
        this.$store.commit("setEmail", value);
      },
    },
  },

  methods: {
    setQuantity(change) {
        if ( (this.quantity + change) >=  this.minBuy &&  (this.quantity + change) <=  this.maxBuy ){
          this.quantity += change
        }
    },

    async connectAccount() {
      if (!this.connectAccountClicked) {
        localStorage.setItem('connectAccountClicked', true)
        this.connectAccountClicked = true
      }

      try {
        const provider = getProvider();
        provider.on("error", () => {
          this.error = "Disconnected provider";
          this.isReady = false;
        });
        provider.on("connect", () => {
          this.isReady = true;
        });
        this.api = await getInstance();
        this.accounts = await getAccounts(this.api);
        if (this.accounts) {
          this.accountDefault = this.accounts[0].address;
        }

        if (this.accounts.length === 0) {
          this.error = "Not found account";
        }
        this.isReady = true;
        this.status = true;

        this.unsubscribe = await this.api.query.assets.account(
          config.ID_ASSET,
          this.account,
          ({ balance: currentFree }) => {
            this.balance = currentFree.toNumber();
          }
        );

      } catch (error) {
        this.error = error.message;
      }
    },

    addressShort(address) {
      return address.slice(0, 6) + "..." + address.slice(-4);
    },

    async onChange({ name, newValue }) {
      if (name === "account") {
        if (this.unsubscribe) {
          this.unsubscribe();
        }
        this.unsubscribe = await this.api.query.assets.account(
          config.ID_ASSET,
          newValue,
          ({ balance: currentFree }) => {
            this.balance = currentFree.toNumber();
          }
        );
      }
    },
    handleSubmit() {
      if (this.account) {
        this.checkout(this.account, this.quantity);
      }
    },
    async checkout(account, quantity) {
      this.proccess = true;
      try {
        const session = await checkout({
          account,
          quantity,
        });
        const r = await stripe.redirectToCheckout({ sessionId: session.id });
        if (r.error) {
          console.error(r.error.message);
        }
      } catch (error) {
        console.log("Checkout error:", error);
      }
      this.proccess = false;
    },

    /* Start button */
    start() {
      window.scrollTo({
          top: document.querySelector("#start").offsetTop,
          behavior: "smooth"
      })
    },

    openSingularUI() {
      if (!this.account) {
        alert("Please select your account first.")
        return
      }
      const url = `https://singular.rmrk.app/space/${this.account}?tab=owned&owner=yes`
      window.open(url)
    },

    /* Gets telescope time in Atacama(Chile) */
    getCurrentHour(){
      return new Date().toLocaleString("en-US", { timeZone: "America/Santiago", hour: 'numeric', hour12: false })
    },
    currentTime(){
      return new Date().toLocaleString("en-US", { timeZone: "America/Santiago", hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false })
    },

    /* Gets how long left tonight */
    countdown(currentTime) {
      var 
          startNight = moment.duration(this.hourStartNight + ':00:00'),
          timer = startNight.subtract(currentTime),
          timeString = '';

          if(timer.hours() > 0) {
            timeString += timer.hours() + ' hours '
          }

          if(timer.minutes() >= 0) {
            timeString += timer.minutes() + ' minute(s) '
          }

          // timeString += timer.seconds() + ' seconds'

      return timeString
    },

    /* Gets time of day, For frontend purposes */
    dayStatus() {

      if(this.currentHour >= (this.hourEndNight + 1) && this.currentHour < (this.hourStartNight - 1)) {
        return 'day'
      }

      if (this.currentHour >= this.hourStartNight || this.currentHour <= this.hourEndNight) {
        return 'night'
      }

      if( this.currentHour > this.hourEndNight && this.currentHour <= (this.hourEndNight + 1) ) {
        return 'dawn'
      }

      if ( this.currentHour >= (this.hourStartNight - 1) && this.currentHour < this.hourStartNight ) {
        return 'sunset'
      }
    },

    telescopeOn() {
      /* && this.serviceStatus.status on */
      if( this.dayStatus() === 'night' ) { return true }
    },

  },
};
</script>

<style scoped>

  /* Token purchase section */
  .tokenSection {
    display: grid;
    grid-template-columns: 1.5fr 2fr;
    gap: calc(var(--space) * 3);
    background: url("/i/telescope-shadow.png") no-repeat 0 100%;
    background-size: 260px;
    min-height: 480px;
  }

  .tokenSection-info, .tokenSection-info h4 {
    text-align: right;
  }

  .tokenSection-info {
    font-size: 80%;
  }

  .tokenSection-form {
    text-align: center;
    background-color: var(--color-blue-darkest);
    padding: calc(var(--space) * 2) calc(var(--space) * 3);
    border-radius: 20px;
    max-width: 350px;
  }

  .tokenSection-form h4 {
    text-transform: uppercase;
  }

  @media screen and (min-width: 500px) {
    .tokenSection h4 span {
      display: block;
    }
  }
  /* end of Token purchase section */

  .banner {
    min-height: 100vh;
    display: grid;
    grid-template-rows: 5fr 1fr;
    overflow: hidden;
  }

  .banner-top {
    color: var(--color-blue-darkest);

    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;

    padding: var(--padding);

    position: relative;
  }

  .banner-top-content {
    text-align: center;
    position: relative;
    z-index: 1;
  }

  .banner-top-content a {
    color: var(--color-lilac);
    text-decoration: underline;
    text-decoration-thickness: 4px;
  }

  .banner-top-content a:hover {
    color: var(--color-orange)
  }
  
  .banner-top-content > *:not(:last-child) {
    margin-bottom: calc(var(--space) * 2);
  }

  .banner-top-content p {
    font-family: var(--font-highlight);
    font-weight: 600;
    margin: 0 auto;
  }

  .banner-top-content button {
    margin-top: var(--space)
  }



  .banner-top-art {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
  }

  .banner-top-art * {
    position: absolute;
  }

  /* .banner-top-art *:not(.banner-grass) {
    z-index: 1;
  } */

  .banner-grass{
    height: 32px;
    width: 100%;
    background-color: #619539;
    bottom: 0;
    left: 0;
  }
  
  .banner-stone {
    bottom: 0;
    left: 0;
    width: 150px;
  }

  .banner-telescope, .banner-telescope > * {
    position: absolute;
    bottom: -100px;
    left: 60px;
    z-index: 1;
  }

  .banner-telescope-pod-1 {
    bottom: 0;
    left: 0;
    width: 280px;
    z-index: 0;
  }

  .banner-telescope-pod-2 {
    bottom: 276px;
    left: 103px;
    width: 50px;
    z-index: 2;
  }

  .banner-telescope-head {
    width: 200px;
    bottom: 202px;
    left: 28px;
    z-index: 1;
    transform: rotate(30deg);
  }

  .banner-sights {
    width: 413px;
    bottom: 10px;
    right: 80px
  }

  
  @media screen and (max-width: 1100px) {
    .banner-telescope {
      position: static;
    }
  }

  
  /* Section with telescope status (pause) */
  .telecopePause {
    font-family: var(--font-highlight);
    font-weight: 900;
    display: grid;
    grid-template-columns: 1fr 4fr;
    gap: var(--padding);
    text-align: left;
  }

  .telecopePause:before {
    content: "||";
    font-size: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .telecopePause-title {
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .telecopePause-content {
    align-self: center;
    padding: var(--padding) 0;
  }

  .telecopePause-content p {
    margin-bottom: calc(var(--space) * 0.5);
  }

  .banner .telecopePause {
    height: 100%;
    color: var(--color-lilac);
  }

  .banner .telecopePause:before {
    background-color: var(--color-blue-mid)
  }

  /* end of Section with telescope status (pause) */


  /* Day time change */

  .banner-top {
    --daychange-duration: 10s;

    background-position: 50% 0;
    background-size: 100% 600%;
    animation: var(--daychange-duration) DayTime linear forwards;
  }

  .banner-top.day {
    background-image: linear-gradient(#00519b, #ccc1ff, #5681ff, #c7ffdf, #00519b);
  }

  .banner-top.sunset {
    background-image: linear-gradient(#5681ff, #c7ffdf, #9265ab, #ffc888, #5681ff);
  }

  .banner-top.night {
    background-image: linear-gradient(#9265ab, #ffc888, #000008, #00819d, #9265ab);
    animation-name: DayTimeTextLight;
  }

  .banner-top.dawn {
    background-image: linear-gradient(#000008, #00819d, #00519b, #ccc1ff, #000008);
    color: var(--color-cyan);
    animation-name: DayTimeTextDark;
  }

  @keyframes DayTime {
    to{
      background-position: 50% 60%;
    }
  }

  @keyframes DayTimeTextLight {
    to{
      background-position: 50% -60%;
      color: var(--color-cyan)
    }
  }

  @keyframes DayTimeTextDark {
    to{
      background-position: 50% 60%;
      color: var(--color-blue-darkest)
    }
  }



  .night .banner-telescope-head {
    animation: TelescopeOn 3s ease var(--daychange-duration) forwards;
  }

  .night .banner-stone, .night .banner-grass, .night .banner-sights {
    animation: Darken 3s ease var(--daychange-duration) forwards;
  }

  .dawn .banner-telescope-head {
    transform: rotate(0deg);
    animation: TelescopeOff 3s ease calc(var(--daychange-duration) * 0.5) forwards;
  }

  @keyframes Darken {
    to {
      filter: brightness(0.5);
    }
  }

  @keyframes TelescopeOn {
    to {
      transform: rotate(0deg);
    }
  }

  @keyframes TelescopeOff {
    to {
      transform: rotate(30deg);
    }
  }

  /* end of Day time change */

</style>
