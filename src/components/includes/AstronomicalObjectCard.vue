<template>
    <div>
        <Card>
        <div class="layout-narrow">
          <h3>3. Enjoy the stars</h3>
          <p>Choose an astronimical object:</p>
          
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
          <Button v-on:click="onSubmit" :class="{
          disabled: !checkedAccount || accounts.length < 1 || !isReady
        }">Submit</Button>

        </div>
      </Card>
    </div>
</template>

<script>
import { astronomicalObject, createNFT } from "../../services/api";
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
    accounts: Array
  },
  components: {
    Button: () => import('../includes/Button.vue'),
  },
  async created(){
    this.astronomicalObj = await astronomicalObject();
    console.log('New Astro ** ', this.astronomicalObj)
  },
  methods:{
    astronomicalObjChange(e) {
      this.astronomicalObjSelected = e.target.value;
    },
    async onSubmit() {
      // console.log(this.$store.state.accountActive, this.astronomicalObjSelected, config.ACCESS_TOKEN_RECV_ACCOUNT, config.ID_ASSET)
      await sendAsset(this.$store.state.accountActive, config.ACCESS_TOKEN_RECV_ACCOUNT, config.ID_ASSET, 1);
      await createNFT(this.astronomicalObjSelected, this.$store.state.accountActive);
    }
  }
}
</script>


<style scoped>
  .layout-narrow {
    text-align: center;
  }
</style>