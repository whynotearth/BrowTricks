<template>
  <div
    class="page bg-newbackground min-h-screen flex flex-col text-white text-opacity-medium"
  >
    <header
      class="bg-newsurface z-20 shadow-4dp flex items-center p-4 sticky top-0"
    >
      <!-- icon -->
      <a class="cursor-pointer" @click.prevent="iconClick">
        <IconBack class="text-white mr-2" />
      </a>
      <h1 class="tg-h2-mobile text-opacity-high text-white ml-2">
        {{ currentTitle }}
      </h1>
    </header>

    <!-- loading -->
    <div
      v-show="isLoading"
      class="relative flex-grow max-w-6xl mx-auto w-full flex justify-around items-center"
    >
      <Loading />
    </div>
    <!-- content -->
    <div
      class="relative flex-grow max-w-6xl mx-auto w-full"
      v-show="!isLoading"
    >
      <slot v-if="isVisible" />
    </div>
  </div>
</template>

<script>
import IconBack from '@/assets/icons/arrow-back.svg';
import { mapGetters } from 'vuex';
import Loading from '@/components/Loading';

export default {
  name: 'WithTitleBarLayout',
  components: { IconBack, Loading },
  data: () => ({
    isVisible: false,
    currentTitle: '',
    backRoute: null
  }),
  mounted() {
    this.isVisible = true;
    this.init();
  },
  computed: {
    ...mapGetters('loading', ['isLoading'])
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
