<template>
  <section id="step-3" class="wrapper">
    <div class="layout-narrow">
      <h3>3. Enjoy the stars</h3>
      <p class="hyphens">Choose an astronomical object below and hit the submit button. The telescope will start moving and will mint your NFT in a few minutes.</p>
    </div>

    <section>

      <div class="layout-narrow">
        <h4>Choose one from {{ this.astronomicalObj.length }} astronomical objects</h4>
      </div>

      <div class="objects layout-mid">
        <div class="obj" v-for="(astr, key) in astronomicalObj" :key="key" :class="{'active': astr.friendly_name === astronomicalObjSelected.friendly_name}">
          <details tabindex="0">
            <summary>
              <div :class="makeClassName(astr.kind)"></div>
            </summary>
            <div class="obj-expand">
              <ul>
                <li><b>{{astr.friendly_name}}</b></li>
                <li>{{astr.kind}}</li>
                <li>{{astr.catalog_name}}</li>
              </ul>

              <div class="obj-select" v-if="astr.friendly_name !== astronomicalObjSelected.friendly_name">
                <a href="javascript:;" @click.prevent.stop="setObjFromDetails(astr)">Select this object</a>
              </div>
            </div>
          </details>
        </div>
      </div>
    </section>

    <section class="order layout-narrow" v-if="$store.state.app.account && astronomicalObjSelected && nftStatus">
      <h2>Your order</h2>
      <ul class="dashed tablelike">
        <li>
          <span>Account:</span>
          <span v-html="addressShort($store.state.app.account)" />
        </li>
        <li>
          <span>Object:</span>
          <span>{{ astronomicalObjSelected.friendly_name }} - {{ astronomicalObjSelected.kind }}</span>
        </li>
        <li>
          <span>Status:</span>

          <div v-if="nftStatus === 'waiting'">
            <p>
              <span class="loader"></span>
              <span>{{nftStatus}}</span>
            </p>
            <p><a 
              :href="'https://singular.rmrk.app/space/' + $store.state.app.account + '?tab=owned&owner=yes'" 
              target="_blank" rel="noopener noreferrer">
              Check your NFT(s)
            </a></p>
          </div>

          <div v-if="nftStatus === 'done'">
            <p class="title-checked">{{nftStatus}}</p>
          </div>
        </li>

        <li v-if="nftStatus === 'done'">
          <span>Your next steps:</span>

          <div>
            <p class="order-servicelinks">
              <a 
                :href="'https://singular.rmrk.app/space/' + $store.state.app.account + '?tab=owned&owner=yes'" 
                target="_blank" rel="noopener noreferrer"
                title="Check your NFT(s)">
                <i-singular class="logo" />
              </a>
              <a 
                :href="'https://twitter.com/intent/tweet?text=✨%20Just%20got%20my%20%23NFT%20with%20' + astronomicalObjSelected.kind + '%20' + astronomicalObjSelected.friendly_name + '%20from%20online%20telescope%20in%20Atacama%20desert&url=https%3A%2F%2Ftelescope.merklebot.com'" 
                target="_blank" rel="noopener noreferrer"
                title="Share on Twitter">
                <i-twitter class="logo" />
              </a>
              <a 
              :href="$discord" 
                target="_blank" rel="noopener noreferrer"
                title="Chat with us in Discord">
                <i-discord class="logo" />
              </a>
            </p>
          </div>
        </li>
      </ul>
    </section>
      
    <section class="order-form layout-narrow">
        <form>
          <p>
            <select class="container-full" v-model="astronomicalObjSelected">
                <option
                    v-for="(astr, key) in astronomicalObj"
                    :key="key"
                    :value="astr"
                  >
                  {{ astr.friendly_name }}
                </option>
                <option v-if="astronomicalObj.length === 0">Loading...</option>
            </select>
          </p>
      
          <p>
            <Button @click.native.prevent="onSubmit" :disabled="!submitStatus" class="container-full">Submit</Button>
          </p>

          <p class="error-title text-small" v-if="submitMessage" v-html="submitMessage" />

        </form>
    </section>

    <Stars/>
  
  </section>
    
</template>

<script>
import { createNftOrder, pricePerNFT } from "../../services/api";
import { sendAsset } from "../../services/substrate";
import config from "../../config";

export default {
  data() {
    return {
      nftPrice: null,
      astronomicalObjSelected: [],
      submitStatus: true,
      submitMessage: null,
      nftStatus: null
    };
  },

  components: {
    Button: () => import('../includes/Button.vue'),
    Stars: () => import('../includes/Stars.vue'),
    iSingular: () => import('../icons/iSingular.vue'),
    iTwitter: () => import('../icons/iTwitter.vue'),
    iDiscord: () => import('../icons/iDiscord.vue')
  },

  computed: {
    astronomicalObj(){
      return this.$store.state.astronomicalObjects ? this.$store.state.astronomicalObjects : []
    }
  },

  async created(){
    this.nftPrice = await pricePerNFT();
  },

  watch: {
    astronomicalObj: function(){
      if( this.astronomicalObj.length > 0 ) {
        if( this.astronomicalObjSelected.length === 0 || this.getSelectedIndex() < 0) {
          this.astronomicalObjSelected = this.astronomicalObj[0]
        }
      }
    },
    submitStatus: function() {
      /* Set button active after some time out (even if there are errors) */
      if( !this.submitStatus ) {
        setTimeout(() => {
          this.submitStatus = true
          this.submitMessage = null
        }, 10000);
      }
    }
  },

  methods:{
    getSelectedIndex(){
      /* For checking if selected object is still available for telescope */
      return this.astronomicalObj.findIndex(({ catalog_name }) => catalog_name === this.astronomicalObjSelected.catalog_name)
    },
    async onSubmit() {
      // console.log('onSubmit test ' + this.$store.state.accountActive, this.astronomicalObjSelected, config.ACCESS_TOKEN_RECV_ACCOUNT, config.ID_ASSET)

      /* Onclick first actions */
      this.submitMessage = null
      this.submitStatus = false
      
      /* First check - Update message */

      if (!this.$store.state.telescope) {
        this.submitMessage =  'Our telescope is busy. Please try again in 2-3 minutes.'
      }

      if (this.$store.state.service.status === 'off') {
        this.submitMessage =  'Please wait for the telescope to turn on'
      }

      if(this.$store.state.app.balance < 1) {
        this.submitMessage =  'Please <a href="#step-2">buy $STRGZN tokens</a>'
      }

      if(!this.$store.state.app.account || this.$store.state.app.status !== 'extension ready') {
        this.submitMessage =  'Please <a href="#step-1">connect your account</a>'
      }

      /* First check - Quit if this happens: */
      if (
        this.$store.state.service.status === 'off' ||
        !this.$store.state.telescope ||
        !this.$store.state.app.account || this.$store.state.app.status !== 'extension ready' || 
        this.$store.state.app.balance < 25) {

        return
      }

      this.nftStatus = 'waiting'

      /* Send tokens */
      const success = await sendAsset(this.$store.state.app.account, config.ACCESS_TOKEN_RECV_ACCOUNT, config.ID_ASSET, 25);
      if (!success) {
        this.submitMessage =  'Tokens not sent. Please, contact us or try later'
        return
      }

      const response = await createNftOrder(this.$store.state.app.account, this.astronomicalObjSelected.catalog_name)
      console.log('Create NFT:', response)
      if(response.status == 200) {
          this.submitStatus = true
          this.nftStatus = 'done'
      }
      // const { open } = window.tf.createPopup(config.TYPEFORM_ID);
      // open();
    },

    makeClassName(str) {
      return str.split(' ').join('')
    },

    setObjFromDetails(obj) {
      this.astronomicalObjSelected = obj
      event.target.closest('details').open = false
    },

    jump(anchor) {
      /* Jump to anchor */
      window.scrollTo({
          top: document.querySelector(anchor).offsetTop,
          behavior: "smooth"
      })
    },

    addressShort(address) {
      return address.slice(0, 6) + "..." + address.slice(-4);
    },
  }
}
</script>


<style scoped>
  .wrapper {
    /* background-image: linear-gradient(var(--color-blue-darkest), #001E49, #00323C); */
    background-image: 
    radial-gradient(
      ellipse
      farthest-corner at 45px 45px,
      var(--color-blue) 0%,
      var(--color-blue-darkest) 30%,
      #000 55%,
      var(--color-blue) 90%
    );
    position: relative;
    border-top: var(--space) solid var(--color-blue)
  }

  .order-form, .order {
    position: relative;
    z-index: 1;
  }

  select {
    text-align: center;
  }

  .objects {
    position: relative;
    width: 100%;
    height: 300px;
    z-index: 2;
    /* margin-bottom: calc(var(--padding) * 2); */
  }

  .obj {
    position: absolute;
  }

  .obj summary::-webkit-details-marker, .obj summary::marker { display: none; }
  .obj summary, .obj summary { list-style: none; }

  .obj summary {
    width: 3rem;
    height: 3rem;
    cursor: pointer;

    padding: 10px;
    border-radius: 100%;
  }

  .obj summary div {
    width: 100%;
    height: 100%;
    background-color: var(--color-cyan);

    -webkit-mask: url('/i/obj-Star.svg') no-repeat center;
    mask: url('/i/obj-Star.svg') no-repeat center;
  }

  .obj details[open] summary div {
    background-color: var(--color-white);
  }

  .obj.active summary {
    border: 1px solid var(--color-yellow);
  }

  .obj.active summary div {
    background-color: var(--color-yellow);
  }
  
  .obj summary .Nebula {
    -webkit-mask: url('/i/obj-Nebula.svg') no-repeat center;
    mask: url('/i/obj-Nebula.svg') no-repeat center;
  }

  .obj summary .SpiralGalaxy {
    -webkit-mask: url('/i/obj-SpiralGalaxy.svg') no-repeat center;
    mask: url('/i/obj-SpiralGalaxy.svg') no-repeat center;
  }

  .obj summary .GlobularCluster {
    -webkit-mask: url('/i/obj-GlobularCluster.svg') no-repeat center;
    mask: url('/i/obj-GlobularCluster.svg') no-repeat center;
  }

  .obj summary .Galaxy {
    -webkit-mask: url('/i/obj-Galaxy.svg') no-repeat center;
    mask: url('/i/obj-Galaxy.svg') no-repeat center;
  }

  .obj:nth-child(1) { top: 60%; left: 40%; }
  .obj:nth-child(2) { top: 10%; left: 60%; }
  .obj:nth-child(3) { top: 30%; left: 25%; }
  .obj:nth-child(4) { top: 92%; left: 33%; }
  .obj:nth-child(5) { top: 70%; left: 53%; }
  .obj:nth-child(6) { top: 21%; left: 46%; }
  .obj:nth-child(7) { top: 90%; left: 66%; }
  .obj:nth-child(8) { top: 14%; left: 80%; }
  .obj:nth-child(9) { top: 8%; left: 19%; }
  .obj:nth-child(10) { top: 59%; left: 72%; }

  .obj-expand {
    background-color: var(--color-white);
    border: 1px solid var(--color-blue-darkest);
    padding: var(--space);
    border-radius: calc(var(--space) * 0.5);
    color: var(--color-blue-darkest);

    position: relative;
    z-index: 1;
    margin-top: var(--padding);
  }

  .obj-expand:before {
    content:"";
    position: absolute;
    top: calc(var(--padding) * (-1));
    left: 1.5rem;
    width: 1px;
    height: var(--padding);
    background-color: var(--color-white);
  }

  .obj-expand ul {
    list-style: none;
    font-size: 80%;
  }

  .obj-expand ul li {
    padding: calc(var(--space) * 0.5) 0;
  }

  .obj-expand ul li:not(:last-child) {
    border-bottom: 1px dashed var(--color-blue-darkest);
    padding-bottom: 0;
  }

  .obj-select a {
    font-size: 80%;
    color: var(--color-lilac);
    font-weight: bold;
  }

  @media screen and (min-width: 500px) {
    .obj summary { width: 4rem; height: 4rem; }
    .obj-expand:before { left: 2rem; }
  }

  @media screen and (min-width: 1200px) {
    .obj summary { width: 5rem; height: 5rem; }
    .obj-expand:before { left: 2.5rem; }
  }


  /* Order block */
  .order {
    background-color: rgba(var(--color-lilac-rgb), 0.5);
    border: 2px solid var(--color-lilac);
    border-radius: 2rem;
    color: var(--color-white);
    padding: calc(var(--space) * 2);
    margin-top: calc(var(--space) * 3);
    font-weight: bold;
  }

  .order h2 {
    text-transform: none;
    font-size: 3rem;
  }

  .order a {
    color: var(--color-yellow)
  }

  .order a:hover {
    color: var(--color-orange)
  }

  .order .loader {
    border-color: var(--color-white);
  }

  .order-servicelinks > * {
    display: inline-block;
    vertical-align: middle;
    margin-right: calc(var(--space) * 1.5);
  }

  .order-servicelinks .logo {
    max-height: 30px;
    display: block;
    width: 100%
  }
</style>
