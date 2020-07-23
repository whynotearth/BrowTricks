<template>
  <div class="text-on-surface">
    <div
      class="bg-on-background bg-opacity-medium fixed inset-x-0 top-0 min-h-screen w-full z-10"
      @click="toggleMenuDrawer"
      v-if="isMenuDrawerOpen"
    />
    <transition name="slide">
      <div
        class="bg-white fixed inset-x-0 top-0 min-h-screen w-4/5 z-20 py-8 px-4"
        v-if="isMenuDrawerOpen"
      >
        <div class="flex flex-col tg-h3-mobile text-left">
          <div class="pb-8 cursor-pointer">
            Home
          </div>
          <div class="pb-8 cursor-pointer">
            About
          </div>
          <div class="pb-8 cursor-pointer">
            Services
          </div>
          <div class="pb-8 cursor-pointer">
            Contact
          </div>
          <div class="pb-8 cursor-pointer">
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
            class="pb-8 cursor-pointer"
            :to="{
              name: 'ClientList',
              params: { tenantSlug: 'test-tenant-94' }
            }"
          >
            Clients
          </router-link>
          <router-link
            class="pb-8 cursor-pointer"
            v-if="!isAuthenticated"
            :to="{ name: 'LogIn' }"
          >
            Log In
          </router-link>
          <div class="pb-8 cursor-pointer" v-else @click="onLogout">
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
  data() {
    return {
      isAuthenticated: false
    };
  },
  computed: {
    ...mapGetters({
      isMenuDrawerOpen: 'getIsMenuDrawerOpen'
    })
  },
  created() {
    this.ping().then(response => {
      this.isAuthenticated = response.isAuthenticated;
    });
  },
  methods: {
    ...mapMutations(['toggleMenuDrawer']),
    ...mapActions('auth', ['ping', 'logout']),
    onLogout() {
      this.logout().then(() => {
        this.isAuthenticated = false;
      });
    }
  }
};
</script>
