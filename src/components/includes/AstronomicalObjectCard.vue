<template>
  <section class="wrapper">
    <div class="layout-narrow">
      <h3>3. Enjoy the stars</h3>
      <p class="hyphens">Choose an astronomical object below and hit the submit button. The telescope will start moving and will mint your NFT in a few minutes.</p>
    </div>
      

    <section>

      <div class="layout-narrow">
        <h4>Choose one from {{ this.astronomicalObj.length }} astronomical objects</h4>
      </div>

      <div class="objects layout-mid">
        <div class="obj" v-for="(astr, key) in astronomicalObj" :key="key" :class="{'active': astr === astronomicalObjSelected}">
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
            </div>
          </details>
        </div>

        <!-- <div class="obj">
          <details tabindex="0">
            <summary>
              <div></div>
            </summary>
            <div class="obj-expand">
              <ul>
                <li><b>-</b></li>
                <li>-</li>
                <li>-</li>
              </ul>
            </div>
          </details>
        </div>

        <div class="obj">
          <details tabindex="0">
            <summary>
              <div></div>
            </summary>
            <div class="obj-expand">
              <ul>
                <li><b>-</b></li>
                <li>-</li>
                <li>-</li>
              </ul>
            </div>
          </details>
        </div>

        <div class="obj">
          <details tabindex="0">
            <summary>
              <div></div>
            </summary>
            <div class="obj-expand">
              <ul>
                <li><b>-</b></li>
                <li>-</li>
                <li>-</li>
              </ul>
            </div>
          </details>
        </div>

        <div class="obj">
          <details tabindex="0">
            <summary>
              <div></div>
            </summary>
            <div class="obj-expand">
              <ul>
                <li><b>-</b></li>
                <li>-</li>
                <li>-</li>
              </ul>
            </div>
          </details>
        </div>

        <div class="obj">
          <details tabindex="0">
            <summary>
              <div></div>
            </summary>
            <div class="obj-expand">
              <ul>
                <li><b>-</b></li>
                <li>-</li>
                <li>-</li>
              </ul>
            </div>
          </details>
        </div>

        <div class="obj">
          <details tabindex="0">
            <summary>
              <div></div>
            </summary>
            <div class="obj-expand">
              <ul>
                <li><b>-</b></li>
                <li>-</li>
                <li>-</li>
              </ul>
            </div>
          </details>
        </div>

        <div class="obj">
          <details tabindex="0">
            <summary>
              <div></div>
            </summary>
            <div class="obj-expand">
              <ul>
                <li><b>-</b></li>
                <li>-</li>
                <li>-</li>
              </ul>
            </div>
          </details>
        </div> -->

      </div>

    </section>

      
    <section class="layout-narrow">

          <!-- <div v-if="astronomicalObjSelected === null">
            <div v-if="this.astronomicalObj[0]">
              <div
                v-if="
                  this.astronomicalObj[0].friendly_name ===
                    this.astronomicalObj[0].catalog_name
                "
              >
                <div>{{ this.astronomicalObj[0].friendly_name }}</div>
                <div>{{ this.astronomicalObj[0].kind }}</div>
              </div>
              <div v-else>
                <div>{{ this.astronomicalObj[0].friendly_name }}</div>
                <div>{{ this.astronomicalObj[0].catalog_name }}</div>
                <div>{{ this.astronomicalObj[0].kind }}</div>
              </div>
            </div>
          </div>
          <div v-else>
            <div v-for="(astr, key) in astronomicalObj" :key="key">
              <div v-if="astronomicalObjSelected === astr">
                <div v-if="astr.catalog_name === astr.friendly_name">
                  {{ astr.friendly_name }}
                </div>
                <div v-else>
                  {{ astr.friendly_name }}
                  <br />
                  {{ astr.catalog_name }}
                </div>
                {{ astr.kind }}
              </div>
            </div>
          </div> -->

          <form>
            <p>
              <select class="container-full" v-model="astronomicalObjSelected">
              <!-- <select class="container-full" @change="astronomicalObjChange"> -->
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
        
            <Button @click.native="onSubmit" :class="{ disabled: accounts.length < 1 || !isReady || balance < nftPrice }" class="container-full">Submit</Button>
          </form>
    </section>
  
  </section>
    
</template>

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
  .obj:nth-child(3) { top: 30%; left: 90%; }
  .obj:nth-child(4) { top: 50%; left: 5%; }
  .obj:nth-child(5) { top: 20%; left: 30%; }
  .obj:nth-child(6) { top: 46%; left: 20%; }
  .obj:nth-child(7) { top: 90%; left: 60%; }
  .obj:nth-child(8) { top: 14%; left: 80%; }
  .obj:nth-child(9) { top: 100%; left: 33%; }
  .obj:nth-child(10) { top: 59%; left: 50%; }

  .obj-expand {
    background-color: var(--color-white);
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
/* 
  @media screen and (max-width: 700px) {
    .obj summary { width: 2rem; height: 2rem; }
    .obj-expand:before { left: 1rem; }
  } */

  @media screen and (min-width: 500px) {
    .obj summary { width: 4rem; height: 4rem; }
    .obj-expand:before { left: 2rem; }
  }

  @media screen and (min-width: 1200px) {
    .obj summary { width: 5rem; height: 5rem; }
    .obj-expand:before { left: 2.5rem; }
  }
</style>

<script>
import { telescopeIsFree, astronomicalObject, createNFT, serviceStatus, pricePerNFT } from "../../services/api";
import { sendAsset } from "../../services/substrate";
import config from "../../config";

export default {
    data() {
    return {
      astronomicalObj: [],
      astronomicalObjSelected: null,
      nftPrice: null
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
  async created(){
    this.astronomicalObj = await astronomicalObject();
    this.astronomicalObjSelected = this.astronomicalObj[0];
    this.nftPrice = await pricePerNFT();
    console.log("Default object selected:", this.astronomicalObjSelected);
  },
  methods:{
    // astronomicalObjChange(e) {
    //   const selected = e.target.value
    //   this.astronomicalObjSelected = this.astronomicalObj.find(element => element.friendly_name === selected);
    // },
    async onSubmit() {
      // console.log(this.$store.state.accountActive, this.astronomicalObjSelected, config.ACCESS_TOKEN_RECV_ACCOUNT, config.ID_ASSET)
      const telescopeStaus = await telescopeIsFree();
      console.log("Telescope status:", telescopeStaus);
      if (!telescopeStaus.isFree) {
        alert("Our telescope is busy. Please try again in 2-3 minutes.");
        return;
      }
      const status = await serviceStatus();
      console.log("Service status:", status);
      if (status.status !== "on") {
        alert("Out of service. Please try again later.");
        return;
      }
      const success = await sendAsset(this.$store.state.accountActive, config.ACCESS_TOKEN_RECV_ACCOUNT, config.ID_ASSET, 1);
      if (!success) {
        console.log("Tokens not sent. Success:", success);
        return;
      }
      createNFT(this.astronomicalObjSelected.catalog_name, this.$store.state.accountActive);
      const { open } = window.tf.createPopup(config.TYPEFORM_ID);
      open();
    },

    makeClassName(str) {
      return str.split(' ').join('')
    }
  }
}
</script>
