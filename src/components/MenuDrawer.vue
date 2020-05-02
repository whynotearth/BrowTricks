<template>
  <div>
    <div
      class="bg-on-background bg-opacity-medium fixed inset-x-0 top-0 min-h-screen w-full z-20"
      @click="toggleMenuDrawer"
      v-if="isMenuDrawerOpen"
    />
    <transition name="slide">
      <div
        class="bg-white fixed inset-x-0 top-0 min-h-screen w-4/5 z-30 py-8 px-4"
        v-if="isMenuDrawerOpen"
      >
        <div class="flex flex-col tg-h3-mobile text-left">
          <div class="pb-8">
            Home
          </div>
          <div class="pb-8">
            About
          </div>
          <div class="pb-8">
            Services
          </div>
          <div class="pb-8">
            Contact
          </div>
          <div class="pb-8">
            Book Now
          </div>
          <div class="pb-8 text-on-background text-opacity-disabled">
            Terms of Use
          </div>
          <div class="text-on-background text-opacity-disabled">
            Privacy Policy
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'MenuDrawer',
  computed: {
    ...mapGetters(['isMenuDrawerOpen'])
  },
  methods: {
    ...mapMutations(['toggleMenuDrawer'])
  }
};
</script>
