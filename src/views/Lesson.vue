<template>
  <Card class="post">
    <VueMarkdown v-if="src" :source="src" />
    <h1 v-else>Not found lesson</h1>
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
  created() {
    this.load();
  },
  watch: {
    lesson: function() {
      this.load();
    }
  },
  methods: {
    async load() {
      try {
        this.src = (
          await import(
            /* webpackChunkName: "lesson" */ `../md/docs/${this.lesson}.md`
          )
        ).default;
        const rows = this.src.split("\n");
        const title = rows.find(row => {
          return row.substring(0, 2) === "# ";
        });
        if (title) {
          document.title = `Lesson spot: ${title.substring(2)}`;
        } else {
          document.title = "Lesson spot";
        }
      } catch (_) {
        console.log("Not find lesson");
      }
    }
  }
};
</script>

<style>
h1 {
  font-weight: 500;
}
.post h2 {
  padding-top: calc(3.5rem / 2);
  margin-top: 2.5rem;
  border-top: 1px solid #dbdbdb;
}
.post h2:first-of-type {
  padding-top: 0;
  margin-top: 0;
  border-top: 0;
}
.post pre {
  padding: 1rem;
  overflow: auto;
  margin-bottom: 1.25rem;
  background-color: #162128;
  color: #fff;
}
.post pre,
.post code {
  font-family: Space Mono, SFMono-Regular, Menlo, Monaco, Consolas,
    Liberation Mono, Courier New, monospace;
  font-feature-settings: "liga" 0;
  font-size: 0.85rem;
  line-height: 1.5;
  border-radius: 3px;
  direction: ltr;
  text-align: left;
  word-spacing: normal;
  word-break: normal;
  -moz-tab-size: 2;
  -o-tab-size: 2;
  tab-size: 2;
  -webkit-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
  word-break: break-all;
}
:not(pre) > code {
  padding: 0 0.25rem;
  color: rgb(179, 37, 133);
  background: rgba(179, 37, 133, 0.06);
}
</style>
