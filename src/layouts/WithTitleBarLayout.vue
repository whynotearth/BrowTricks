<template>
  <div
    class="page bg-newbackground min-h-screen flex flex-col text-white text-opacity-medium"
  >
    <div
      class="bg-newsurface z-20 shadow-4dp flex items-center p-4 sticky top-0"
    >
      <!-- icon -->
      <a class="cursor-pointer" @click.prevent="iconClick">
        <IconBack class="text-white mr-2" />
      </a>
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
    currentTitle: '',
    backRoute: null
  }),
  mounted() {
    this.isVisible = true;
    this.init();
  },
  methods: {
    init() {
      this.handleBackRoute();
      this.handleTitle();
    },
    iconClick() {
      this.$router.push(this.backRoute);
    },
    handleTitle() {
      this.currentTitle = this.$route.meta.title;
      // listen for title updates
      this.$on('layoutTitle', data => {
        this.currentTitle = data;
      });
    },
    handleBackRoute() {
      this.backRoute = this.$route.meta.backRoute;
      // listen for back route updates
      this.$on('layoutBackRoute', data => {
        this.backRoute = data;
      });
    }
  },
  watch: {
    $route() {
      this.init();
    }
  }
};
</script>
