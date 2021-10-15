<template>
  <fragment>
    <Header />

    <main role="main">
      <div class="layout-mid">
        <slot />
      </div>
    </main>

  </fragment>
</template>

<script>
import Header from "../header";

export default {
  name: "Layout",
  components: {
    Header
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
  --color-green: yellowgreen;
  --color-red: #e84004;

  --color-dark: #333;
  --color-mid: #a8a8a8;
  --color-light: #fff;
  --color-gray: #f2f2f2;

  --font-highlight: 'Raleway',-apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;
  --font-mono: Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace;
  --font-size: 1.4rem;
}

/* end - G - variables */


/* OverWrites (over robonomics.min.css) */

html { font-size: 100%; }

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
h3 { font-size: calc(var(--font-size) * 1.3); }

b { font-weight: bold !important;}

hr {
  margin-top: calc(var(--space)*2);
  margin-bottom: calc(var(--space)*2);
}

blockquote {
  background-color: var(--color-gray);
  border: 1px solid var(--color-mid) !important;
  padding: var(--space);
}


select, input, button, label, textarea, .button {
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
}

.red { color: var(--color-red) !important}

.button {
  border: 2px solid var(--color-blue);
  color: var(--color-blue);
  transition: all 0.4s;
}

.button:hover {
  background-color: var(--color-blue);
  color: var(--color-light)
}

/* end -  OverWrites (over robonomics.min.css) */



/* G - Styles */

main[role="main"] {
  margin-top: calc(var(--space)*3);
  overflow: initial !important; /* This is for position sticky */
  padding-bottom: calc(var(--space)*3);
}

h1, h2, h3, h4, h5 {
  font-family: var(--font-highlight);
}

.highlightText { color: var(--color-yellow) !important }
.label { color: var(--color-green) !important }
.text-mid { font-size: 90%; }
.text-bold { font-weight: bold; }


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
.grid-1-2 { grid-template-columns: minmax(0, 1fr) minmax(0, 2fr); }

@media screen and (max-width:800px){
  .grid-4 { grid-template-columns: repeat(2,1fr); }
  .grid-3, .grid-1-2 { grid-template-columns: 1fr; }
}

@media screen and (max-width:570px){
  .grid-4, .grid-2 { grid-template-columns: 1fr; }
}


/* .bill {
  font-family: var(--font-mono);
  font-size: calc(var(--font-size)*0.85);
  color: var(--color-dark);
  border: 1px dashed var(--color-dark);
  display: inline-block;
}

.bill-line {
  padding: var(--space);
}

.bill-line:not(:last-child) {
  border-bottom: 1px dashed var(--color-dark);
} */


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
