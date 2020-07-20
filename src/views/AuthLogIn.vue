<template>
  <!-- TODO: use layouts/LayoutSplash.vue -->
  <div
    class="layout-splash min-h-screen w-full flex flex-col justify-between md:justify-center items-center py-20"
  >
    <div class="py-10 flex flex-col items-center">
      <div class="py-3">
        <img height="450" width="225" :src="logoUrl" alt="browtricks-logo" />
      </div>
    </div>
    <div class="py-10 w-full md:w-auto px-5">
      <div class="py-3">
        <h1 class="tg-h1-mobile text-white text-opacity-high">
          {{ appName }}
        </h1>
      </div>
      <AuthButtons />
      <Button
        :to="{ name: 'SignUp', params: { step: 'business-info' } }"
        class="tg-body-hyperlink-mobile text-on-background-image text-opacity-medium pb-4 normal-case font-normal"
        title="No account? Sign Up For Brow Tricks Beauty!"
        background="bg-transparent"
        :isRipple="false"
      />
    </div>
  </div>
</template>

<script>
import AuthButtons from '@/components/auth/AuthButtons';
import Button from '@/components/Button.vue';

import { mapActions } from 'vuex';

export default {
  name: 'LogIn',
  components: {
    AuthButtons,
    Button
  },
  data() {
    return {
      logoUrl: process.env.VUE_APP_LOGO_URL,
      appName: process.env.VUE_APP_NAME
    };
  },
  async created() {
    if (this.$route.query.token) {
      await this.updateToken(this.$route.query.token);
    }

    this.ping().then(response => {
      if (response.isAuthenticated) {
        this.$router.push({ name: 'CustomerHome' });
      }
    });
  },
  methods: {
    ...mapActions('auth', ['ping', 'updateToken'])
  }
};
</script>
