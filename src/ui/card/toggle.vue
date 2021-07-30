<template>
  <Card>
    <div class="window-head">
      <span v-html="title" />
      <Toggle class="window-head-toggle" v-model="isShow" :id="id" />
    </div>
    <div class="window-content" v-show="isShow">
      <slot />
    </div>
  </Card>
</template>

<script>
import Card from "./index";
import Toggle from "../toggle";

export default {
  props: ["title", "id"],
  components: {
    Card,
    Toggle
  },
  data() {
    return {
      isShow: true
    };
  }
};
</script>
