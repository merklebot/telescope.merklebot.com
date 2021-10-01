<template>
  <Card style="text-align:center;">
    <h1>Spot SDK Education Program</h1>

    <div>
      <br />We are excited to see you join the Spot SDK educational program.
      Welcome!<br />
      <br />Our goal is to get you familiar with Spot's SDK and allow you to
      test your skills using a Boston Dynamics Spot robot in our lab.<br />
      <br />We recommend you study the theoretical materials before you rent the
      time on Spot so that you have a plan of action for your lesson and can
      complete it successfully.<br />
      <br />Also, you will have to install additional software to your machine
      to get access to Spot remotely. You can find the instructions in Lesson 0
      of the Theory section.<br />
      <br />Welcome to our robotics lab, and we hope that you will enjoy your
      time with Spot!<br />
    </div>

    <div class="btns">
      <router-link
        class="btn-big"
        :to="{ name: 'lesson', params: { lesson: 'spot-lesson0' } }"
        >Study Theory</router-link
      >
      <router-link class="btn-big" :to="{ name: 'checkout' }"
        >Rent Spot for Practice</router-link
      >
    </div>

    <div style="margin:30px 0">
      <iframe
        width="960px"
        height="540px"
        src="https://www.youtube.com/embed/_xBLkszEwWk"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </Card>
</template>

<style scoped>
.btns {
  margin: 20px;
}
.btns a {
  margin: 20px;
  background-color: #f15a24;
}
.btns a:hover {
  background-color: #bd3200 !important;
}
</style>
