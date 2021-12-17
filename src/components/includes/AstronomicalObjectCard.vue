<template>
    <div>
        <Card
        :class="{
          disabled: !checkedAccount || accounts.length < 1 || !isReady
        }"
      >
        <h2>3. Enjoy the stars</h2>
        <p class="text-mid">
          Choose an astronimical object:
        </p>
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
        <div class="grid-2">
          <div>
            <form>
              <p><button class="container-full">SUBMIT</button></p>
            </form>
          </div>
        </div>
      </Card>
    </div>
</template>

<script>
import { astronomicalObject } from "../../services/api";
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
  async created(){
    this.astronomicalObj = await astronomicalObject();
    console.log('New Astro ** ', this.astronomicalObj)
  },
  methods:{
    astronomicalObjChange(e) {
      this.astronomicalObjSelected = e.target.value;
    },
  }
}
</script>