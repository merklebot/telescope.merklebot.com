<template>
  <Layout><router-view /></Layout>
</template>

<script>
import Layout from "./components/layout/main.vue";

export default {
  name: "App",
  components: {
    Layout
  },

  head: {
    script: [
      { type: "text/javascript", src: "https://www.googletagmanager.com/gtag/js?id=5KBB3ZT", async: true},
      { type: "text/javascript", inner: "window.dataLayer = window.dataLayer || []; function gtag(){window.dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '5KBB3ZT');", async: true},
    ],
  }
};
</script>
