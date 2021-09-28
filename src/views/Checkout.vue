<template>
  <Card style="text-align:center;">
    <h1>Rent Spot</h1>
    <div class="notice">
      <p>
        You can study the documentation materials freely and we charge you only
        for renting the time on Spot to practice your skills. Every lessons
        costs 42 USD. Please take your time studying the documentation before
        you pay for and schedule your lesson. We recommend to think about or
        even write down specific code that you plan to use during the lesson.
      </p>
      <p>
        We are looking to promote the adoption of Web3 technologies because we
        believe that they are natural and efficient for online identification
        and exchange of value. That is why to manage the lesson times and data
        from Spot, you need to create an account using the &nbsp;<a
          href="https://polkadot.js.org/extension/"
          target="_blank"
          >Polkadot.js extention</a
        >. The logs that the robot will generate during your lesson will be
        automatically recorded and assigned to you, creating a cryptographic
        proof that you passed the lesson successfully.
      </p>
    </div>
    <template v-if="isReady">
      <CheckoutForm
        ref="form"
        @onChange="onChange"
        @onSubmit="handleSubmit"
        :accounts="accounts"
      />
      <div>
        Your balance: <b>{{ balance }} SPOT</b>
      </div>
      <button @click="$refs.form.submit()">Checkout</button>
    </template>
    <template v-else-if="error === null">
      Load ...
    </template>
    <template v-else>
      <template v-if="error === 'NOT_FOUND_EXTENSION'">
        <div class="red">
          Error: Not found
          <a href="https://polkadot.js.org/extension/" target="_blank"
            >polkadot.extension</a
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
</template>

<script>
import { checkout } from "../services/api";
import stripe from "../services/stripe";
import { getProvider, getInstance, getAccounts } from "../services/substrate";
import CheckoutForm from "../components/forms/Checkout.vue";
import config from "../config";

export default {
  components: {
    CheckoutForm
  },
  data() {
    return {
      isReady: false,
      error: null,
      api: null,
      unsubscribe: null,
      balance: 0,
      accounts: []
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
      if (this.accounts.length === 0) {
        this.error = "Not found account";
      }
      this.isReady = true;
    } catch (error) {
      this.error = error.message;
    }
  },
  destroyed() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  },
  methods: {
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
    handleSubmit({ error, fields }) {
      if (!error) {
        this.checkout(fields.account.value, fields.email.value);
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
.notice {
  width: 50%;
  margin: 20px auto;
}
</style>
