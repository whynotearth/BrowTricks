<template>
  <div class="text-on-surface">
    <div
      class="bg-on-background bg-opacity-medium fixed inset-x-0 top-0 min-h-screen w-full z-10"
      @click="toggleMenuDrawer"
      v-if="isMenuDrawerOpen"
    ></div>
    <transition name="slide">
      <div
        class="bg-white fixed overflow-auto inset-y-0 left-0 z-20 w-full max-w-sm tg-h3-mobile text-left py-8 narrow-scrollbar has-light-bg overscroll-none"
        v-if="isMenuDrawerOpen"
      >
        <div class="px-4">
          <router-link
            class="pb-8 cursor-pointer block"
            :to="{
              name: 'Home'
            }"
          >
            Home
          </router-link>
          <div
            class="pb-8 cursor-pointer text-on-background text-opacity-disabled"
          >
            About
          </div>
          <div
            class="pb-8 cursor-pointer text-on-background text-opacity-disabled"
          >
            Services
          </div>
          <div
            class="pb-8 cursor-pointer text-on-background text-opacity-disabled"
          >
            Contact
          </div>
          <div
            class="pb-8 cursor-pointer text-on-background text-opacity-disabled"
          >
            Book Now
          </div>
          <div
            class="pb-8 cursor-pointer text-on-background text-opacity-disabled"
          >
            Terms of Use
          </div>
          <div
            class="pb-8 cursor-pointer text-on-background text-opacity-disabled"
          >
            Privacy Policy
          </div>
          <router-link
            class="pb-8 cursor-pointer block"
            :to="{
              name: 'ClientList',
              params: { tenantSlug }
            }"
          >
            Clients
          </router-link>
          <router-link
            class="pb-8 cursor-pointer"
            v-if="!isAuthenticated"
            :to="{ name: 'Login' }"
          >
            Log In
          </router-link>
          <div class="cursor-pointer" v-else @click="onLogout">
            Logout
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'MenuDrawer',
  computed: {
    ...mapGetters({
      isMenuDrawerOpen: 'getIsMenuDrawerOpen'
    }),
    ...mapGetters('auth', ['isAuthenticated']),
    tenantSlug() {
      return this.$route.params.tenantSlug;
    }
  },
  methods: {
    ...mapMutations(['toggleMenuDrawer']),
    ...mapActions('auth', ['logout']),
    onLogout() {
      this.logout().catch(() => {
        alert(
          `Logout failed! If the problem persisted, please contact ${process.env.VUE_APP_ADMINISTRATOR_CONTACT_EMAIL}`
        );
      });
    },
    disableScrollbars() {
      document.body.classList.add('overflow-hidden');
    },
    enableScrollbars() {
      document.body.classList.remove('overflow-hidden');
    }
  },
  beforeDestroy() {
    this.enableScrollbars();
  },
  watch: {
    isMenuDrawerOpen: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.disableScrollbars();
        } else {
          this.enableScrollbars();
        }
      }
    }
  }
};
</script>
