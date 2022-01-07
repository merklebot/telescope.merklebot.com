<template>
  <header class="header" role="banner">

    <router-link :to="{ name: 'checkout' }" class="toplink">Online telescope</router-link>

    <nav class="nav-g">
      <details class="nav-expand" tabindex="0">
        <summary class="icon">?</summary>

        <div class="nav-expand-content">
          <h4>Have a question?</h4>
          <p>Please contact us by <a href="https://discord.gg/H7FndCWb" target="_blank" rel="noopener noreferrer">Discord</a>.</p>
        </div>
      </details>

      <details class="nav-expand" tabindex="0">
        <summary class="icon">i</summary>

        <div class="nav-expand-content">
          <h4>First Beyond the Sky</h4>
          <p>This digital experience explores the interconnection of realverse and metaverse. </p>
          <p><a href="https://medium.com/merklebot/mint-nfts-with-telescope-in-chile-371eb773189" target="_blank" rel="noopener noreferrer">Learn more</a></p>
          <h4>Technologies used</h4>
          <p>Blockchain, <a href="https://robonomics.network/" target="_blank" rel="noopener noreferrer">Robonomics</a>, <a href="https://kusama.network/" target="_blank" rel="noopener noreferrer">Kusama</a>, <a href="https://ipfs.io/" target="_blank" rel="noopener noreferrer">IPFS</a>, <a href="https://www.rmrk.app/" target="_blank" rel="noopener noreferrer">RMRK</a></p>
        </div>
      </details>
    </nav>

  </header>
</template>


<script>

export default {

  mounted() {
    // get the sticky element
    // const el = document.querySelector(".header")
    // const observer = new IntersectionObserver( 
    //   ([e]) => e.target.classList.toggle("is-pinned", e.intersectionRatio < 1),
    //   { threshold: [1] }
    // );

    // observer.observe(el);


    // Close all opened details on body click
    document.body.onclick = (e) => {
        const current = e.target.parentNode; //save clicked element to detect if it is our current detail

        document.body.querySelectorAll('details')
            .forEach((e) => {
                if(e !== current){ //we need this condition not to break details behavior
                    e.open = false
                }
        })

    }
  }
};
</script>

<style scoped>

  /* Global CSS variables taken from App.vue */

  header {
    --header-textcolor: var(--color-cyan);

    font-family: var(--font-highlight);
    font-weight: 900;
    color: var(--header-textcolor);
 
    padding: var(--space);

    /* position: -webkit-sticky;
    position: sticky;
    top: -1px; */
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;

    display: grid;
    grid-template-columns: 1.5fr 1fr;
  }

  header > *:nth-child(2) {
    justify-self: end;
  }

  header a.toplink {
    color: var(--header-textcolor);
  }

  /* Nav details expand */

  .nav-expand summary::-webkit-details-marker, .nav-expand summary::marker { display: none }

  .nav-expand:hover summary { opacity: 0.8; }

  .nav-expand summary {
    cursor: pointer;
    padding-top: calc(var(--space)*0.5);
    padding-bottom: calc(var(--space)*0.5);
  }

  .nav-expand {
    position: relative;
  }
  
  .nav-expand .nav-expand-content {
    padding: var(--space);
    position: absolute;
    right: 0;
    top: calc(var(--space)*2.7);

    background-color: var(--color-blue-darkest);
    min-width: 450px;
    max-width: 100%;
    border: 2px solid var(--header-textcolor);
    border-radius: var(--space);
  }

  /* for narrow screens tips have different style */
  @media screen and (max-width: 480px) {
    .nav-expand {
      position: static;
    }

    .nav-expand .nav-expand-content {
      min-width: 300px;

      left: var(--space);
      right: var(--space);
      top: calc(var(--space) * 4);
    }
  }

  /* end of Nav details expand */

  .icon {
    font-size: calc(var(--space) * 1.8);
    line-height: 1;

    width: calc(var(--space) * 2.4);
    height: calc(var(--space) * 2.4);

    border: 2px solid var(--header-textcolor);
    border-radius: calc(var(--space) * 2.4);

    display: flex;
    align-items: center;
    justify-content: center
  }

  .nav-expand[open] .icon {
    background-color: var(--color-blue-darkest)
  }

  .nav-expand-content p {
    font-family: var(--font-text);
    font-size: 80%;
  }

</style>
