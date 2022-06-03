<template>
  <div>
    <h4 class="text-left">Purchase $STRGZN Tokens:</h4>

    <section class="section-blue-darkest section-colored purchase-quantity">

        <div class="inputNumbers m-b-space">
          <div class="less" @click="setQuantity(-pricePerNftInStrgzn)">-</div>
          <input
            id="strgzn_quantity"
            type="number"
            v-model.number="quantity"
            value="quantity"
            required
          />
          <div class="more" @click="setQuantity(pricePerNftInStrgzn)">+</div>
        </div>

        <div>$STRGZN</div>
    </section>

    <ul class="switch switch-section">
      <li>
        <input 
          type="radio" 
          name="payment_method" 
          value="Card" 
          id="Card" 
          :checked="paymentMethod == 'Card' ? true : false"
          v-model="paymentMethod"/>
        <label for="Card">Credit Card</label>
      </li>
      <li>
        <input 
          type="radio" 
          name="payment_method" 
          value="KSM" 
          id="KSM" 
          :checked="paymentMethod == 'KSM' ? true : false"
          v-model="paymentMethod"
        />
        <label for="KSM">$KSM</label>
      </li>
    </ul>

   
      <form
        v-if="paymentMethod === 'Card'"
        @submit.prevent="handleSubmit"
        :class="{ disabled: extensionStatus !== 'extension ready' }"
      >

        <section class="section-blue-darkest section-colored bil">
          <div>Total: {{ total }} USD</div>
        </section>

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

        <section class="section-blue-darkest section-colored bil">
          <div>Your balance: {{ formatBalance(ksmBalance, decimalsRoundKsm) }} Statemine KSM</div>
          <div v-if="pricePerStrgznInPicoKsm">Total: {{ total }} Statemine KSM</div>
          <div v-else>Total: loading price...</div>
        </section>
        
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
      decimalsRoundUsd: 2,
      decimalsRoundKsm: 6,
    };
  },
  methods: {
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

    formatBalance(balance, decimals) {
        
        var qty = Number(balance)

        if(Number.isInteger(qty)) {
            return qty
        } else {
            return parseFloat(qty.toFixed(decimals))
        }
      }
  },
  computed: {
    ksmBalance() {
      return this.picoKsmBalance * Math.pow(10, -12)
    },

    total() {
      if (this.paymentMethod === "Card") {
        return this.formatBalance(this.quantity * this.pricePerStrgznInCents / 100, this.decimalsRoundUsd);
      } else if (this.paymentMethod === "KSM") {
        return this.formatBalance(this.quantity * this.pricePerStrgznInPicoKsm * Math.pow(10, -12), this.decimalsRoundKsm)
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

<style scoped>
  .purchase-quantity {
    display: grid;
    grid-template-columns: auto 100px;
    gap: var(--space);
    align-items: center;
  }

  .purchase-quantity .inputNumbers {
    margin-bottom: 0;
  }

  .bil > div {
    font-size: 85%;
    font-weight: bold;
    text-align: left;
  }

  .bil > div:not(:last-child) {
    margin-bottom: var(--space);
    padding-bottom: var(--space);
    border-bottom: 1px dashed var(--color-cyan);
  }
</style>
