<template>
  <fragment>
    <Header />
    <main role="main">
      <Sidebar />
      <div class="content">
        <div class="content-in">
          <slot />
        </div>
      </div>
    </main>
  </fragment>
</template>

<script>
import Header from "../header";
import Sidebar from "../sidebar";

export default {
  name: "Layout",
  components: {
    Header,
    Sidebar
  }
};
</script>
