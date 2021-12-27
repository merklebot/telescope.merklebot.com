<template>
    <div>
        <Card>
        <div class="layout-narrow">
          <h3>3. Enjoy the stars</h3>
          <p>Choose an astronomical object below, once you hit the submit button, your request will be queued on the Telescope and processed at night with a first-come first-served sequence.</p>
          <p>Please note that this is a real, physical process, and so it is also dependent on the weather conditions in Chile at the time of the NFT. In the case of inclement weather, we will again maintain the proper order of requests, and process them in sequence when the skies are once again available.</p>
          <p>If you like to stay informed of our soon-to-be upcoming additional projects, please feel free to join our mailing list and discord channel.</p>
          <p>Thank you, and enjoy the stars!</p>
          <form>
            <p>
              <select @change="astronomicalObjChange">
                <option
                  v-for="(astr, key) in astronomicalObj"
                  :key="key"
                  :value="astr.catalog_name"
                >
                  {{ astr.catalog_name }}
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
              <div v-if="astronomicalObjSelected === astr.catalog_name">
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
            disabled: !checkedAccount || accounts.length < 1 || !isReady || balance < 1
          }">Submit</Button>
          
        </div>
      </Card>
    </div>
</template>

<script>
import { telescopeIsFree, astronomicalObject, createNFT } from "../../services/api";
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
    checkedAccount : Boolean,
    isReady: Boolean,
    accounts: Array,
    balance: Number,
  },
  components: {
    Button: () => import('../includes/Button.vue'),
  },
  async created(){
    this.astronomicalObj = await astronomicalObject();
  },
  methods:{
    astronomicalObjChange(e) {
      this.astronomicalObjSelected = e.target.value;
    },
    async onSubmit() {
      // console.log(this.$store.state.accountActive, this.astronomicalObjSelected, config.ACCESS_TOKEN_RECV_ACCOUNT, config.ID_ASSET)
      const telescopeStaus = await telescopeIsFree();
      console.log("Telescope status:", telescopeStaus);
      if (!telescopeStaus.isFree) {
        alert("Our telescope is busy. Please try again in 2-3 minutes.");
        return;
      }
      const success = await sendAsset(this.$store.state.accountActive, config.ACCESS_TOKEN_RECV_ACCOUNT, config.ID_ASSET, 1);
      if (!success) {
        console.log("Tokens not sent. Success:", success);
        return;
      }
      createNFT(this.astronomicalObjSelected, this.$store.state.accountActive);
      const { open } = window.tf.createPopup(config.TYPEFORM_ID);
      open();
    }
  }
}
</script>


<style scoped>
  .layout-narrow {
    text-align: center;
  }
</style>
