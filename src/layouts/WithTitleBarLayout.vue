<template>
  <div class="page h-full flex flex-col bg-background">
    <div class="z-20 bg-primary shadow-4dp flex items-center p-4">
      <IconBack class="text-white mr-2" />
      <h1 class="tg-h2-mobile text-opacity-high text-white">Title</h1>
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
  name: 'LayoutFixedScrollable',
  components: { IconBack },
  data: () => ({
    isVisible: false
  }),
  mounted() {
    this.isVisible = true;
  }
};
</script>
