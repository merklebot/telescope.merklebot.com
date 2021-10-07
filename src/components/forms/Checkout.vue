<template>
  <form v-on:submit.prevent="submit">



    <input
        type="email"
        v-model="fields.email.value"
        class="container-full"
        :class="{ error: fields.email.error }"
        required
        placeholder="Your email"
    />

    <!-- <table style="width: 500px;margin: 30px auto;">
      <tr>
        <td><b>Account:</b></td>
        <td>
          <AccountSelect :accounts="accounts"/>
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
    </table> -->
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
            v => {
              return checkAddress(v, 2)[0];
            }
          ],
          error: false
        }
      }
    };
  }
};
</script>
