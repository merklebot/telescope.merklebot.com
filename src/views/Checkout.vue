<template>
  <div>
      <div class="banner" :class="service.status">
        <div class="banner-top" :class="dayTimeClass">
          <div class="banner-top-content">
            <h1>Connecting Universe to Metaverse!</h1>
            <div class="layout-narrow">
              <p>Connect to our autonomous telescope in the dark night of Atacama desert in Chile, select an astronomical object and mint unique NFTs in a few clicks.</p>
            </div>

            <!-- {{$store.state.app.status}}<br/>
            {{$store.state.polkadot.accounts}}<br/> -->

            <template v-if="$store.state.app.status === 'start'">
                <span class="loader"></span>
            </template>
            <template v-else-if="$store.state.app.status === 'start clicked' || $store.state.app.status === 'extension error'">
              <Button @click.native="jump('#start')">Start</Button>
            </template>
            <template v-else>
              <template v-if="balance > 0">
                <Button @click.native="jump('#step-3')" size="medium" color="green">Buy or check your NFT</Button>
              </template>
              <template v-if="balance === 0">
                <Button @click.native="jump('#step-2')" size="medium" color="orange">Get your NFT</Button>
              </template>
            </template>
            
            <!-- <template v-if="isReady && accounts.length > 0">
              <a v-if="this.account" :href="'https://singular.rmrk.app/space/' + this.account + '?tab=owned&owner=yes'" target="_blank" rel="noopener noreferrer">Check your NFTs</a>
              <a v-else href="#step-1" @click.prevent="jump('#step-1')">Connect account to check NFTs</a>
              <section class="small m-b-0">or</section>
              <Button @click.native="jump('#step-1')" size="medium" class="m-t-0">Buy NFT</Button>
            </template> -->

            <div class="banner-telescope" aria-hidden="true">
              <img aria-hidden="true" src="i/banner-telescope-pod-1.png" class="banner-telescope-pod-1" />
              <img aria-hidden="true" src="i/banner-telescope-pod-2.png" class="banner-telescope-pod-2" />
              <img aria-hidden="true" src="i/banner-telescope-head.png" class="banner-telescope-head" />
            </div>
          </div>

          <div class="banner-top-art" aria-hidden="true">
            <div class="banner-grass"></div>
            <img aria-hidden="true" src="i/banner-stone.png" class="banner-stone" />
            <img aria-hidden="true" src="i/banner-sights.png" class="banner-sights" />
          </div>
        </div>
        <div class="banner-bottom">
          <div class="layout-narrow">
            <div class="service-status">Telescope {{service.status}}</div>
            <div class="service-message">{{service.message}}</div>
          </div>
        </div>
      </div>

      <section id="start" class="section-blue">
        <div class="layout-narrow">
          <h2>Follow the steps and mint your nft Of astronomical object</h2>
        </div>
      </section>

      <section id="step-1" class="section-blue-mid">
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


          <section v-if="$store.state.app.status === 'start'">
            <Button v-on:click.native="$store.commit('setAppStatus', 'start clicked')">Connect account</Button>
          </section>

          <section v-else>

            <template v-if="$store.state.app.status === 'start clicked'">
              <span class="loader"></span>
              <i>Checking Polkadot.js extension</i>
            </template>

            <template v-if="$store.state.app.status === 'extension error'">
              <p class="error-title">{{ $store.state.polkadot.message }}</p>
              <p class="error-text">
                <template v-if="$store.state.polkadot.message === 'NOT_FOUND_EXTENSION'">
                  Please install
                  <a href="https://polkadot.js.org/extension/" target="_blank"
                    >Polkadot.js extension</a
                  >, create and add Web3 account. Then reload this page.
                </template>

                <template v-else-if="$store.state.polkadot.message === 'accounts not found'">
                  Please create an account
                  or switch on account's visibility in
                  <a href="https://polkadot.js.org/extension/" target="_blank">Polkadot.js extension</a>. Then reload this page.
                </template>

                <template v-else>
                  Polkadot.js extension error, please try to reload page, if error still occurs <a :href="$discord" target="_blank" rel="noopener noreferrer">contact us</a>
                </template>
              </p>
            </template>

            <template v-if="$store.state.app.status === 'extension ready'">
              <form>
                  <p>
                    <select class="container-full" v-model="account">
                      <option
                        v-for="(account, key) in $store.state.polkadot.accounts"
                        :key="key"
                        :value="account.address"
                      >
                        {{ account.meta.name }} –
                        {{ addressShort(account.address) }}
                      </option>
                    </select>
                  </p>
                </form>
            </template>

          </section>

        </div>
      </section>


      <section id="step-2" class="section-blue-dark p-b-0">
        <div class="layout-narrow">
          <h3>2. Get telescope tokens</h3>

          <p class="hyphens">
            Our telescope only accepts special $STRGZN tokens and you can buy them below using your credit card. 
          </p>
        </div>

        <section class="tokenSection layout-sm">
          <div class="tokenSection-info">
            <h4>
              Your balance 
              <span :class="{'text-green':balance>0}">{{ balance }} $STRGZN</span>
              <div v-if="checkoutComplite==='success'" class="text-green">Payment successful</div>
              <div v-if="checkoutComplite==='error'" class="text-red">Payment error, please <a :href="$discord" target="_blank" rel="noopener noreferrer">contact us</a></div>
            </h4>
            <p>1 $STRGZN = {{ pricePerToken }} USD</p>
            <p>With 1 $STRGZN you can get 1 telescope NFT</p>
          </div>

          <div class="tokenSection-form">
            <h4>Purchase tokens</h4>

            <p 
              v-if="$store.state.app.status !== 'extension ready'" 
              class="error-title text-small">
              
              Please <a href="#step-1" @click.prevent="jump('#step-1')">connect your Polkadot account</a>
            </p>

            <form 
              @onChange="onChange" 
              @submit.prevent="handleSubmit" 
              :class="{disabled: $store.state.app.status !== 'extension ready'}">
              <div class="inputNumbers m-b-space">
                <div class="less" @click="setQuantity(-1)">-</div>
                <input type="number" v-model.number="quantity" value="quantity" required />
                <div class="more" @click="setQuantity(+1)">+</div>
              </div>

              <h5>Total: {{ totalPaymentUSD }} USD</h5>

              <Button class="container-full" size="medium" :disabled="!checkoutStatus">
                <span class="text">Pay with</span>
                <img class="label" alt="Stripe" src="i/stripe.svg" />
              </Button>
            </form>
          </div>
        </section>
      </section>

      <astronomicalObjectCard :balance="this.balance"/>
  
  </div>  

</template>

<script>
import { checkout } from "../services/api";
import stripe from "../services/stripe";
import config from "../config";
import { loadScript } from "../utils/tools";

export default {
  components: {
    astronomicalObjectCard: () => import('../components/includes/AstronomicalObjectCard.vue'),
    Button: () => import('../components/includes/Button.vue')
  },
  data() {
    return {
      error: null,
      api: null,
      unsubscribe: null,
      balance: 0,
      accounts: [],
      accountDefault: "",

      status: false,

      // USD price per one STRGZN
      // changed here number of decimals from 2 to 0 @positivecrash
      pricePerToken: (config.PRICE_PER_LESSON_CENTS / 100).toFixed(),

      // How much STRGZN tokens user selected to purchase
      // Better to set here minimum possible by default
      quantity: parseInt(config.PRICE_PER_LESSON_CENTS / 100),

      dayTimeClass: null,

      checkoutStatus: true,

      checkoutComplite: false

    };
  },

  computed: {
    service() {
      // Gets Vuex global state
      return this.$store.state.service
    },
    
    totalPaymentUSD() {
      return (this.quantity * this.pricePerToken).toFixed(2)
    },

    account: {
      get() {
        return this.$store.state.app.account
      },
      set(value) {
        this.$store.dispatch("setAccountActive", value)
      },
    },

    // email: {
    //   get() {
    //     return this.$store.state.email;
    //   },
    //   set(value) {
    //     this.$store.commit("setEmail", value);
    //   },
    // },
  },

  methods: {
    setQuantity(change) {
      // This is for input[number] controls - +
      if ( (this.quantity + change) >=  config.MIN_TOKENS_BUY &&  (this.quantity + change) <=  config.MAX_TOKENS_BUY ){
        return this.quantity += change
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
      // disabling button on click
      this.checkoutStatus = false

      if (this.account) {
        this.checkout(this.account, this.quantity);
      }
    },
    async checkout(account, quantity) {
      this.proccess = true;
      try {
        const session = await checkout({
          account,
          quantity
        });
        const r = await stripe.redirectToCheckout({ sessionId: session.id });
        if (r.error) {
          console.error(r.error.message);
        }
      } catch (error) {
        console.log("Checkout error:", error);
      }
      this.proccess = false;
      this.checkoutStatus = true
    },

    jump(anchor) {
      /* Jump to anchor */
      window.scrollTo({
          top: document.querySelector(anchor).offsetTop,
          behavior: "smooth"
      })
    },

    dayTime() {

      /* This is for banner gradient visualization, just relay on message */

      if( this.service.message ) {
        if ( this.service.message.includes('Daytime') ) {
          return 'day'
        }

        if ( this.service.message.includes('Night') ) {
          return 'night'
        }
      }
    }
    
  },

  async mounted() {
      // Get service status & message, astronomical objects with setinterval 10000 included. Vuex, main.js
      this.$store.dispatch("watchApiData")

      /* Set class for top banner */
      this.dayTimeClass = this.dayTime()

      /* Settimeout for payment messages */
      if(this.$route.query.checkout) {
        this.checkoutComplite = this.$route.query.checkout

        setTimeout(() => {
          if( this.checkoutComplite === 'success') {
            this.checkoutComplite = false
          } 
        }, 10000);
      }
  },

  beforeDestroy () {
    // Unsubscribe for "watchApiData". Vuex, main.js
    this.$store.dispatch("stopApiData")
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
    service: function() {
      this.dayTimeClass = this.dayTime()
    }
  },
};
</script>

<style scoped>

  /* Global CSS variables taken from App.vue */

  .banner {
    min-height: 100vh;
    display: grid;
    grid-template-rows: 1fr 10rem;
    overflow: hidden;
  }

  .banner-top {
    color: var(--color-blue-darkest);
    padding: calc(var(--padding) * 4) var(--padding) var(--padding);
    position: relative;
  }

  .banner-top, .banner-bottom {
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
  }

  .banner-top-content {
    text-align: center;
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
    pointer-events: none;
  }

  .banner-top-art * {
    position: absolute;
  }

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

  .banner-telescope {
    pointer-events: none;
    height: 454px;
    width: 280px;
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
  
  @media screen and (max-width: 1060px) {
    .banner-top {
      padding-top: calc(var(--padding) * 5);
    }
    .banner-top-content {
      position: relative;
      z-index: 1;
    }
    .banner-telescope {
      position: relative;
      bottom: 0;
      left: 0;
      margin-top: 60px;
      margin-left: auto;
      margin-right: auto;
    }
    .banner-grass {
      height: 131px;
    }
    .banner-stone, .banner-sights { display: none; }
  }

  /* Service status */

  .service-status {
    font-family: var(--font-highlight);
    font-weight: 900;
  }

  .service-status:before {
    margin-right: var(--space);
  }

  .on .service-status {
    color: var(--color-green)
  }

  .on .service-status:before {
    content: "✓";
  }

  .off .service-status {
    color: var(--color-red)
  }

  .off .service-status:before {
    content: "||";
  }

  .service-message {
    font-size: 80%;
    color: var(--color-lilac);
    opacity: 0.8;
  }
  /* end of Service status */


  /* Day time change */

  .banner-top {
    --daychange-duration: 6s;

    background-position: 50% 0;
    background-size: 100% 600%;
    animation: var(--daychange-duration) DayTime linear forwards;
  }

  .banner-top.day {
    background-image: linear-gradient(#00519b, #ccc1ff, #5681ff, #c7ffdf, #00519b);
  }

  /* .banner-top.sunset {
    background-image: linear-gradient(#5681ff, #c7ffdf, #9265ab, #ffc888, #5681ff);
  } */

  .banner-top.night {
    background-image: linear-gradient(#9265ab, #ffc888, #000008, #00819d, #9265ab);
    animation-name: DayTimeTextLight;
  }
/* 
  .banner-top.dawn {
    background-image: linear-gradient(#000008, #00819d, #00519b, #ccc1ff, #000008);
    color: var(--color-cyan);
    animation-name: DayTimeTextDark;
  } */

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

    /* Token purchase section */
  .tokenSection {
    display: grid;
    grid-template-columns: 1.5fr 2fr;
    gap: calc(var(--space) * 3);
    background: url("/i/telescope-shadow.png") no-repeat 100% 100%;
    background-size: 260px;
    min-height: 480px;
  }

  .tokenSection h4 span {
    display: block;
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
    padding: calc(var(--space) * 2) var(--space);
    border-radius: 20px;
    max-width: 350px;
  }

  .tokenSection-form h4 {
    text-transform: uppercase;
  }
  
  @media screen and (max-width: 1200px) {
    .tokenSection {
      grid-template-columns: 1fr;
    }

    .tokenSection h4 span {
      display: inline;
    }

    .tokenSection-info, .tokenSection-form {
      /* max-width: 500px; */
      margin: 0 auto;
    }

    .tokenSection-info, .tokenSection-info h4 {
      text-align: center;
    }
  }

  @media screen and (max-width: 900px) {
    .tokenSection{
      background: none
    }

  }

  @media screen and (max-width: 570px) {
    .tokenSection-info, .tokenSection-form {
      max-width: auto
    }

  }
  /* end of Token purchase section */

</style>
