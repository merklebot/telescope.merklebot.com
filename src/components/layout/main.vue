<template>
  <fragment>
    <Header />

    <main role="main">
      <!-- <Sidebar /> -->
      <!-- <div class="content">
        <div class="content-in">
          <slot />
        </div>
      </div> -->

      <div class="layout-mid">
        <slot />
      </div>
    </main>

  </fragment>
</template>

<script>
import Header from "../header";
// import Sidebar from "../sidebar";

export default {
  name: "Layout",
  components: {
    Header,
    // Sidebar
  }
};
</script>

<style>

/* G - variables */

@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@800&display=swap');

body {
  --space: 1rem;

  --color-yellow: #ffb600;
  --color-blue: #03a5ed;

  --color-dark: #333;
  --color-mid: #a8a8a8;
  --color-light: #fff;

  --font-highlight: 'Raleway',-apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;
  --font-mono: Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace;
  --font-size: 1.4rem;
}

/* end - G - variables */


/* OverWrites (over robonomics.min.css) */

body, main[role="main"] {
  display: block;
}

body {
  font-size: var(--font-size) !important;
  line-height: 1.5;
}

h1, h2, h3, h4, h5 {
  text-transform: none;
  letter-spacing: 0;
  color: var(--color-dark);
  line-height: 1.2;
}

h1 { font-size: calc(var(--font-size) * 2); }
h2 { font-size: calc(var(--font-size) * 1.7); }

b { font-weight: bold !important;}

/* end -  OverWrites (over robonomics.min.css) */



/* G - Styles */

main[role="main"] {
  margin-top: calc(var(--space)*3)
}

h1, h2, h3, h4, h5 {
  font-family: var(--font-highlight);
}

.highlightText { color: var(--color-yellow) !important }
.label { color: var(--color-green) !important }
.text-mid { font-size: 90%; }


.layout, .layout-mid, .layout-narrow {
  box-sizing: border-box;
  padding-left: var(--space);
  padding-right: var(--space);
  margin-left: auto;
  margin-right: auto;
}
.layout-mid { max-width: 1400px; }
.layout-narrow { max-width: 800px; }

section {
  /* margin-top: calc(var(--space)*2); */
  margin-top: 0;
  margin-bottom: calc(var(--space)*4);
}



*[class*='grid-'] { 
  display: grid !important;
  gap: var(--space);
}
.grid-4{ grid-template-columns: repeat(4,1fr); }
.grid-3{ grid-template-columns: repeat(3,1fr); }
.grid-2{ grid-template-columns: repeat(2,1fr); }
.grid-1-2 { grid-template-columns: 1fr 2fr; }

@media screen and (max-width:800px){
  .grid-4 { grid-template-columns: repeat(2,1fr); }
  .grid-3, .grid-1-2 { grid-template-columns: 1fr; }
}

@media screen and (max-width:570px){
  .grid-4, .grid-2 { grid-template-columns: 1fr; }
}


.bill {
  font-family: var(--font-mono);
  color: var(--color-dark);
  border: 1px dashed var(--color-dark);
  display: inline-block;
}

.bill-line {
  padding: var(--space);
}

.bill-line:not(:last-child) {
  border-bottom: 1px dashed var(--color-dark);
}


.videoEmbed {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
}
.videoEmbed iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* end - G - Styles */

  
</style>
