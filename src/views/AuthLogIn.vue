<template>
  <SplashLayout>
    <template #title>
      <h1 class="tg-h1-mobile text-white text-opacity-high">
        {{ appName }}
      </h1>
    </template>
    <template #image>
      <img height="450" width="225" :src="logoUrl" alt="browtricks-logo" />
    </template>
    <template #primaryCTA>
      <AuthButtons />
    </template>
    <template #tertiaryCTA>
      <Button
        :to="{ name: 'SignUp', params: { step: 'business-info' } }"
        class="tg-body-hyperlink-mobile text-on-background-image text-opacity-medium pb-4 normal-case font-normal"
        title="No account? Sign Up For Brow Tricks Beauty!"
        background="bg-transparent"
      />
    </template>
  </SplashLayout>
</template>

<script>
import AuthButtons from '@/components/auth/AuthButtons';
import Button from '@/components/inputs/Button.vue';
import SplashLayout from '@/layouts/SplashLayout.vue';

import { mapActions } from 'vuex';

export default {
  name: 'Login',
  components: {
    SplashLayout,
    AuthButtons,
    Button
  },
  data() {
    return {
      logoUrl: process.env.VUE_APP_LOGO_URL,
      appName: process.env.VUE_APP_NAME
    };
  },
  created() {
    const gotToken = this.setTokenFromUrl();
    if (!gotToken) {
      return;
    }

    this.handleRedirect();
  },
  methods: {
    ...mapActions('auth', ['updateToken']),
    ...mapActions('tenant', ['fetchUserTenants']),
    handleRedirect() {
      this.fetchUserTenants()
        .then(tenants => {
          if (tenants.length > 0) {
            this.goToFirstTenantClientList(tenants);
          } else {
            this.goToSignUp();
          }
        })
        .catch(() => {
          alert(
            `Login failed! If the problem persisted, please contact ${process.env.VUE_APP_ADMINISTRATOR_CONTACT_EMAIL}`
          );
        });
    },
    setTokenFromUrl() {
      if (this.$route.query.token) {
        this.updateToken(this.$route.query.token);
        return true;
      }
      return false;
    },
    goToSignUp() {
      this.$router.push({ name: 'SignUp', params: { step: 'business-info' } });
    },
    goToFirstTenantClientList(tenants) {
      this.$router.push({
        name: 'ClientList',
        params: { tenantSlug: tenants[0].slug }
      });
    }
  }
};
</script>
