<template>
    <div>
        <Card>
        <div class="layout-narrow">
          <h3>3. Enjoy the stars</h3>
          <p>Choose an astronomical object below and hit the submit button. The telescope will start moving and will mint your NFT in a few minutes.</p>
          <form>
            <p>
              <select class="container-full" @change="astronomicalObjChange">
                <option
                  v-for="(astr, key) in astronomicalObj"
                  :key="key"
                  :value="astr.friendly_name"
                >
                  {{ astr.friendly_name }}
                </option>
                <option v-if="astronomicalObj.length === 0">Loading...</option>
              </select>
            </p>
          </form>

          <div v-if="astronomicalObjSelected === null">
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
          </div>

          <br />
          <Button @click.native="onSubmit" :class="{
            disabled: accounts.length < 1 || !isReady || balance < 1
          }">Submit</Button>
          
        </div>
      </Card>
    </div>
</template>

<script>
import { telescopeIsFree, astronomicalObject, createNFT, serviceStatus } from "../../services/api";
import { sendAsset } from "../../services/substrate";
import config from "../../config";

export default {
    data() {
    return {
      astronomicalObj: [],
      astronomicalObjSelected: null,
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
    console.log("Default object selected:", this.astronomicalObjSelected);
  },
  methods:{
    astronomicalObjChange(e) {
      const selected = e.target.value
      this.astronomicalObjSelected = this.astronomicalObj.find(element => element.friendly_name === selected);
    },
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
      // if (status.status !== "on") {
      //   alert("Out of service. Please try again later.");
      //   return;
      // }
      const success = await sendAsset(this.$store.state.accountActive, config.ACCESS_TOKEN_RECV_ACCOUNT, config.ID_ASSET, 1);
      if (!success) {
        console.log("Tokens not sent. Success:", success);
        return;
      }
      createNFT(this.astronomicalObjSelected.catalog_name, this.$store.state.accountActive);
      const { open } = window.tf.createPopup(config.TYPEFORM_ID);
      open();
    }
  }
}
</script>
