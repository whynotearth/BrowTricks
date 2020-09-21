<template>
  <div
    class="h-full min-h-vh100 page flex flex-col text-on-background text-opacity-high"
  >
    <header
      class="bg-primary z-20 shadow-4dp flex flex-row items-center p-4 sticky top-0"
    >
      <!-- icon -->
      <a
        class="cursor-pointer"
        @click.prevent="iconClick"
        v-if="$route.meta.backRoute"
      >
        <IconBack class="text-on-primary" />
      </a>

      <h1 class="tg-h2-mobile text-opacity-high flex-grow text-on-primary">
        {{ currentTitle }}
      </h1>

      <router-link
        :aria-labelledby="$route.meta.layoutAction.title"
        :title="$route.meta.layoutAction.title"
        :to="$route.meta.layoutAction.route"
        class="cursor-pointer self-center"
        v-if="$route.meta.layoutAction"
      >
        <component
          :is="$route.meta.layoutAction.icon"
          class="fill-current text-on-primary text-opacity-high w-6 h-6"
        />
      </router-link>
    </header>

    <!-- loading -->
    <div
      v-show="loadingGet"
      class="relative flex-grow max-w-6xl mx-auto w-full flex justify-around items-center"
    >
      <BaseSpinner />
    </div>
    <!-- content -->
    <!-- mb-14 for bottom navigation -->
    <div
      class="relative flex-grow w-full"
      :class="[noNavigation ? '' : 'navigation-spacer']"
      v-show="!loadingGet"
    >
      <TransitionPage>
        <slot />
      </TransitionPage>
    </div>

    <NavigationBottom v-if="!noNavigation" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseSpinner from '@/components/BaseSpinner';
import NavigationBottom from '@/components/NavigationBottom';
import TransitionPage from '@/components/TransitionPage';
import IconOverflowMenu from '@/assets/icons/more.svg';
import IconBack from '@/assets/icons/arrow-back.svg';
import eventBus from '@/utils/eventBus.js';

export default {
  name: 'WithTitleBarLayout',
  components: {
    TransitionPage,
    IconBack,
    BaseSpinner,
    NavigationBottom,
    IconOverflowMenu
  },
  data: () => ({
    currentTitle: '',
    backRoute: null
  }),
  mounted() {
    this.init();
  },
  computed: {
    ...mapGetters('loading', ['loadingGet']),
    noNavigation() {
      return this.$route.matched.some(route => route.meta.noNavigation);
    }
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
      eventBus.$on('layoutTitle', data => {
        this.currentTitle = data;
      });
    },
    handleBackRoute() {
      this.backRoute = this.$route.meta.backRoute;
      // listen for back route updates
      eventBus.$on('layoutBackRoute', data => {
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
