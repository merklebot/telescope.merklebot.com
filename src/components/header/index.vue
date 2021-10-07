<template>
  <header class="header" role="banner">

    <router-link :to="{ name: 'home' }" class="logo" active-class="active" exact>
      <img alt="dApp logo" src="logo.svg"/><span>Merklebot Spot SDK educational program</span>
    </router-link>

    <nav class="nav-g">
      <router-link :to="{ name: 'home' }" active-class="active" exact>
        Intro
      </router-link>

      <details class="nav-expand highlightText" tabindex="0">
         <summary>Lessons</summary>

         <nav class="nav-v">
            <router-link
              v-for="(lesson, k) in lessons"
              :key="k"
              :to="{ name: 'lesson', params: { lesson: lesson.fileName } }"
              active-class="active"
              exact
            >
              {{ lesson.title }}
            </router-link>
          </nav>
      </details>

      <router-link :to="{ name: 'checkout' }" active-class="active" exact class="highlightText">
        Rent Spot
      </router-link>

      <!-- <a href="#">Support</a> -->
      
    </nav>

    <!-- <div class="header__panel">
      <div>
        <div
          class="account on"
          v-if="$robonomicsModule.isReady && $robonomics.account"
        >
          <div class="account__avatar">
            <Avatar :address="$robonomics.account.address" />
          </div>
          <div class="account__info">
            <div class="address">
              {{ $robonomics.account.address | labelAddress }}
            </div>
            <div class="status">connected</div>
          </div>
        </div>

        <button
          v-if="$robonomicsModule.isReady && !$robonomics.account"
          @click="$web3Module.accessAccount"
        >
          <span class="i-switch"></span><span>Connect account</span>
        </button>
      </div>
      <div class="nav">
        <button
          class="header__panel__settings btn-outline"
          id="mobile-menutoggle"
        >
          <span class="i-menu"></span>
        </button>
      </div>
    </div> -->
  </header>
</template>



<script>
import menu from "@/md/menu";

export default {
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




<style scoped>

  /* Global CSS variables taken from layout/main.vue */

  header[role="banner"] {
    background-color: var(--color-dark);
    color: var(--color-light);
    font-family: var(--font-highlight);
    font-size: 85%;

    padding-top: var(--space);
    padding-bottom: var(--space);
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 999;
  }

  header[role="banner"] a {
    color: var(--color-light);
  }

  @media screen and (max-width: 800px) {
    header[role="banner"] {
      display: block;
    }

    header[role="banner"] > *:not(:last-child) {
      margin-bottom: var(--space);
    }
  }

  @media screen and (min-width: 500px) {
    .logo {
      white-space: nowrap
    }
  }

  .logo img {
    max-width: 30px;
  }

  .logo:after {
    content: "";
    display: inline-block;
    vertical-align: text-bottom;
    width: 6px;
    height: 6px;
    border-radius: 3px;
    background-color: var(--color-yellow);
    margin-left: calc(var(--space)/2);
  }


  .logo > *, .nav-g > * {
    display: inline-block;
    vertical-align: middle;
  }

  .logo > *:not(:last-child), .nav-g > *:not(:last-child) {
    margin-right: var(--space);
  }


  header > nav .active {
    color: var(--color-blue) !important;
  }

  /* Expand / hide details */

  .nav-expand nav { display: none; }
  .nav-expand:focus-within nav, nav-expand:focus nav { display: block; }

  .nav-expand {
    position: relative;
  }

  .nav-expand:hover summary {
    opacity: 0.8;
  }

  .nav-expand summary {
    cursor: pointer;
    padding-top: calc(var(--space)*0.5); /* to reduce miss-types */
    padding-bottom: calc(var(--space)*0.5); /* to reduce miss-types */
  }

  .nav-expand nav {
    background-color: var(--color-dark);
    padding: var(--space);

    position: absolute;
    left: 0;
    top: calc(var(--space)*2.5);
  }

  .nav-expand nav a {
    white-space: nowrap;
  }

  .nav-v > *:not(:last-child) {
    display: block;
    margin-bottom: calc(var(--space)*0.5);
  }

</style>
