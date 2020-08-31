<template>
  <div class="page min-h-screen flex flex-col text-white text-opacity-medium">
    <header
      class="bg-primary z-20 shadow-4dp flex flex-row items-center p-4 sticky top-0"
    >
      <!-- icon -->
      <a
        class="cursor-pointer"
        @click.prevent="iconClick"
        v-if="$route.meta.backRoute"
      >
        <IconBack class="text-white" />
      </a>
      <h1 class="tg-h2-mobile text-opacity-high flex-grow text-white">
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
      <a
        v-click-outside="onClickOutside"
        class="cursor-pointer self-center"
        v-else-if="$route.meta.menuItems"
        @click.prevent="showOverFlowMenu = true"
      >
        <IconOverflowMenu />
      </a>
    </header>

    <transition
      enter-active-class="transition duration-150 ease-out"
      enter-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-100 ease-in"
      leave-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <div
        class="absolute top-0 right-0 z-50 mr-4 mt-14 p-4 rounded-lg shadow-1dp bg-surface"
        v-if="showOverFlowMenu"
      >
        <ul class="text-primary text-left -my-2">
          <li
            class="p-2 cursor-pointer"
            v-for="item in $route.meta.menuItems"
            :key="item.itemName"
            @click="navigateTo(item.routeName)"
          >
            {{ item.itemName }}
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
    <div
      class="relative flex-grow w-full"
      :class="[noNavigation ? '' : 'mb-14 pb-6']"
      v-show="!isLoading"
    >
      <slot v-if="isVisible" />
    </div>

    <NavigationBottom v-if="!noNavigation" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseSpinner from '@/components/BaseSpinner';
import NavigationBottom from '@/components/NavigationBottom';
import IconOverflowMenu from '@/assets/icons/more.svg';
import IconBack from '@/assets/icons/arrow-back.svg';

export default {
  name: 'WithTitleBarLayout',
  components: {
    IconBack,
    BaseSpinner,
    NavigationBottom,
    IconOverflowMenu
  },
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
      this.onClickOutside();
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
      this.onClickOutside();
      let params = this.$route.params;
      this.$router.push({
        name: value,
        params: { clientId: params.clientId, tenantSlug: params.tenantSlug }
      });
    },
    onClickOutside() {
      this.showOverFlowMenu = false;
    }
  },
  watch: {
    $route() {
      this.init();
    }
  }
};
</script>
