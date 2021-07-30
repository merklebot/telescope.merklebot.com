<template>
  <form v-on:submit.prevent="submit">
    <table style="width: 500px;margin: 30px auto;">
      <tr>
        <td><b>Account:</b></td>
        <td>
          <select
            v-model="fields.account.value"
            class="container-full"
            :class="{ error: fields.account.error }"
          >
            <option
              v-for="(account, key) in accounts"
              :key="key"
              :value="account.address"
            >
              {{ account.meta.name }}
            </option>
          </select>
        </td>
      </tr>
      <tr>
        <td><b>E-mail:</b></td>
        <td>
          <input
            type="text"
            v-model="fields.email.value"
            class="container-full"
            :class="{ error: fields.email.error }"
          />
        </td>
      </tr>
    </table>
  </form>
</template>

<script>
import form, { validators } from "@/mixins/form";
// import { checkAddress } from "@polkadot/util-crypto";

export default {
  props: ["accounts"],
  mixins: [form],
  data() {
    return {
      fields: {
        email: {
          value: "",
          type: "text",
          rules: ["require", "email"],
          error: false
        },
        account: {
          value: "",
          type: "text",
          rules: [
            "require",
            validators.length(48)
            // (v) => {
            //   return checkAddress(v, this.$polkadot.api.registry.chainSS58)[0];
            // }
          ],
          error: false
        }
      }
    };
  },
  created() {
    if (this.accounts.length > 0) {
      this.fields.account.value = this.accounts[0].address;
    }
  }
};
</script>
