<template>
  <div class="bg-brand6">
    <div class="max-w-6xl mx-auto py-16">
      <div class="grid grid-cols-4 text-left">
        <nav>
          <h3 class="tg-h2-mobile list-title">Quick Links</h3>
          <ul class="list-items tg-body-bold-mobile">
            <li><router-link :to="{ name: 'Home' }">Home</router-link></li>
            <li>
              <router-link :to="{ name: 'Pricing' }">Pricing</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'AuthLogin' }">Log In</router-link>
            </li>
          </ul>
        </nav>

        <nav>
          <h3 class="tg-h2-mobile list-title invisible">privacy</h3>
          <ul class="list-items tg-body-bold-mobile">
            <li>
              <router-link :to="{ name: 'Home' }"
                >Terms and Conditions</router-link
              >
            </li>
            <li>
              <router-link :to="{ name: 'PrivacyPolicy' }"
                >Privacy Policy</router-link
              >
            </li>
          </ul>
        </nav>

        <nav>
          <h3 class="tg-h2-mobile list-title">Follow</h3>
          <ul class="list-items tg-body-bold-mobile">
            <li><router-link :to="{ name: 'Home' }">Facebook</router-link></li>
            <li><router-link :to="{ name: 'Home' }">Instagram</router-link></li>
          </ul>
        </nav>

        <nav>
          <h3 class="tg-h2-mobile list-title">Stay In Touch</h3>
          <ul class="list-items tg-body-bold-mobile">
            <li><router-link :to="{ name: 'Home' }">Help</router-link></li>
          </ul>
        </nav>
      </div>

      <div
        class="flex justify-center md:justify-end text-on-brand6 text-opacity-high tg-h1-mobile"
      >
        {{ APPNAME }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavigationFooter',
  computed: {
    APPNAME() {
      return process.env.VUE_APP_NAME;
    }
  }
};
</script>

<style scoped>
.list-title {
  @apply mb-8 text-on-brand6 text-opacity-high;
}

.list-items > li:not(:last-child) {
  @apply mb-2;
}
.list-items > li > a {
  @apply py-2 inline-block text-on-brand6 text-opacity-high;
}
</style>
