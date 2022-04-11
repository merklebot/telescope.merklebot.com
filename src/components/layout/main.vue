<template>
  <fragment>
    <Header :class="scrollClass" />

    <main role="main">
      <slot />
    </main>

    <a 
    title="Get support in our Discord community" 
    class="support-discord"
    :class="scrollClass"
    :href="$discord" 
    target="_blank">
    <img alt="" src="i/discord.png" aria-hidden="true"/>
    <div class="support-discord-content">
      <div class="support-discord-title">Any troubles?</div>
      <div>Ask your question in Discord!</div>
    </div>
    </a>

  </fragment>
</template>

<script>
import Header from "../header";

export default {
  name: "Layout",
  components: {
    Header
  },

  data(){
    return {
      scrolled: false
    }
  },

  computed: {
    scrollClass() {
      return {
        [`scrolled`]: this.scrolled
      };
    },
  },

  methods: {
    windowScrolled() {
      if(window.pageYOffset > 200) {
        this.scrolled = true
      } else {
        this.scrolled = false
      }
    }
  },

  mounted(){
    
    var o = this;
    o.windowScrolled();
    window.addEventListener('scroll', function(){
      o.windowScrolled();
    });
  }
};
</script>

<style>
.support-discord {
  position: fixed;
  z-index: 1000;
  bottom: var(--space);
  right: var(--space);

  display: grid;
  grid-template-columns: 60px 1fr;
  gap: var(--space);

  background-color: var(--color-blue);
  padding: var(--space);
  border-radius: var(--space);
  border: 2px solid var(--color-lilac);
  max-width: calc(100% - var(--space) * 2);
}

.support-discord img {
  max-width: 60px;
}

.support-discord-content {
  font-size: 80%;
}

.support-discord-title {
  font-weight: bold;
  font-size: var(--font-size);
}

.scrolled.support-discord {
  --space: 0.8rem;
  font-weight: bold;
  grid-template-columns: 30px 1fr;
}

.scrolled .support-discord-title {
  display: none;
}

.scrolled.support-discord img {
  max-width: 30px;
}
</style>