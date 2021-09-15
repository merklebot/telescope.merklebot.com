<template>
  <Card style="text-align:center;">
    <h1>Schedule your time</h1>

    <template v-if="isReady">
      <AccountForm
        ref="form"
        @onChange="onChange"
        @onSubmit="handleSubmit"
        :accounts="accounts"
      />
      <div>
        Your balance: <b>{{ balanceView }}</b>
      </div>
      <button
        @click="$refs.form.submit()"
        :disabled="balance <= 0"
        v-if="!status"
      >
        Send
      </button>
      <div v-if="error !== null" class="red">{{ error }}</div>

      <div
        v-show="status"
        class="meetings-iframe-container"
        data-src="https://meetings.hubspot.com/strelka?embed=true"
      ></div>
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
import { getProvider, getInstance, getAccounts } from "../services/substrate";
import AccountForm from "../components/forms/Account.vue";
import { loadScript } from "../utils/tools";
import { setAccount } from "../services/api";
import config from "../config";

export default {
  components: {
    AccountForm
  },
  data() {
    return {
      isReady: false,
      error: null,
      api: null,
      unsubscribe: null,
      balance: 0,
      accounts: [],
      status: false
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
      return this.balance + " SPOT";
    }
  },
  watch: {
    status: async function(newValue, oldValue) {
      if (oldValue === false && newValue === true) {
        await loadScript(
          "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"
        );
      }
    }
  },
  methods: {
    async onChange({ name, newValue }) {
      if (name === "account") {
        if (this.unsubscribe) {
          this.unsubscribe();
        }

        // this.status = false;
        // const result = await getStatusKey(newValue);
        // if (result.status) {
        //   this.status = true;
        //   this.$refs.form.fields.email.value = result.email;
        //   this.$refs.form.fields.sshkey.value = result.sshkey;
        // }

        this.unsubscribe = await this.api.query.assets.account(
          config.ID_ASSET,
          newValue,
          ({ balance: currentFree }) => {
            this.balance = currentFree.toNumber();
          }
        );
      }
    },
    async handleSubmit({ error, fields }) {
      this.error = null;
      if (!error) {
        const result = await setAccount({
          fullname: fields.name.value,
          polkadot_pubkey: fields.account.value,
          email: fields.email.value,
          ssh_pubkey: fields.sshkey.value,
          check_only: false
        });
        this.status = result.result;
        if (!result.result) {
          this.error = "Error: check the correctness of input form";
        }
      }
    }
  }
};
</script>
