<template>
    <div>
        <Card>
        <h2>4. Stay in Touch with us.</h2>
        <p class="text-mid">
          Join our subscribers list to get the latest news, updates and special offers delivered directly in your inbox.
        </p>
        <button @click="handleSubscription">Click here</button>
        <br>
        <br>
        <div>
        <a href="https://twitter.com" target="_blank"><img v-bind:style="{height: 30+'px', width: 30+'px', cursor:'pointer' , marginRight:30+'px' }" src="../../md/images/twitter.png" alt="twitter"></a>
        <a href="https://discord.com" target="_blank"><img v-bind:style="{height: 30+'px', width: 30+'px', cursor:'pointer' }" src="../../md/images/discord.png" alt="twitter"></a>
        </div>
      </Card>
    </div>
</template>
<script>
export default {
    methods:{
        handleSubscription(){
           const { open } = window.tf.createPopup('VucIKqtE');
           open();
        },
        
    },
}
</script>