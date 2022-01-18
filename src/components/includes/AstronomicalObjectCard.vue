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

      <!-- {{astronomicalObjSelected.friendly_name}}<br/>
      {{astronomicalObj[0]}}<br/>
      {{astronomicalObjSelected}}<br/>
      {{astronomicalObj[0].catalog_name === astronomicalObjSelected.catalog_name}} -->

      <div class="objects layout-mid">
        <div class="obj" v-for="(astr, key) in astronomicalObj" :key="key" :class="{'active': astr.catalog_name === astronomicalObjSelected.catalog_name}">
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

              <div class="obj-select" v-if="astr.catalog_name !== astronomicalObjSelected.catalog_name">
                <a href="javascript:;" @click.prevent.stop="setObjFromDetails(astr)">Select this object</a>
              </div>
            </div>
          </details>
        </div>

      </div>

    </section>

      
    <section class="layout-narrow">
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
            <Button @click.native="onSubmit" :disabled="!submitStatus" class="container-full">Submit</Button>
          </p>

          <p class="error-title text-small" v-if="submitMessage" v-html="submitMessage" />

        </form>
    </section>
  
  </section>
    
</template>

<script>
// import { telescopeIsFree, astronomicalObject, createNFT, serviceStatus, pricePerNFT } from "../../services/api";
import { createNFT, pricePerNFT } from "../../services/api";
import { sendAsset } from "../../services/substrate";
import config from "../../config";

export default {
  data() {
    return {
      nftPrice: null,
      astronomicalObjSelected: [],
      submitStatus: true,
      submitMessage: null
    };
  },

  props: {
    isReady: Boolean,
    accounts: Array,
    balance: Number,
  },

  components: {
    Button: () => import('../includes/Button.vue'),
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
      if (this.$store.state.service.status === 'off') {
        this.submitMessage =  'Please wait for the telescope to turn on'
      }

      if (!this.$store.state.telescope) {
        this.submitMessage =  'Our telescope is busy. Please try again in 2-3 minutes.'
      }

      if(this.accounts.length < 0 || !this.isReady) {
        this.submitMessage =  'Please <a href="#step-1">connect your account</a>'
      }

      if(this.balance < 1) {
        this.submitMessage =  'Please <a href="#step-2">buy $STRGZN tokens</a>'
      }

      /* First check - Quit if this happens: */
      if (
        this.$store.state.service.status === 'off' ||
        !this.$store.state.telescope ||
        this.accounts.length < 0 || !this.isReady || 
        this.balance < 1) {

        return
      }

      /* Send tokens */
      const success = await sendAsset(this.$store.state.accountActive, config.ACCESS_TOKEN_RECV_ACCOUNT, config.ID_ASSET, 1);
      if (!success) {
        this.submitMessage =  'Tokens not sent. Please, contact us or try later'
        return
      }

      createNFT(this.astronomicalObjSelected.catalog_name, this.$store.state.accountActive);
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
    }
  }
}
</script>


<style scoped>
  .wrapper {
    background-image: linear-gradient(var(--color-blue-darkest), #001E49, #00323C);
  }

  select {
    text-align: center;
  }

  .objects {
    position: relative;
    width: 100%;
    height: 300px;
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
</style>
