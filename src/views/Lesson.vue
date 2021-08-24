<template>
  <Card>
    <VueMarkdown v-if="src" :source="src" />
    <div>Not find lesson</div>
  </Card>
</template>

<script>
import VueMarkdown from "vue-markdown-render";

export default {
  props: ["lesson"],
  components: {
    VueMarkdown
  },
  data() {
    return {
      src: ""
    };
  },
  async created() {
    try {
      this.src = (
        await import(
          /* webpackChunkName: "lesson" */ `../docs/${this.lesson}.md`
        )
      ).default;
    } catch (_) {
      console.log("Not find lesson");
    }
  }
};
</script>
