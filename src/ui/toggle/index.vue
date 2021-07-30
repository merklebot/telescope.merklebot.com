<template>
  <a @click="up(!flag)">
    <template v-if="flag">–</template>
    <template v-else>+</template>
  </a>
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "toggle"
  },
  props: {
    value: {
      type: Boolean,
      default: true
    },
    id: String
  },
  data() {
    return {
      flag: this.value
    };
  },
  created() {
    if (this.id) {
      const state = localStorage.getItem(`toogle:${this.id}`);
      if (state === "true") {
        this.up(true);
      } else if (state === "false") {
        this.up(false);
      }
    }
  },
  methods: {
    up(flag) {
      this.flag = flag;
      this.$emit("toggle", this.flag);
      if (this.id) {
        localStorage.setItem(`toogle:${this.id}`, this.flag);
      }
    }
  }
};
</script>
