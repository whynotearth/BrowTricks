<template>
  <!-- Used in admin area -->
  <BaseDrawerMenu>
    <template #content>
      <router-link
        class="pb-8 cursor-pointer block"
        @click.native="closeDrawer"
        :to="{
          name: tenantSlug ? 'TenantHome' : 'Home'
        }"
      >
        Home
      </router-link>
      <router-link
        v-if="tenantSlug"
        @click.native="closeDrawer"
        class="pb-8 cursor-pointer block"
        :to="{
          name: 'ClientList',
          params: { tenantSlug }
        }"
      >
        Clients
      </router-link>
      <div class="pb-8 cursor-pointer text-on-background text-opacity-disabled">
        About
      </div>
      <div class="pb-8 cursor-pointer text-on-background text-opacity-disabled">
        Services
      </div>
      <div class="pb-8 cursor-pointer text-on-background text-opacity-disabled">
        Contact
      </div>
      <div class="pb-8 cursor-pointer text-on-background text-opacity-disabled">
        Book Now
      </div>
      <div class="pb-8 cursor-pointer text-on-background text-opacity-disabled">
        Terms of Use
      </div>
      <div class="pb-8 cursor-pointer text-on-background text-opacity-disabled">
        Privacy Policy
      </div>
      <a
        class="pb-8 cursor-pointer"
        v-if="!isAuthenticated"
        @click.prevent.stop="openLogin"
      >
        Log In
      </a>
      <div class="cursor-pointer" v-else @click="onLogout">
        Logout
      </div>
    </template>
  </BaseDrawerMenu>
</template>

<script>
import BaseDrawerMenu from '@/components/BaseDrawerMenu.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'MenuDrawerPanel',
  props: ['tenantSlug'],
  components: { BaseDrawerMenu },
  computed: {
    ...mapGetters('auth', ['isAuthenticated'])
  },
  methods: {
    ...mapActions('auth', ['logout']),
    ...mapActions('loading', ['loadingUpdate']),
    ...mapActions('global', ['isDrawerOpenUpdate', 'isDrawerOpenAuthUpdate']),
    openLogin() {
      // native event has no access to 'this'
      this.closeDrawer();
      this.isDrawerOpenAuthUpdate(true);
    },
    closeDrawer() {
      this.isDrawerOpenUpdate(false);
    },
    onLogout() {
      this.loadingUpdate(true);
      this.closeDrawer();
      this.logout()
        .catch(() => {
          alert(
            `Logout failed! If the problem persisted, please contact ${process.env.VUE_APP_ADMINISTRATOR_CONTACT_EMAIL}`
          );
        })
        .finally(() => {
          this.loadingUpdate(false);
        });
    }
  }
};
</script>
