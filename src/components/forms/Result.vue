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
        <td><b>IPFS hash:</b></td>
        <td>
          <input
            v-model="fields.ipfs.value"
            type="text"
            class="container-full"
            :class="{ error: fields.ipfs.error }"
          />
        </td>
      </tr>
    </table>
  </form>
</template>

<script>
import form, { validators } from "@/mixins/form";

export default {
  props: ["accounts"],
  mixins: [form],
  data() {
    return {
      fields: {
        account: {
          value: "",
          type: "text",
          rules: ["require", validators.length(48)],
          error: false
        },
        ipfs: {
          value: "",
          type: "text",
          rules: ["require"],
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
