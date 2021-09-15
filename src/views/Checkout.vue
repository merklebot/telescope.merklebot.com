<template>
  <Card style="text-align:center;">
    <h1>Rent Spot</h1>
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
      {{ error }}
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
      if (error.message === "no extension") {
        this.error = "Not found extension polkadot.js";
      } else {
        console.log(error);
        this.error = "Error";
      }
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
