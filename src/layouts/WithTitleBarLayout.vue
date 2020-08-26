<template>
  <div class="page min-h-screen flex flex-col text-white text-opacity-medium">
    <header
      class="bg-primary z-20 shadow-4dp flex flex-row items-center p-4 sticky top-0"
    >
      <!-- icon -->
      <a class="cursor-pointer" @click.prevent="iconClick">
        <IconBack class="text-white mr-2" />
      </a>
      <h1
        class="tg-h2-mobile text-opacity-high flex-grow text-left text-white ml-2"
      >
        {{ currentTitle }}
      </h1>
      <IconOverflowMenu
        v-if="$route.name === 'ClientEdit'"
        class="cursor-pointer self-center"
        @click="showOverFlowMenu = !showOverFlowMenu"
      />
    </header>

    <transition name="slide-in-rounded">
      <div
        class="absolute top-0 right-0 z-50 mr-4 mt-14 p-4 rounded-lg shadow-1dp bg-surface"
        v-if="showOverFlowMenu"
      >
        <ul class="text-primary text-left -my-2">
          <li class="p-2 cursor-pointer" @click="navigateTo('pmu')">
            PMU
          </li>
          <li class="p-2 cursor-pointer" @click="navigateTo('notes')">
            Notes
          </li>
        </ul>
      </div>
    </transition>

    <!-- loading -->
    <div
      v-show="isLoading"
      class="relative flex-grow max-w-6xl mx-auto w-full flex justify-around items-center"
    >
      <BaseSpinner />
    </div>
    <!-- content -->
    <!-- mb-14 for bottom navigation -->
    <div class="relative flex-grow w-full mb-14 pb-6" v-show="!isLoading">
      <slot v-if="isVisible" />
    </div>

    <NavigationBottom v-if="!noNavigation" />
  </div>
</template>

<script>
import IconBack from '@/assets/icons/arrow-back.svg';
import { mapGetters } from 'vuex';
import BaseSpinner from '@/components/BaseSpinner';
import NavigationBottom from '@/components/NavigationBottom';
import IconOverflowMenu from '@/assets/icons/more.svg';

export default {
  name: 'WithTitleBarLayout',
  components: { IconBack, BaseSpinner, NavigationBottom, IconOverflowMenu },
  data: () => ({
    isVisible: false,
    currentTitle: '',
    backRoute: null,
    showOverFlowMenu: false
  }),
  mounted() {
    this.isVisible = true;
    this.init();
  },
  computed: {
    ...mapGetters('loading', ['isLoading']),
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
    },
    navigateTo(value) {
      this.showOverFlowMenu = false;
      if (value === 'notes') {
        this.$router.push({ name: 'ClientNotes' });
      } else if (value === 'pmu') {
        let params = this.$route.params;
        this.$router.push({
          name: 'PmuSign',
          params: { clientId: params.clientId, tenantSlug: params.tenantSlug }
        });
      }
    }
  },
  watch: {
    $route() {
      this.init();
    }
  }
};
</script>

<style scoped>
.slide-in-rounded-enter-active {
  animation: slide-in-blurred-top 0.6s cubic-bezier(0.23, 1, 0.32, 1) both;
}

@keyframes slide-in-blurred-top {
  0% {
    transform: translateY(-1000px) scaleY(2.5) scaleX(0.2);
    transform-origin: 50% 0%;
    filter: blur(40px);
    opacity: 0;
  }
  100% {
    transform: translateY(0) scaleY(1) scaleX(1);
    transform-origin: 50% 50%;
    filter: blur(0);
    opacity: 1;
  }
}
</style>
