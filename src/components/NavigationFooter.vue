<template>
  <div class="bg-brand6">
    <div class="max-w-6xl mx-auto py-16 px-6">
      <div
        class="grid grid-cols-1 md:grid-cols-4 text-left px-10 md:px-0 mb-12 md:mb-0"
      >
        <nav class="md:col-span-2 mb-10 md:mb-0">
          <h3 class="tg-h2-mobile list-title">Quick Links</h3>

          <div class="flex flex-col md:flex-row">
            <ul class="list-items tg-body-bold-mobile flex-grow flex-shrink-0">
              <li class="mb-2">
                <router-link :to="{ name: 'Home' }">Home</router-link>
              </li>
              <li class="mb-2">
                <router-link :to="{ name: 'Pricing' }">Pricing</router-link>
              </li>
              <li class="mb-2 md:mb-0">
                <router-link :to="{ name: 'AuthLogin' }">Log In</router-link>
              </li>
            </ul>

            <ul class="list-items tg-body-bold-mobile flex-grow flex-shrink-0">
              <li class="mb-2">
                <router-link :to="{ name: 'Home' }"
                  >Terms and Conditions</router-link
                >
              </li>
              <li class="mb-2 md:mb-0">
                <router-link :to="{ name: 'PrivacyPolicy' }"
                  >Privacy Policy</router-link
                >
              </li>
            </ul>
          </div>
        </nav>

        <nav class="mb-10 md:mb-0">
          <h3 class="tg-h2-mobile list-title">Follow</h3>
          <ul class="list-items tg-body-bold-mobile">
            <li class="mb-2">
              <router-link :to="{ name: 'Home' }">Facebook</router-link>
            </li>
            <li class="mb-2 md:mb-0">
              <router-link :to="{ name: 'Home' }">Instagram</router-link>
            </li>
          </ul>
        </nav>

        <nav class="mb-10 md:mb-0">
          <h3 class="tg-h2-mobile list-title">Stay In Touch</h3>
          <ul class="list-items tg-body-bold-mobile">
            <li class="mb-2 md:mb-0">
              <a href="https://browtricksproductsorg.zendesk.com/">Help</a>
            </li>
          </ul>
        </nav>
      </div>

      <div
        class="flex justify-center md:justify-end text-on-brand6 text-opacity-high tg-h1-mobile px-10 md:px-0"
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

.list-items > li > a {
  @apply py-2 inline-block text-on-brand6 text-opacity-high;
}
</style>
