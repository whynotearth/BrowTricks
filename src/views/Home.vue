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
        class="normal-case"
      />
    </template>
    <template #tertiaryCTA>
      <p class="text-on-background">
        Already have an account?
        <router-link class="" :to="{ name: 'AuthLogin' }">Log In</router-link>
      </p>
    </template>
  </SplashLayout>
</template>

<script>
import SplashLayout from '@/layouts/SplashLayout.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Home',
  components: {
    SplashLayout
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
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
