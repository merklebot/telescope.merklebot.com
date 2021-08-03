<template>
  <Card style="text-align:center;">
    <h1>Save result to datalog</h1>

    <template v-if="isReady">
      <ResultForm
        ref="form"
        @onChange="onChange"
        @onSubmit="handleSubmit"
        :accounts="accounts"
      />
      <div>
        Your balance: <b>{{ balanceView }}</b>
      </div>
      <button @click="$refs.form.submit()" :disabled="balance <= 0 || process">
        Save
      </button>
      <div v-if="resultWrite !== null">
        <a
          :href="
            `https://parachain.robonomics.network/?rpc=wss%3A%2F%2FUranus.rpc.robonomics.network#/explorer/query/${resultWrite.block}`
          "
          target="__blank"
        >
          View in Explorer
        </a>
      </div>
      <div class="log" v-if="log.length > 0">
        <div v-for="(item, k) in log" :key="k">
          <b>{{ new Date(item[0]).toLocaleString() }}:</b>&nbsp;
          {{ item[1] }}
        </div>
      </div>
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
import {
  getProvider,
  getInstance,
  getAccounts,
  getAccount,
  signAndSend,
  Datalog
} from "../services/substrate";
import ResultForm from "../components/forms/Result.vue";
import { formatBalance, stringToHex } from "@polkadot/util";

export default {
  components: {
    ResultForm
  },
  data() {
    return {
      isReady: false,
      error: null,
      api: null,
      datalog: null,
      unsubscribe: null,
      balance: 0,
      accounts: [],
      resultWrite: null,
      process: false,
      log: []
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
      this.datalog = new Datalog(this.api);
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
  computed: {
    balanceView() {
      return formatBalance(this.balance);
    }
  },
  methods: {
    async onChange({ name, newValue }) {
      if (name === "account") {
        if (this.unsubscribe) {
          this.unsubscribe();
        }

        this.unsubscribe = await this.api.query.system.account(
          newValue,
          ({ data: { free: currentFree } }) => {
            this.balance = Number(currentFree);
          }
        );

        this.read(newValue);
      }
    },
    async handleSubmit({ error, fields }) {
      if (!error) {
        this.write(fields.account.value, fields.ipfs.value);
      }
    },
    async read(address) {
      const log = await this.datalog.read(address);
      this.log = [];
      for (const item of log) {
        this.log.push([item[0].toNumber(), item[1].toHuman()]);
      }
    },
    async write(address, data) {
      this.process = true;
      this.resultWrite = null;
      const account = await getAccount(this.api, address);
      const tx = this.api.tx.datalog.record(stringToHex(data.toString()));
      try {
        this.resultWrite = await signAndSend(account, tx);
        this.read(address);
      } catch (error) {
        console.log(error.message);
      }
      this.process = false;
    }
  }
};
</script>

<style scoped>
.log {
  text-align: left;
  width: 600px;
  margin: 40px auto;
  border: 1px solid #eee;
  padding: 10px;
}
</style>
