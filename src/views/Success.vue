<template>
  <Card style="text-align:center">
    <Spot/>
    <h1>Your payment is successfull!</h1>
    <p>Now you may book 1 hour-long remote session with Boston Dynamics Spot robot</p>
    <router-link :to="{ name: 'checkout' }" class="button">Rent Spot</router-link>
  </Card>
</template>

<style scoped>
  .spot {
    margin: var(--space) auto;
    transform: scale(1) !important;
  }

  @media screen and (max-width:600px) {
    .spot { transform: scale(0.6) !important; }
  }
</style>