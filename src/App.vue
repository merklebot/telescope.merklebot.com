<template>
  <Layout><router-view /></Layout>
</template>

<script>
import Layout from "./components/layout/main.vue";

export default {
  name: "App",
  components: {
    Layout
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
