<template>
  <fragment>
    <Header />

    <main role="main">
      <slot />
    </main>

  </fragment>
</template>

<script>
import Header from "../header";

export default {
  name: "Layout",
  components: {
    Header
  }
};
</script>