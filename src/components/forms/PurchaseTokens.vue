<template>
  <div>
    <h4>Purchase tokens</h4>
    <toggle-switch
      :options="options"
      :disabled="false"
      @change="updatePaymentMethod($event.value)"
    />

    <p
      v-if="extensionStatus !== 'extension ready'"
      class="error-title text-small"
    >
      Please
      <a href="#step-1" @click.prevent="jumpToExtensionSetupFunction('#step-1')"
        >connect your Polkadot account</a
      >
    </p>

    <br />

    <form
      v-if="paymentMethod === 'Card'"
      @submit.prevent="handleSubmit"
      :class="{ disabled: extensionStatus !== 'extension ready' }"
    >
      <div class="inputNumbers m-b-space">
        <div class="less" @click="setQuantity(-pricePerNftInStrgzn)">-</div>
        <input
          type="number"
          v-model.number="quantity"
          value="quantity"
          required
        />
        <div class="more" @click="setQuantity(pricePerNftInStrgzn)">+</div>
      </div>

      <h5>Total: {{ total }} USD</h5>

      <Button class="container-full" size="medium" :disabled="!checkoutStatus">
        <span class="text">Pay with</span>
        <img class="label" alt="Stripe" src="i/stripe.svg" />
      </Button>
    </form>

    <form
      v-if="paymentMethod === 'KSM'"
      @submit.prevent="handleSubmit"
      :class="{ disabled: extensionStatus !== 'extension ready' }"
    >
      <div class="inputNumbers m-b-space">
        <div class="less" @click="setQuantity(-pricePerNftInStrgzn)">-</div>
        <input
          type="number"
          v-model.number="quantity"
          value="quantity"
          required
        />
        <div class="more" @click="setQuantity(pricePerNftInStrgzn)">+</div>
      </div>

      <h5>Your Statemine KSM balance: {{ this.picoKsmBalance * Math.pow(10, -12) }} </h5>
      <h5 v-if="pricePerStrgznInPicoKsm">Total: {{ total }} Statemine KSM</h5>
      <h5 v-else>Total: loading price...</h5>
      <Button class="container-full" size="medium" :disabled="!checkoutStatus || !pricePerStrgznInPicoKsm || !isEnoughBalance">
        <span class="text">Sign</span>
      </Button>
    </form>

    <TransactionInfoModal
      v-if="showTransactionInfo"
      :isCreated="!!checkoutCryptoTxInfo && !!checkoutCryptoTxInfo.created"
      :isIncluded="!!checkoutCryptoTxInfo && !!checkoutCryptoTxInfo.included"
      :isFinalized="!!checkoutCryptoTxInfo && !!checkoutCryptoTxInfo.finalized"
      :asCreated="checkoutCryptoTxInfo ? checkoutCryptoTxInfo.created : null"
      :asIncluded="checkoutCryptoTxInfo ? checkoutCryptoTxInfo.included : null"
      :asFinalized="checkoutCryptoTxInfo ? checkoutCryptoTxInfo.finalized : null"
      @closed="onTransactionInfoClosed()"
    />
  </div>
</template>

<script>
export default {
  name: "PurchaseToken",
  components: {
    Button: () => import("../includes/Button.vue"),
    TransactionInfoModal: () => import ("../includes/TransactionInfoModal.vue")
  },
  props: {
    extensionStatus: {
      type: String,
      default: "loading",
    },
    checkoutStatus: Boolean,
    checkoutCryptoTxInfo: Object,
    jumpToExtensionSetupFunction: Function,
    submitHandler: Function,
    pricePerNftInStrgzn: Number,
    tokensPurchaseMinMax: Object,
    pricePerStrgznInCents: Number,
    pricePerStrgznInPicoKsm: Number,
    defaultQuantity: Number,
    picoKsmBalance: Number,
  },
  data() {
    return {
      quantity: this.defaultQuantity,
      paymentMethod: "Card",
      showTransactionInfo: false,
      options: {
        layout: {
          color: "black",
          backgroundColor: "lightgray",
          selectedColor: "white",
          selectedBackgroundColor: "blue",
          borderColor: "black",
          //   fontFamily: "Arial",
          fontWeight: "normal",
          fontWeightSelected: "bold",
          squareCorners: false,
          noBorder: false,
        },
        size: {
          //   fontSize: 14,
          //   height: 34,
          //   padding: 7,
          width: 18,
        },
        items: {
          delay: 0.1,
          preSelected: "Card",
          disabled: false,
          labels: [
            { name: "Card", color: "white", backgroundColor: "blue" },
            { name: "KSM", color: "white", backgroundColor: "blue" },
            // { name: "Crypto", color: "white", backgroundColor: "blue" },
          ],
        },
      },
    };
  },
  methods: {
    updatePaymentMethod(value) {
      this.paymentMethod = value;
    },
    async handleSubmit() {
      this.submitHandler(this.paymentMethod, this.quantity, this.total);
    },
    setQuantity(change) {
      if (
        this.quantity + change >= this.tokensPurchaseMinMax.max ||
        this.quantity + change <= this.tokensPurchaseMinMax.min
      )
        return;
      this.quantity += change;
    },
    onTransactionSigned() {
      this.showTransactionInfo = true
    },
    onTransactionInfoClosed() {
      this.showTransactionInfo = false
      this.$emit('resetCheckoutCryptoTxInfo')
    },
  },
  computed: {
    total() {
      if (this.paymentMethod === "Card") {
        return (this.quantity * this.pricePerStrgznInCents / 100).toFixed(2);
      } else if (this.paymentMethod === "KSM") {
        return (this.quantity * (this.pricePerStrgznInPicoKsm * Math.pow(10, -12))).toFixed(6)
      } else {
        throw new Error("Unexpected payment method", this.paymentMethod)
      }
    },
    isEnoughBalance() {
      // #ToDo: replace 0.001 with tx fee
      return this.picoKsmBalance - 0.001 * Math.pow(10, 12) > this.pricePerStrgznInPicoKsm * this.quantity
    }
  },
};
</script>

<style>
</style>
