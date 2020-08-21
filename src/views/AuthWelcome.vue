<template>
  <!-- TODO: use layouts/LayoutSplash.vue -->
  <div
    class="layout-splash min-h-screen w-full flex flex-col justify-between sm:justify-center items-center py-14"
  >
    <div></div>
    <div class="sm:py-10 w-full md:w-auto px-5">
      <div class="py-3">
        <h1 class="tg-h2-mobile text-white text-opacity-high">
          {{ appName }}
        </h1>
      </div>
      <div class="py-3">
        <Button
          :to="{ name: 'SignUp', params: { step: 'business-info' } }"
          title="START SETTING UP YOUR BUSINESS"
          class="tg-color-label-mobile text-white text-opacity-high rounded-full py-3"
        />
      </div>
      <div class="py-3 text-center" v-if="!isAuthenticated">
        <Button
          :to="{ name: 'Login' }"
          class="normal-case"
          textColor="text-on-background text-opacity-medium"
          title="Already have an account? Log in!"
          theme="none"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/inputs/Button.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Welcome',
  data() {
    return {
      logoUrl: process.env.VUE_APP_LOGO_URL,
      appName: process.env.VUE_APP_NAME
    };
  },
  components: {
    Button
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated'])
  }
};
</script>
