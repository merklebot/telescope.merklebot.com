<template>
  <div class="sidebar popup" id="mobile-sidebarmenu">
    <Section title="Navigation">
      <router-link :to="{ name: 'home' }" active-class="active" exact>
        Home
      </router-link>

      <router-link :to="{ name: 'checkout' }" active-class="active" exact>
        Rent Spot
      </router-link>

      <router-link :to="{ name: 'schedule' }" active-class="active" exact>
        Schedule your time
      </router-link>

      <a
        href="https://github.com/boston-dynamics/spot-sdk/blob/master/docs/python/understanding_spot_programming.md"
        target="_blank"
      >
        Study the documentation
      </a>
    </Section>
  </div>
</template>

<script>
import Section from "./section";

export default {
  components: { Section }
};
</script>
