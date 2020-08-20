<template>
  <SplashLayout
    backgroundImage="https://res.cloudinary.com/whynotearth/image/upload/v1590460151/BrowTricks/Action_page_background_zlpen3.png"
  >
    <template #title>
      <h1 class="tg-h1-mobile text-on-primary text-opacity-high">
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
        class="text-on-background text-opacity-medium normal-case"
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

import { mapActions, mapMutations } from 'vuex';

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

    this.loading(true);
    this.handleRedirect();
  },
  beforeDestroy() {
    this.loading(false);
  },
  methods: {
    ...mapActions('auth', ['updateToken']),
    ...mapActions('tenant', ['fetchUserTenants']),
    ...mapMutations('loading', ['loading']),
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
          this.loading(false);
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
