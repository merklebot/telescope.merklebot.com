<template>
  <div class="grid-1-2 rent">
    <div class="rent-side">
      <h1>Rent Spot</h1>
      <div class="spot-container"><Spot /></div>
      <p>Here you may buy a 1 hour-long remote session with Boston Dynamics Spot robot. Practice online wherever you are!</p>
      <p>Before renting, please make sure you have learned lesson. We recommend you carefully plan your online session before it starts - think about or write down specific code.</p>
    </div>

    <div>
      <Card>
        <h2>1. Check your Web3 account</h2>
        <p class="text-mid">We are looking to promote the adoption of Web3 technologies because we
        believe that they are natural and efficient for online identification
        and exchange of value. That is why to manage the lesson times and data
        from Spot, you need to create an account using the &nbsp;<a href="https://polkadot.js.org/extension/" target="_blank">Polkadot.js extension</a>. The logs that the robot will generate during your lesson will be
        automatically recorded and assigned to you, creating a cryptographic
        proof that you passed the lesson successfully.</p>

        <hr/>
        
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
                      {{ account.meta.name }} – {{ addressShort(account.address) }}
                      </option>
                  </select>
              </p>
              <p>
                <label>
                <input type="checkbox" name="checkedAccount" v-model="checkedAccount"> I wrote down seed phrase, keep it safe and have access to this account
                </label>
              </p>

            </form>
          </template>
          <template v-else>
            <label class="red">Please create an account or switch on account's visibility in <a href="https://polkadot.js.org/extension/" target="_blank">Polkadot.js extension</a>. Then reload this page.</label>
          </template>
        </template>

        <template v-else-if="error === null">
          <span class="loader"></span> <i class="text-mid">Checking Polkadot.js extension</i>
        </template>
        <template v-else>
          <template v-if="error === 'NOT_FOUND_EXTENSION'">
            <label class="red">Please install <a href="https://polkadot.js.org/extension/" target="_blank">Polkadot.js extension</a>, create and add Web3 account. Then reload this page.</label>
          </template>
          <template v-else-if="!accounts || accounts.length < 1">
            <div class="red">
              <label class="red">You currently don't have any accounts. Please create an account or switch on account's visibility in <a href="https://polkadot.js.org/extension/" target="_blank">Polkadot.js extension</a>. Then reload this page.</label>
            </div>
          </template>
          <template v-else>
            <div class="red">
              Error: <b>{{ error }}</b>
            </div>
          </template>
        </template>

      </Card>

      <Card :class="{'disabled': !checkedAccount || accounts.length < 1 || !isReady}">
        <h2>2. Make sure you have enough balance</h2>
        <p class="text-mid">To start online session, you will need to send a token from chosen Web3 account in Step 1 to your curator's account.</p>
        <p class="text-mid">Please check your email address carefully as we will send you invitation on the meeting with Spot, certificates and other important information regarding the course.</p>
        <hr/>
        
        <div class="grid-2">
          <div>

              <form @onChange="onChange" @submit.prevent="handleSubmit">
                  <p>
                    <select v-model="account" class="container-full">
                        <option
                        v-for="(account, key) in accounts"
                        :key="key"
                        :value="account.address"
                        >
                        {{ account.meta.name }} – {{ addressShort(account.address) }}
                        </option>
                    </select>
                  </p>
                  <p><input v-model="email" type="email" class="container-full" placeholder="Your email" name="email" required/></p>
                  <p><button class="container-full">Pay <pricePerLesson /> USD <img class="stripe" alt="" src="stripe.svg"/></button></p>
              </form>

          </div>
          <div>
            <h3>Your balance: {{ balance }} SPOT</h3>
            <p>1 hour session = 1 SPOT</p>
            <p>1 SPOT = <pricePerLesson /> USD</p>
          </div>
        </div>
    
      </Card>


      <Card :class="{'disabled': !checkedAccount || accounts.length < 1 || balance < 1 || !isReady}">
        <h2>3. Schedule your time</h2>

        <template v-if="isReady">
         <div
            v-show="status"
            class="meetings-iframe-container"
            data-src="https://meetings.hubspot.com/strelka?embed=true"
          ></div>
        </template>
      </Card>


    </div>
  </div>
</template>

<script>
import { checkout } from "../services/api";
import stripe from "../services/stripe";
import { getProvider, getInstance, getAccounts } from "../services/substrate";
import config from "../config";
import { loadScript } from "../utils/tools";

export default {
  components: {
    pricePerLesson: () => import('../components/includes/PricePerLesson.vue'),
    Spot: () => import('../components/includes/Spot.vue')
  },
  data() {
    return {
      isReady: false,
      error: null,
      api: null,
      unsubscribe: null,
      balance: 0,
      accounts: [],
      accountDefault: '',
      status: false
    };
  },
  async created() {
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
      
      if(this.accounts) {
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
    }
  },

  computed: {
    checkedAccount: {
      get () {
        return this.$store.state.checkedAccounts.includes(this.$store.state.accountActive)
      },
      set (value) {
        this.$store.commit('setAccountChecked', value)
      }
    },
    account: {
      get () {
        return this.$store.state.accountActive ? this.$store.state.accountActive : this.accountDefault
      },
      set (value) {
        this.$store.commit('setAccountActive', value)
      }
    },
    email: {
      get () {
        return this.$store.state.email
      },
      set (value) {
        this.$store.commit('setEmail', value)
      }
    }
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
      if (this.email && this.account) {
        this.checkout(this.account, this.email);
      }

    },
    async checkout(account, email) {
      this.proccess = true;
      try {
        const session = await checkout({
          account: account,
          email: email
        });
        const r = await stripe.redirectToCheckout({ sessionId: session.id });
        if (r.error) {
          console.error(r.error.message);
        }
      } catch (error) {
        console.log(error);
      }
      this.proccess = false;
    }
  }
};
</script>

<style scoped>
  
  @media screen and (min-width:800px){
    .rent {
      align-items: start;
    }

    .rent-side {
      position: -webkit-sticky;
      position: sticky;
      top: calc(var(--space) * 8)
    }
  }


  .spot-container {
    overflow: hidden;
    max-width: calc(100vw - var(--space)*2);
  }

  .spot {
    margin-bottom: calc(var(--space)*2);
  }

  @media screen and (min-width: 500px) and (max-width:800px){
    .spot {
      transform: scale(1) translateX(80px) !important;
    }
  }

  .stripe {
    width: 50px;
    display: inline-block;
    vertical-align: middle;
    margin-left: var(--space);
  }
  

   @keyframes bounceLoader {
    0{
      transform: translateY(-1rem);
    }
    50%{
      transform: translateY(1rem) scaleY(0.8);
    }
    100%{
      transform: translateY(-1rem);
    }
  }

  .loader {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    border-radius: 2rem;
    margin-right: var(--space);
    background-color: var(--color-yellow);
    transform: translateY(-1rem);
    animation: bounceLoader 1s ease infinite;
  }

</style>