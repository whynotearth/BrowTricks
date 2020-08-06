<template>
  <div
    class="page bg-newbackground min-h-screen flex flex-col text-white text-opacity-medium"
  >
    <div
      class="bg-newsurface z-20 shadow-4dp flex items-center p-4 sticky top-0"
    >
      <IconBack class="text-white mr-2" />
      <h1 class="tg-h2-mobile text-opacity-high text-white ml-2">
        {{ currentTitle }}
      </h1>
    </div>
    <div class="z-10 relative flex-grow max-w-6xl mx-auto w-full">
      <transition name="fadeslow" mode="out-in">
        <slot v-if="isVisible" />
      </transition>
    </div>
  </div>
</template>

<script>
import IconBack from '@/assets/icons/arrow-back.svg';

export default {
  name: 'WithTitleBarLayout',
  components: { IconBack },
  data: () => ({
    isVisible: false,
    currentTitle: ''
  }),
  mounted() {
    this.isVisible = true;
    this.currentTitle = this.$route.meta.title;
    console.log('this.title', this.currentTitle);
    this.$on('layoutTitle', data => {
      this.currentTitle = data;
    });
  }
};
</script>
