<template>
  <!-- TODO: use layouts/LayoutSplash.vue -->
  <div
    class="layout-splash min-h-screen w-full flex flex-col justify-between sm:justify-center items-center py-20"
  >
    <div class="sm:py-16 flex flex-col items-center">
      <div class="py-3">
        <img height="450" width="225" :src="logoUrl" alt="browtricks-logo" />
      </div>
    </div>
    <div class="sm:py-10 w-full md:w-auto px-5">
      <div class="py-3">
        <h1 class="tg-h1-mobile text-white text-opacity-high">
          {{ appName }}
        </h1>
      </div>
      <div class="py-3">
        <Button
          :to="{ name: 'SignUp', params: { step: 'business-info' } }"
          title="START SETTING UP YOUR BUSINESS"
          class="tg-color-label-mobile text-white text-opacity-high rounded-full py-3 px-10"
        />
      </div>
      <div class="py-3 text-center" v-if="!isAuthenticated">
        <Button
          :to="{ name: 'LogIn' }"
          class="tg-body-hyperlink-mobile text-on-background-image text-opacity-medium pb-4 normal-case font-normal"
          title="Already have an account? Log in!"
          background="bg-transparent"
          :isRipple="false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';
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
  methods: {
    ...mapGetters('auth', ['isAuthenticated'])
  }
};
</script>
