<template>
  <Layout><router-view /></Layout>
</template>

<script>
import Layout from "./components/layout/main.vue";

export default {
  name: "App",
  components: {
    Layout
  }

  // head: {
  //   script: [
  //     { type: "text/javascript", src: "https://www.googletagmanager.com/gtag/js?id=5KBB3ZT", async: true},
  //     { type: "text/javascript", inner: "window.dataLayer = window.dataLayer || []; function gtag(){window.dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '5KBB3ZT');", async: true},
  //   ],
  // }
};
</script>


<style>

/* G - reset */
* { margin:0; padding:0; outline: 0; background:transparent; vertical-align:baseline; box-sizing: border-box; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
img {border: 0;}
html { font-size: 100%; -webkit-text-size-adjust: 100%;  -ms-text-size-adjust: 100%;  }
article,aside,details,figcaption,figure, footer,header,hgroup,menu,nav,section, main { display:block; }
nav ul {list-style:none;}
table {border-collapse:collapse; border-spacing:0;}
input, select {vertical-align:middle;}
sup { vertical-align: super; }
sub { vertical-align: sub; }
/* end of G - reset */



/* G - variables */

@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@600;900&family=Roboto+Mono:wght@600&display=swap');

:root {
  --space: 1rem;
  --padding: calc(var(--space) * 2);

  --font-highlight: 'Raleway',-apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;
  --font-text: 'Roboto Mono', Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace;
  --font-size: 1.4rem;

  --color-white: #fff;
  --color-cyan: #C7FFDF;
  --color-lilac: #5681FF;
  --color-orange: #E0850A;
  --color-blue-darkest: #01011C;
  --color-blue: #222274;
  --color-blue-mid: #0F0F50;
  --color-blue-dark: #0B0B34;

  /* --color-yellow: #ffb600;
  --color-blue: #03a5ed;
  --color-green: yellowgreen;
  --color-red: #e84004;

  --color-dark: #333;
  --color-mid: #a8a8a8;
  --color-light: #fff;
  --color-gray: #f2f2f2;
  --color-gray-light: #f0f0f0; */
  
}

/* end - G - variables */


/* OverWrites (over robonomics.min.css) */

/* select, input, button, label, textarea, .button {
  font-size: calc(var(--font-size)*0.85) !important;
  font-weight: bold !important;
  font-family: var(--font-mono);
}

input, select, button, textarea, .button {
  padding: calc(var(--space)*0.5) var(--space) !important;
  border-radius: 0 !important;
}

input:not([type=submit]):not([type=button]), select, label {
  color: var(--color-dark) !important
}

input[disabled], select[disabled], button[disabled], textarea[disabled],
input.disabled, select.disabled, button.disabled, textarea.disabled {
  opacity: .6;
}

select {
  padding-right: calc(var(--space)*2) !important
}

input:not([type=submit]):not([type=button]):focus,
select:focus,
textarea:focus {
  border-color: var(--color-dark) !important
}

input[type=checkbox] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
  width: calc(var(--space)*2);
  height: calc(var(--space)*2);
  position: relative;
  margin-right: calc(var(--space)*0.5);
  padding: 0 !important;
}

input[type='checkbox']:checked {
    background-color: var(--color-green) !important;
    border-color: var(--color-green) !important;
  }

input[type='checkbox']:checked:before {
    content:"✓";
    position: absolute;
    top: 0;
    left: 0.3rem;
    color: var(--color-light) !important;
    font-size: calc(var(--space)*1.5);
} */

/* end -  OverWrites (over robonomics.min.css) */


body {
  font-family: var(--font-text);
  font-size: var(--font-size);
  line-height: 1.5;
  min-height: 100%;
  height: auto;

  background-color: var(--color-blue-darkest);
  color: var(--color-cyan)
}

h1, h2, h3, h4, h5 {
  font-family: var(--font-highlight);
  font-weight: 900 !important;
  line-height: 1.2;
  margin-bottom: calc(var(--space) * 2);
  text-align: center;
}

h1:not(:first-child), h2:not(:first-child), h3:not(:first-child), h4:not(:first-child), h5:not(:first-child) {
  margin-top: calc(var(--space) * 2);
}

h1 { font-size: calc(var(--font-size) * 1.7); }
h2 { font-size: calc(var(--font-size) * 1.2); }
h3 { font-size: calc(var(--font-size) * 1.2); }
h4 { font-size: calc(var(--font-size) * 1); }
h5 { font-size: calc(var(--font-size) * 0.8); }

h1, h2 {
  text-transform: uppercase;
  letter-spacing: 1px;
}

a {
  color: var(--color-white);
  text-decoration: none;
  transition: all 0.2s ease-in-out;
}

a:hover {
  color: var(--color-orange)
}

p {
  margin-bottom: var(--space);
}

select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;

  font-family: var(--font-text);
  font-size: var(--font-size);
  background-color: var(--color-blue);
  color: var(--color-cyan);
  border: 2px solid var(--color-lilac);
  border-radius: 2rem;
  padding: 0.5rem 2rem;
}


main[role="main"] {
  overflow: initial !important; /* This is for position sticky */
}

.hyphens{
  text-align: justify !important;
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  -ms-hyphens: auto;
  hyphens: auto;
}

ul.dashed {
  list-style: none;
  margin: var(--padding) 0;
}

ul.dashed li {
  padding: 0 0 var(--space);
  border-bottom: 1px dashed var(--color-cyan);
  margin-bottom: var(--space);
}


.layout, .layout-mid, .layout-narrow {
  box-sizing: border-box;
  padding-left: var(--padding);
  padding-right: var(--padding);
  margin-left: auto;
  margin-right: auto;
}
.layout-mid { max-width: 1400px; }
.layout-narrow { max-width: 40rem; }

.container-full { width: 100%; }

.disabled {
  opacity: 0.4;
  pointer-events: none;
}


*[class*='grid-'] { 
  display: grid !important;
  gap: var(--space);
}
.grid-4{ grid-template-columns: repeat(4,1fr); }
.grid-3{ grid-template-columns: repeat(3,1fr); }
.grid-2{ grid-template-columns: repeat(2,1fr); }
.grid-1-2 { grid-template-columns: minmax(0, 1fr) minmax(0, 2fr); }

@media screen and (max-width:800px){
  .grid-4 { grid-template-columns: repeat(2,1fr); }
  .grid-3, .grid-1-2 { grid-template-columns: 1fr; }
}

@media screen and (max-width:570px){
  .grid-4, .grid-2 { grid-template-columns: 1fr; }
}

.videoEmbed {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
}
.videoEmbed iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* Nav directions */
.nav-g > * { display: inline-block; }
.nav-g > *:not(:last-child) { margin-right: var(--space); }
/* end Nav directions */


/* Colored sections */
section
{
  padding: calc(var(--padding) * 2) var(--padding);
}

section section {
  padding-left: 0;
  padding-right: 0;
}

.section-blue {
  background-color: var(--color-blue);
}

.section-blue-mid {
  background-color: var(--color-blue-mid);
}

.section-blue-dark {
  background-color: var(--color-blue-dark);
}
/* end of Colored sections */

</style>

