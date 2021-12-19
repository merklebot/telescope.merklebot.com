<template>
  <div class="grid-1-2 rent">
    <div class="rent-side">
      <h1>Rent Spot</h1>
      <div class="spot-container"><Spot /></div>
      <p>
        Here you may buy a 1 hour-long remote session with Boston Dynamics Spot
        robot. Practice online wherever you are!
      </p>
      <p>
        Before renting, please make sure you have learned lesson. We recommend
        you carefully plan your online session before it starts - think about or
        write down specific code.
      </p>
    </div>

    <div>
      <Card>
        <h2>WATCH THE STARS AND GET YOUR NFT</h2>
        <p class="text-mid">
          Connect to an autonomous telescope in the Atacama desert, take a
          picture of deep Space and issue your NFT in a few clicks.
        </p>
        <a href="#start">START</a>
      </Card>

      <Card id="start">
        <h2>FOLLOW THE STEPS AND MINT YOUR NFT OF ASTRONOMICAL OBJECT</h2>
        <h3>1. Choose or create your crypto account</h3>
        <p class="text-mid">
          We use
          <a href="https://polkadot.js.org/extension/" target="_blank"
            >Polkadot.js extension</a
          >
          and Kusama Relay Chain to manage user account. Don't worry if you
          haven't it yet. Just follwo the official instructions and than get
          your telescope tokens with an old familiar credit card here in the
          next step.
        </p>

        <hr />

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
      </Card>

      <Card
        :class="{
          disabled: !checkedAccount || accounts.length < 1 || !isReady,
        }"
      >
        <h2>2. Get telescope tokens</h2>
        <p class="text-mid">
          An autonomous telescope leaves in Chile desert Atacama and works
          online. So he accepts specific token for his job. You cn get it here
          with your credit card.
        </p>
        <p class="text-mid">Your balance: {{ balance }} STRGZN</p>
        <hr />
        <p class="text-mid">1 picture with NFT minting = 1 $STRGZN</p>
        <hr />
        <p class="text-mid">1 $STRGZN = 20 USD</p>
        <hr />

        <div class="grid-2">
          <div>
            <form @onChange="onChange" @submit.prevent="handleSubmit">
              <p>
                <button class="container-full">
                  Pay <pricePerLesson /> USD
                  <img class="stripe" alt="" src="stripe.svg" />
                </button>
              </p>
            </form>
          </div>
        </div>
      </Card>
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

export default {
  components: {
    pricePerLesson: () => import("../components/includes/PricePerLesson.vue"),
    astronomicalObjectCard: () => import('../components/includes/AstronomicalObjectCard.vue'),
    Spot: () => import("../components/includes/Spot.vue"),
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
      if (this.accounts) {
        this.accountDefault = this.accounts[0].address;
      }

      if (this.accounts.length === 0) {
        this.error = "Not found account";
      }
      this.isReady = true;
      this.status = true;

      // Poll telescope status
      this.serviceStatus = await serviceStatus()
      setInterval(async () => {
        this.serviceStatus = await serviceStatus()
      }, 10000)

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
          email: email,
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
  },
};
</script>

<style scoped>
@media screen and (min-width: 800px) {
  .rent {
    align-items: start;
  }

  .rent-side {
    position: -webkit-sticky;
    position: sticky;
    top: calc(var(--space) * 8);
  }
}

.spot-container {
  overflow: hidden;
  max-width: calc(100vw - var(--space) * 2);
}

.spot {
  margin-bottom: calc(var(--space) * 2);
}

@media screen and (min-width: 500px) and (max-width: 800px) {
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
  0 {
    transform: translateY(-1rem);
  }
  50% {
    transform: translateY(1rem) scaleY(0.8);
  }
  100% {
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
