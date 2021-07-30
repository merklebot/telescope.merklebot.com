<template>
  <section>
    <div class="sidebar__title">{{ title }}</div>
    <nav class="sidebar__nav">
      <slot />
    </nav>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    }
  }
};
</script>
