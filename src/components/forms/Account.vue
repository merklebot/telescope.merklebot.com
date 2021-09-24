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
        <td><b>Full name:</b></td>
        <td>
          <input
            v-model="fields.name.value"
            type="text"
            class="container-full"
            :class="{ error: fields.name.error }"
          />
        </td>
      </tr>
      <tr>
        <td><b>Email:</b></td>
        <td>
          <input
            v-model="fields.email.value"
            type="text"
            class="container-full"
            :class="{ error: fields.email.error }"
          />
        </td>
      </tr>
      <tr>
        <td><b>SSH public key:</b></td>
        <td>
          <textarea
            v-model="fields.sshkey.value"
            class="container-full"
            :class="{ error: fields.sshkey.error }"
          ></textarea>
        </td>
      </tr>
    </table>
  </form>
</template>

<script>
import form from "@/mixins/form";
import { checkAddress } from "@polkadot/util-crypto";

export default {
  props: ["accounts"],
  mixins: [form],
  data() {
    return {
      fields: {
        account: {
          value: "",
          type: "text",
          rules: [
            "require",
            v => {
              return checkAddress(v, 2)[0];
            }
          ],
          error: false
        },
        name: {
          value: "",
          type: "text",
          rules: ["require"],
          error: false
        },
        email: {
          value: "",
          type: "text",
          rules: ["require", "email"],
          error: false
        },
        sshkey: {
          value: "",
          type: "textarea",
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
