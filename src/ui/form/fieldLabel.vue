<template>
  <label>
    <slot />:
    <span v-if="isError" class="input-msg">{{ msgError }}</span>
  </label>
</template>

<script>
export default {
  props: {
    msgError: {
      type: String,
      default: "Check if data correct, please."
    },
    isError: {
      type: Boolean,
      default: false
    }
  }
};
</script>
