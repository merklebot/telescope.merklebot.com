<template>
  <Card style="text-align:center">
    <h1 class="red">Transaction was cancelled</h1>
    <p>Your payment was cancelled, would you like to <router-link :to="{ name: 'checkout' }">begin the process again</router-link>?</p>
  </Card>
</template>
