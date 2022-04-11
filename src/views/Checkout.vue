<template>
  <div>
      <div class="banner" :class="service.status">
        <div class="banner-top" :class="conditionsStatus">
          <div class="banner-top-content">
            <h1>Connecting Universe to Metaverse!</h1>
            <div class="layout-narrow">
              <p>Connect to our autonomous telescope in the dark night of Atacama desert in Chile, select an astronomical object and mint unique NFTs in a few clicks.</p>
            </div>

            <template v-if="$store.state.app.status === 'start'">
                <span class="loader"></span>
            </template>

            <template v-else-if="$store.state.app.status === 'start clicked' || $store.state.app.status === 'extension error'">
              <Button @click.native="jump('#start')">Start</Button>
            </template>

            <template v-else-if="$store.state.app.account">

                <div><Button @click.native="jump('#step-2')" size="medium" color="orange">Get access</Button></div>

                <div>or</div>

                <div><Button 
                :href="'https://singular.rmrk.app/space/' + $store.state.app.account + '?tab=owned&owner=yes'" 
                size="medium" 
                color="green"
                target="_blank" rel="noopener noreferrer">
                  Check your NFT
                </Button></div>
            </template>

            <div class="banner-telescope" aria-hidden="true">
              <img aria-hidden="true" src="i/banner-telescope-pod-1.png" class="banner-telescope-pod-1" />
              <img aria-hidden="true" src="i/banner-telescope-pod-2.png" class="banner-telescope-pod-2" />
              <img aria-hidden="true" src="i/banner-telescope-head.png" class="banner-telescope-head" />
            </div>
          </div>

          <div class="banner-top-art" aria-hidden="true">
            <Stars />
            <img aria-hidden="true" src="i/cloud-1.png" class="cloud cloud-1" />
            <img aria-hidden="true" src="i/cloud-2.png" class="cloud cloud-2" />
            <img aria-hidden="true" src="i/cloud-3.png" class="cloud cloud-3" />
            <div class="banner-grass"></div>
            <img aria-hidden="true" src="i/banner-stone.png" class="banner-stone" />
            <img aria-hidden="true" src="i/banner-sights.png" class="banner-sights" />   
          </div>
          
        </div>
        <div class="banner-bottom">
          <div class="layout-narrow">
            <div class="service-status">Telescope {{service.status}}</div>
            <!-- <div class="service-message">{{service.message}}</div> -->
            <p class="service-message">
              <span v-if="conditionsStatus.includes('night')">{{service.message}}</span>
              <span v-if="conditionsStatus.includes('day')">Telescope is waiting for night…</span><br/>
              <span v-if="conditionsStatus.includes('day') && countdownToNight">{{ countdownToNight }}</span>
            </p>
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

            <p
              v-if="$store.state.app.status !== 'extension ready'"
              class="error-title text-small"
            >
              Please
              <a href="#step-1" @click.prevent="jump('#step-1')"
                >connect your Polkadot account</a
              >
            </p>

            <h4 v-if="$store.state.app.status == 'extension ready'" class="purchase-balance">
              Your balance 
              <span :class="{'text-green': $store.state.app.balance > 0}">{{ $store.state.app.balance }} $STRGZN</span>
              <div v-if="$store.state.app.checkoutStatus === 'success'" class="text-green">
                Payment successful!<br/>
                Please wait for your $STRGZN tokens<br/>
                ~ 1 minute
              </div>
              <div v-if="$store.state.app.checkoutStatus === 'error'" class="text-red">Payment error, please <a :href="$discord" target="_blank" rel="noopener noreferrer">contact us</a></div>
            </h4>
            
            <p><span class="nowrap">1 $STRGZN</span> = <span class="nowrap">{{ pricePerTokenCents / 100 }} USD*</span><br/>
            <span class="nowrap">1 Space NFT</span> = <span class="nowrap">25 $STRGZN</span></p>
            <div class="tip">* STRGZN is not a cryptocurrency token, and STRGZN has no resale value. The $1 value is only associated with purchase of STRGZN.</div>
          </div>

          <div class="tokenSection-form">
        
            <PurchaseTokens
              ref="purchaseTokens"
              :extensionStatus="$store.state.app.status"
              :jumpToExtensionSetupFunction="jump"
              :submitHandler="handleSubmit"
              :checkoutStatus="checkoutStatus"
              :checkoutCryptoTxInfo="checkoutCryptoTxInfo"
              :pricePerNftInStrgzn="pricePerNftInStrgzn"
              :pricePerStrgznInCents="pricePerTokenCents"
              :pricePerStrgznInPicoKsm="pricePerTokenPicoKsm"
              :tokensPurchaseMinMax="tokensPurchaseMinMax"
              :defaultQuantity="defaultQuantity"
              :picoKsmBalance="$store.state.app.picoKsmBalance"
              @resetCheckoutCryptoTxInfo="resetCheckoutCryptoTxInfo"
            />
            
          </div>
        </section>
      </section>

      <astronomicalObjectCard
        v-bind:address="account"
      />
  
  </div>  

</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import {
  checkout,
  getTimeNight,
  createCryptoPurchase,
  submitCryptoPurchaseKusamaPaymentInfo,
} from "../services/api";
import stripe from "../services/stripe";
import config from "../config";

// Timer
import moment from 'moment-timezone';
import {
  signAndSend2,
  createTransfer,
} from '../services/substrate';

export default {
  components: {
    astronomicalObjectCard: () => import('../components/includes/AstronomicalObjectCard.vue'),
    Button: () => import('../components/includes/Button.vue'),
    Stars: () => import('../components/includes/Stars.vue'),
    PurchaseTokens: () => import ('../components/forms/PurchaseTokens.vue'),
  },
  data() {
    return {
      error: null,

      pricePerNftInStrgzn: config.PRICE_PER_NFT_STRGZNS,
      tokensPurchaseMinMax: {
        max: config.MAX_TOKENS_BUY,
        min: config.MIN_TOKENS_BUY,
      },

      // USD price per one STRGZN
      pricePerTokenCents: config.PRICE_PER_STRGZN_CENTS,

      // How much STRGZN tokens user selected to purchase
      // Let's set a value for a couple of NFTs by default
      defaultQuantity: config.PRICE_PER_NFT_STRGZNS * 2,

      pricePerNftInUsd: config.PRICE_PER_NFT_STRGZNS * config.PRICE_PER_STRGZN_CENTS / 100,

      conditionsStatus: "",

      checkoutStatus: true,
      checkoutCryptoTxInfo: null,

      // For timer
      countdownToNight: null,
      countdownToNightUpdateTimeoutId: null,
      time: "00:00:00",
      hourStartNight: "18",
      hourEndNight: "05",
      currentHour: "00",
      timeId: null
    };
  },

  computed: {
    service() {
      // Gets Vuex global state
      return this.$store.state.service
    },
    
    totalPaymentUSD() {
      return (this.quantity * this.pricePerTokenCents / 100).toFixed(2)
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

    pricePerTokenPicoKsm: {
      get() {
        return this.$store.state.prices.strgznPicoKsm
      }
    },
  },

  methods: {
    addressShort(address) {
      return address.slice(0, 6) + "..." + address.slice(-4);
    },

    async handleSubmit(paymentMethod, baseAmount, quoteAmount) {
      this.checkoutStatus = false
      if (!this.account) {
        console.warn("Token purchase skipped becase customer account is not set")
        return
      }
      console.log(`New purchase, payment method: ${paymentMethod}, base amount: ${baseAmount}, quote amount: ${quoteAmount}`)
      switch (paymentMethod) {
        case "Card":
          await this.checkout(this.account, Math.trunc(quoteAmount)) // ToDo: fix payee service to support cents
          break
        case "KSM":
          await this.checkoutCrypto(baseAmount, quoteAmount)
          break
        default:
          console.warn("Token purchase skipped becase an unexpected payment method provided:", paymentMethod)
          break
      }
      this.checkoutStatus = true
    },
    async checkout(account, quantity) {
      this.proccess = true;
      const isReferrerOwnedByCustomer = this.$store.state.polkadot.accounts
        .map((account) => { return account.address })
        .some((address) => { return address == this.$store.state.referrer })
      try {
        const session = await checkout({
          account,
          quantity,
          ...(!isReferrerOwnedByCustomer && { referrer: this.$store.state.referrer }), // prevent using owned accounts as referral
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
    async checkoutCrypto(strgznAmount, ksmAmount) {
      this.process = true;
      const uuid = uuidv4()
      const isReferrerOwnedByCustomer = this.$store.state.polkadot.accounts
        .map((account) => { return account.address })
        .some((address) => { return address == this.$store.state.referrer })
      const createdCryptoPurchase = await createCryptoPurchase(
        uuid,
        this.account,
        ksmAmount * Math.pow(10, 12),
        strgznAmount,
        this.pricePerTokenPicoKsm,
        isReferrerOwnedByCustomer ? undefined : this.$store.state.referrer, // prevent using owned accounts as referral
      )
      const tx = await createTransfer(
        config.CRYPTO_PAYMENT_RECV_ACCOUNT,
        ksmAmount * Math.pow(10, 12),
      )
      console.log(`Transfer transaction for ${ksmAmount} created: ${JSON.stringify(tx)}`)
      const isSignedAndSent = await signAndSend2(this.$store.state.app.account, tx,
        async (blockHash, extrinsicHash) => {
          console.log(`Tx included, block hash: ${blockHash}, extrinsic hash: ${extrinsicHash}`)
          this.checkoutCryptoTxInfo = {
            included: {
              blockHash,
              extrinsicHash,
            }
          }
        },
        async (blockHash, extrinsicHash) => {
          console.log(`Tx finalized, block hash: ${blockHash}, extrinsic hash: ${extrinsicHash}`)
          this.checkoutCryptoTxInfo = {
            finalized: {
              blockHash,
              extrinsicHash,
            }
          }
          await submitCryptoPurchaseKusamaPaymentInfo(
            createdCryptoPurchase.id,
            this.account,
            "0",
            this.checkoutCryptoTxInfo.finalized.blockHash,
            this.checkoutCryptoTxInfo.finalized.extrinsicHash,
          )
          this.process = false
          this.checkoutStatus = true
        }
      )
      if (!isSignedAndSent) {
        console.log("Transfer is cancelled or not successful")
        this.process = false
        this.checkoutStatus = true
        return
      }
      this.checkoutCryptoTxInfo = {
        created: {
          extrinsicHash: tx.hash.toString(),
        },
      }
      this.$refs.purchaseTokens.onTransactionSigned()
    },
    resetCheckoutCryptoTxInfo() {
      this.checkoutCryptoTxInfo = null
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

      let status = ""

      if( this.service.message ) {
        if ( this.service.message.toLowerCase().includes('daytime') ) {
          status = 'day '
        }

        if ( this.service.message.toLowerCase().includes('night') ) {
          status = 'night '
        }

        if ( this.service.message.toLowerCase().includes('cloud') ) {
          status += 'cloudy '
        }
      }

      return status
    },

    /* Timer - Gets telescope time in Atacama(Chile) */
    getCurrentHour(){
      return new Date().toLocaleString("en-US", { timeZone: "America/Santiago", hour: 'numeric', hour12: false })
    },
    currentTime(){
      return new Date().toLocaleString("en-US", { timeZone: "America/Santiago", hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false })
    },
    /* Timer - Gets how long left tonight */
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

      return timeString
    },
    
  },

  async mounted() {
      /* Set some global options for app */
      this.$store.dispatch("onMount", this.$route)
      
      /* Set class for top banner */
      this.conditionsStatus = this.dayTime()

      /* Set timer */
      const timeNight = await getTimeNight();
      this.hourStartNight = moment(timeNight.start).hour();
      this.hourEndNight = moment(timeNight.end).hour();

      var self = this
      this.time = this.countdown(this.currentTime())
      this.currentHour = this.getCurrentHour()
      this.timeId = setInterval(() => {
        self.time = self.countdown(self.currentTime())
        self.currentHour = self.getCurrentHour()
      }, 10000)

      // Update countdown message
      setImmediate(async () => {
        const tonight = await getTimeNight()
        const tonightFetchedAt = Date.now()
        const updateCountdownToNight = async () => {
          const dt = Date.now() - tonightFetchedAt
          if (dt <= 0) {
            this.countdownToNight = null
          } else {
            const message = moment.duration(tonight.left * 1_000 - dt).humanize() + ' left'
            this.countdownToNight = message.charAt(0).toUpperCase() + message.slice(1)
          }
          this.countdownToNightUpdateTimeoutId = setTimeout(updateCountdownToNight, 10_000)
        }
        updateCountdownToNight()
      })
  },

  watch: {
    service: function() {
      this.conditionsStatus = this.dayTime()
    }
  },

  beforeDestroy() {
    clearInterval(this.timeId)
    clearInterval(this.countdownToNightUpdateTimeoutId)
  }
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
    pointer-events: none;
    overflow: hidden;
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

  .cloud-1 {
    bottom: 50px;
    left: calc(50% - 350px);
    transform: translateY(-10%);
  }

  .cloud-2 {
    bottom: 120px;
    left: -30px;
    transform: translateX(-10%);
  }

  .cloud-3 {
    bottom: 120px;
    right: -30px;
    transform: translateX(10%);
  }

  .cloud {
    display: none;
    opacity: 0;
    animation: cloud 2s cubic-bezier(0.165, 0.84, 0.44, 1) 0.5s forwards;
  }

  @keyframes cloud {
    to {
      opacity: 1;
      transform: translateX(0) translateY(0);
    }
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

  .banner-top .sky {
    display: none;
  }

  .banner-top.night:not(.cloudy) .sky {
    display: block;
  }

  .banner-top.cloudy .cloud{
    display: block;
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
/* 
  .dawn .banner-telescope-head {
    transform: rotate(0deg);
    animation: TelescopeOff 3s ease calc(var(--daychange-duration) * 0.5) forwards;
  } */

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
    #step-2 {
      overflow: hidden
    }

  .tokenSection {
    display: grid;
    grid-template-columns: auto 350px;
    gap: calc(var(--space) * 3);
    min-height: 480px;
    max-width: 45rem;
    text-align: center;
    position: relative;
  }

  .tokenSection:before {
    content: "";
    background: url("/i/telescope-shadow.png") no-repeat 0 0;
    background-size: contain;
  
    width: 300px;
    height: 400px;
    position: absolute;
    bottom: calc(var(--padding) * (-1));
    right: -300px;
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

  .tokenSection-form-section:not(:last-child) {
    margin-bottom: var(--space);
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

    .tokenSection:before {
      right: -200px;
    }
  }

  @media screen and (max-width: 660px) {
    .tokenSection:before {
      display: none;
    }
  }

  @media screen and (max-width: 570px) {
    .tokenSection-info, .tokenSection-form {
      max-width: auto
    }

  }

  .purchase-balance {
    text-transform: uppercase;
    white-space: 1px;
    color: var(--color-white);
  }
  /* end of Token purchase section */

</style>
