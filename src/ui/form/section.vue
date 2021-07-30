<template>
  <section>
    <div class="form-section-title">{{ title }}</div>
    <slot />
  </section>
</template>

<script>
export default {
  props: {
    title: String
  }
};
</script>
