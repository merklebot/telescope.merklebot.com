<template>

    <div>

      <section class="layout-narrow">
        <h1>Welcome to Spot SDK Education Program!</h1>
        <p>We are excited to see you join the Spot SDK educational program! Our goal is to get you familiar with Spot's SDK and allow you to
        test your skills using a Boston Dynamics Spot robot in our lab.</p>
        <p>Learn and practice with the Boston Dynamics Spot robot wherever you are. Get after each lesson captured video, robot movements recorded and printable PDF certificate to demonstrate your experience on the interview for your next dream job!</p>
        <p><a href="https://blog.aira.life/learn-boston-dynamics-spot-programming-at-merklebots-course-d59e3007e78f" target="_blank">Read more in the post from our engineer Alisher A. Khassanov</a></p>
      </section>
        
      <section class="videoEmbed">
        <iframe src="https://www.youtube.com/embed/_xBLkszEwWk?autoplay=1&mute=1&modestbranding=1&iv_load_policy=3&rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </section>

      <section class="layout-narrow">
        <h2>Where to start?</h2>
        <p>Please, follow steps below each lesson and see results you will get.</p>
      </section>

      <section class="layout-narrow">
        <h2>
          <router-link :to="{ name: 'lesson', params: { lesson: lessons[0].fileName } }" class="highlightText">
            1. Learn
          </router-link>
          <span class="label">Free</span>
        </h2>
        <p>We recommend you study the theoretical materials before you rent the
      time on Spot so that you have a plan of action for your lesson and can
      complete it successfully.</p>
      </section>

      <section class="layout-narrow">
        <h2>
          <router-link :to="{ name: 'checkout' }" class="highlightText">
            2. Rent
          </router-link>
          <span class="label"><pricePerLesson /> USD per lesson</span>
        </h2>
        <p>The robot is located in our laboratory in Silicon Valley. The course is self-paced, you select one hour-long session to practice with the robot by Google Calendar after paying for it. We don’t charge for anything else. Once you feel ready, you buy a 1 hour-long practice session specifying your access credentials (SSH key) and the time when you want to connect to Spot to solve the task.</p>
      </section>

      <section class="layout-narrow">
        <h2>3. Practice your skills</h2>
        <p>When your session starts, you can connect to the Spot robot by SSH and join a Google Meet meeting to watch the robot by the camera. While working, use our lessons presented in this dapp and Spot documentation at dev.bostondynamics.com</p>
      </section>

      <section class="layout-narrow">
        <h2>4. Share</h2>
        <p>The robot captures its state. And after the lesson, MerkleBot signs the robot state records to prove its origin for the certificate and you can download it.</p>
        <p>Share your results in your social accounts. You may even add your successful lessons results as a certificate in your LinkedIn profile: just choose Merklebot as an Issuing organization and blockchain hash of lesson's certificate as an Credentials ID.</p>
      </section>

    </div>

    

</template>

<script>
import menu from "@/md/menu";

export default {
  data() {
    return {
      lessons: []
    };
  },
  components: {
    pricePerLesson: () => import('../components/includes/PricePerLesson.vue')
  },

  head: {
    title: {
      inner: 'Intro'
    },
  },

  created() {
    this.lessons = menu;
  }
};
</script>

<style scoped>
  .grid-2 {
    gap: calc(var(--space) * 3)
  }
</style>
