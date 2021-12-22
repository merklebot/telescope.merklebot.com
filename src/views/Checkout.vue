<template>
  <div>
      <div class="banner">
        <div class="banner-top" :class="bannerClasses">
          <div class="banner-top-content">
            <h1>Watch the stars and get your NFT</h1>
            <div class="layout-narrow">
              <p>Connect to an autonomous telescope in the Atacama desert, take a picture of deep Space and issue your <a href="https://singular.rmrk.app/" target="_blank" rel="noopener noreferrer">NFT</a> in a few clicks.</p>
            </div>
            <Button v-on:click.native="start">Start</Button>
          </div>

          <div class="banner-top-art">
            <div class="banner-grass"></div>
            <img aria-hidden="true" src="i/banner-stone.png" class="banner-stone" />
            <img aria-hidden="true" src="i/banner-clouds.png" class="banner-clouds" />
            <img aria-hidden="true" src="i/banner-sights.png" class="banner-sights" />
            <div class="banner-telescope">
              <img aria-hidden="true" src="i/banner-telescope-pod-1.png" class="banner-telescope-pod-1" />
              <img aria-hidden="true" src="i/banner-telescope-pod-2.png" class="banner-telescope-pod-2" />
              <img aria-hidden="true" src="i/banner-telescope-head.png" class="banner-telescope-head" />
            </div>
          </div>
        </div>
        <div class="banner-bottom">
          <div class="telecopePause layout-narrow" v-if="!telescopeOn()">
             <div class="telecopePause-content" v-if="!isNight()">
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
          <h3>1. Create or choose your crypto account</h3>

          <p class="hyphens">
            We use
            <a href="https://polkadot.js.org/extension/" target="_blank"
              >Polkadot.js extension</a
            >
            and Kusama Relay Chain to manage user account. Don't worry if you
            haven't it yet. Just follow the official instructions and than get
            your telescope tokens with an old familiar credit card here in the
            next step.
          </p>

          <section>
            <template v-if="isReady">
            <template v-if="accounts.length > 0">
              <form>
                <p>
                  <select v-model="account">
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
                <p>
                  <label>
                    <input
                      type="checkbox"
                      name="checkedAccount"
                      v-model="checkedAccount"
                    />
                    I wrote down seed phrase, keep it safe and have access to this
                    account
                  </label>
                </p>
              </form>
            </template>
          <template v-else>
            <label class="red"
              >Please create an account or switch on account's visibility in
              <a href="https://polkadot.js.org/extension/" target="_blank"
                >Polkadot.js extension</a
              >. Then reload this page.</label
            >
          </template>
        </template>

        <template v-else-if="error === null">
          <span class="loader"></span>
          <i class="text-mid">Checking Polkadot.js extension</i>
        </template>
        <template v-else>
          <template v-if="error === 'NOT_FOUND_EXTENSION'">
            <label class="red"
              >Please install
              <a href="https://polkadot.js.org/extension/" target="_blank"
                >Polkadot.js extension</a
              >, create and add Web3 account. Then reload this page.</label
            >
          </template>
          <template v-else-if="!accounts || accounts.length < 1">
            <div class="red">
              <label class="red"
                >You currently don't have any accounts. Please create an account
                or switch on account's visibility in
                <a href="https://polkadot.js.org/extension/" target="_blank"
                  >Polkadot.js extension</a
                >. Then reload this page.</label
              >
            </div>
          </template>
          <template v-else>
            <div class="red">
              Error: <b>{{ error }}</b>
            </div>
          </template>
        </template>

          </section>


        </div>
      </section>


      <section class="section-blue-dark">
        <div class="layout-narrow">
          <h3>2. Get telescope tokens</h3>

          <p class="hyphens">
            An autonomous telescope leaves in Chile desert Atacama and works online. So he accepts specific token for his job. You can get it here with your credit card.
          </p>

          <section>
            <ul class="dashed">
              <li>1 picture with NFT minting = 1 $STRGZN</li>
              <li>1 $STRGZN = {{ pricePerToken }} USD</li>
              <li>Your balance is: {{ balance }} $STRGZN</li>
              <li>
                You buy: <input v-model.number="quantityRaw" value="quantity"/> $STRGZN
              </li>
            </ul>
          </section>

          <form @onChange="onChange" @submit.prevent="handleSubmit" :class="{
          disabled: !checkedAccount || accounts.length < 1 || !isReady,
        }">
            <p>
              <Button class="container-full">
                <span class="text">Pay {{ pricePerToken }} * {{ quantity }} = {{ totalPaymentUSD }} USD</span>
                <img class="label" alt="with Stripe" src="i/stripe.svg" />
              </Button>
            </p>
          </form>
        </div>
      </section>



          <div>


     
      <astronomicalObjectCard :checkedAccount="this.checkedAccount" :accounts="this.accounts"  :isReady="this.isReady" />
      <!-- <Card :class="{'disabled': !checkedAccount || accounts.length < 1 || balance < 1 || !isReady}">
        <h2>3. Schedule your time</h2>

        <template v-if="isReady">
         <div
            v-show="status"
            class="meetings-iframe-container"
            data-src="https://meetings.hubspot.com/strelka?embed=true"
          ></div>
        </template>
      </Card> -->
    </div>


    
  </div>  

</template>

<script>
import { checkout, serviceStatus } from "../services/api";
import stripe from "../services/stripe";
import { getProvider, getInstance, getAccounts } from "../services/substrate";
import config from "../config";
import { loadScript } from "../utils/tools";

import moment from 'moment-timezone'

export default {
  components: {
    astronomicalObjectCard: () => import('../components/includes/AstronomicalObjectCard.vue'),
    Button: () => import('../components/includes/Button.vue'),
  },
  data() {
    return {
      isReady: false,
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
      quantity: 1, // filtered value
      quantityRaw: 1, // raw user input

      // USD price per one STRGZN
      pricePerToken: (config.PRICE_PER_LESSON_CENTS / 100).toFixed(2),

      time: "test"

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
        console.log(this.serviceStatus)
      }, 10000)

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

    } catch (error) {
      this.error = error.message;
    }
  },
  mounted() {
      this.time = this.countdown(Date.now())
      var self = this

      setInterval(() => {
       self.time = self.countdown(Date.now())
      }, 1000)
  },
  destroyed() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  },
  watch: {
    quantityRaw: function (newValue) {
      if (newValue && newValue >= 1 && newValue <= 100) {
        this.quantity = newValue.toFixed(0)
      } else if (newValue > 100) {
        this.quantity = 100
      }
    },
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
  },

  computed: {
    totalPaymentUSD: {
      get() {
        return (this.quantity * this.pricePerToken).toFixed(2)
      }
    },
    checkedAccount: {
      get() {
        return this.$store.state.checkedAccounts.includes(
          this.$store.state.accountActive
        );
      },
      set(value) {
        this.$store.commit("setAccountChecked", value);
      },
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

    bannerClasses() {
      return {
        [`is-day`]: this.isDay(),
        [`is-night`]: this.isNight(),
        [`is-dawn`]: this.isDawn(),
        [`is-sunset`]: this.isSunset(),
        [`on`]: this.telescopeOn(),
      };
    },
  },

  methods: {
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
        console.log(error);
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

    /* Gets telescope time in Atacama(Chile) */
    currentHour(){
      return moment(Date.now()).zone("-03:00").format("HH")
    },

    countdown(date) {
      var 
          current = moment.duration(moment(date).zone("-03:00").format("HH:MM:SS")),
          next = moment.duration('17:00:00'),
          timer = next.subtract(current);

      return timer.hours() + ":" + timer.minutes() + ":" + timer.seconds()
    },

    /* For frontend purposes */
    isDay() {
      return this.currentHour() >= 10 && this.currentHour() < 16
    },

    isNight() {
      return this.currentHour() >= 17 || this.currentHour() <= 10
    },

    isDawn() {
      return this.currentHour() > 9 && this.currentHour() <= 10
    },

    isSunset() {
      return this.currentHour() >= 16 && this.currentHour() < 17
    },

    telescopeOn() {
      /* && this.serviceStatus.status on */
      if( this.isNight() ) { return true }
    }
  },
};
</script>

<style scoped>
  .banner {
    min-height: 100vh;
    display: grid;
    grid-template-rows: 5fr 1fr;
    overflow: hidden;
  }

  .banner-top {
    background: linear-gradient(#5681ff, #c7ffdf);
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

  .banner-telescope {
    bottom: -100px;
    left: 60px;
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
  }

  .banner-sights {
    width: 413px;
    bottom: 20px;
    right: 80px
  }

  .banner-clouds {
    width: 1800px;
    left: calc(50% - 900px);
    bottom: 120px
  }

  
  /* Section with telescope status (pause) */
  .telecopePause {
    font-family: var(--font-highlight);
    font-weight: 900;
    display: grid;
    grid-template-columns: 1fr 4fr;
    gap: var(--padding)
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
  }

  .banner .telecopePause {
    height: 100%;
    color: var(--color-lilac);
  }

  .banner .telecopePause:before {
    background-color: var(--color-blue-mid)
  }

  /* end of Section with telescope status (pause) */

</style>
