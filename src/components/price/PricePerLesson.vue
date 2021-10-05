<template>
    <span>{{price_per_lesson}}</span>
</template>

<script>
import config from "../../config";

export default {
  data() {
    return {
      price_per_lesson: "not set",
    };
  },
  async created() {
    this.price_per_lesson = (config.PRICE_PER_LESSON_CENTS / 100).toFixed(2)
  }
};
</script>