<template>
  <button
    :class="[
      { 'container-full': fullWidth },
      size ? `btn-${size}` : null,
      `btn-${color}`
    ]"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    fullWidth: {
      type: Boolean,
      default: false
    },
    /**
     * Variants: 'big' | 'sm'
     */
    size: {
      type: String,
      validator: (prop) => ["big", "sm"].includes(prop),
      require: false
    },
    /**
     * Variants: 'green' | 'blue'
     */
    color: {
      type: String,
      validator: (prop) => ["green", "blue"].includes(prop),
      default: "blue"
    }
  }
};
</script>
