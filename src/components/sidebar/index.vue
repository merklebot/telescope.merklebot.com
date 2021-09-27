<template>
  <div class="sidebar popup" id="mobile-sidebarmenu">
    <Section title="Navigation">
      <router-link :to="{ name: 'home' }" active-class="active" exact>
        Home
      </router-link>
    </Section>
    <Section title="Practice">
      <router-link :to="{ name: 'checkout' }" active-class="active" exact>
        Rent Spot
      </router-link>
    </Section>
    <Section v-if="lessons.length" title="Theory">
      <router-link
        v-for="(lesson, k) in lessons"
        :key="k"
        :to="{ name: 'lesson', params: { lesson: lesson.fileName } }"
        active-class="active"
        exact
      >
        {{ lesson.title }}
      </router-link>
    </Section>
  </div>
</template>

<script>
import Section from "./section";
import menu from "@/md/menu";

export default {
  components: { Section },
  data() {
    return {
      lessons: []
    };
  },
  created() {
    this.lessons = menu;
  }
};
</script>
