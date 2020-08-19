<template>
  <div class="text-on-surface">
    <div
      class="bg-on-background bg-opacity-medium fixed inset-x-0 top-0 min-h-screen w-full z-10"
      @click="toggleDrawer"
      v-if="isDrawerOpen"
    ></div>
    <transition name="slide">
      <div
        class="bg-white fixed overflow-auto inset-y-0 left-0 z-20 w-9/12 max-w-sm tg-h3-mobile text-left py-8 narrow-scrollbar has-light-bg overscroll-none"
        v-if="isDrawerOpen"
      >
        <div class="px-4">
          <slot name="content" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'MenuDrawerCustomer',
  mounted() {
    this.isDrawerOpenUpdate(false);
  },
  computed: {
    ...mapGetters('global', ['isDrawerOpen']),
    tenantSlug() {
      return this.$route.params.tenantSlug;
    }
  },
  methods: {
    ...mapActions('global', ['isDrawerOpenUpdate']),
    ...mapActions('auth', ['logout']),
    toggleDrawer() {
      this.isDrawerOpenUpdate(!this.isDrawerOpen);
    }
  }
};
</script>
