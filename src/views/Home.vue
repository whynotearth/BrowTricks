<template>
  <SplashLayout>
    <template #image>
      <img
        class="logo mb-8"
        src="https://res.cloudinary.com/whynotearth/image/upload/v1600846670/BrowTricks/static_v2/logo-round-wbg_oo659o.png"
        alt=""
      />
    </template>
    <template #pretitle>Welcome to</template>
    <template #title>{{ SHORTNAME }}</template>
    <template #primaryCTA>
      <Button
        background="bg-primary"
        textColor="text-on-primary"
        title="Create Account"
        class="normal-case mb-2"
        :to="{ name: 'AuthSignup' }"
      />
    </template>
    <template #tertiaryCTA>
      <p class="text-on-background">
        Already have an account?
        <router-link class="" :to="{ name: 'AuthLogin' }">Log In</router-link>
      </p>
      <br />
      <div class="mb-4 text-left text-on-background">
        <p><br /><strong>Client Orginization &amp; mangament FREE!</strong></p>
        <p>- Unlimited notes</p>
        <p>- Photo management</p>
        <p><strong>Also free for 30 days:</strong></p>
        <p>- PMU form building AND digital signing</p>
        <p>- Client video cloud storage</p>
        <p>
          <br /><a
            href="https://medium.com/progressivewebapps/how-to-install-a-pwa-to-your-device-68a8d37fadc1"
            ><strong>Install Guide</strong></a
          >
          (ios &amp; android apps after beta)
        </p>
        <br />
        <p>
          If you have any questions, please feel free to contact us at ANY time!
        </p>
        <p>
          <br />TEXT US at 510-319-3040 or EMAIL us at:
          support@browtricksproductsorg.zendesk.com
        </p>
      </div>
    </template>
  </SplashLayout>
</template>

<script>
import SplashLayout from '@/layouts/SplashLayout.vue';
import { mapActions } from 'vuex';

export default {
  name: 'Home',
  components: {
    SplashLayout
  },
  computed: {
    SHORTNAME() {
      return process.env.VUE_APP_SHORTNAME;
    }
  },
  methods: {
    ...mapActions('global', ['isDrawerOpenUpdate', 'isDrawerOpenAuthUpdate'])
  }
};
</script>

<style scoped>
.logo {
  width: 144px;
}
</style>
