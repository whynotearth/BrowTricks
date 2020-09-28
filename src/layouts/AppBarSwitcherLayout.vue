<template>
  <div
    class="min-h-vh100 w-full flex flex-col"
    :class="[!meta.noNavigation ? 'has-navigation' : '']"
  >
    <BaseHeader v-if="appBar" background="bg-background">
      <template #title>
        <div
          class="flex flex-grow justify-center"
          v-click-outside="closeDropDownSheet"
        >
          <div
            class="flex cursor-pointer"
            @click.stop="showSwitcher = !showSwitcher"
          >
            <h1 class="tg-h2-mobile">
              {{ appBar.title }}
            </h1>
            <ArrowDropDown class="text-on-primary fill-current" />
          </div>

          <div
            @click.stop
            class="absolute inset-x-0 top-0 mt-12 max-w-md mx-auto"
            v-if="showSwitcher"
          >
            <portal-target name="SwitcherBar"></portal-target>
          </div>
        </div>
      </template>
    </BaseHeader>

    <!-- loading -->
    <div
      v-show="loadingGet"
      class="relative flex-grow max-w-6xl mx-auto w-full flex justify-around items-center"
    >
      <BaseSpinner borderColor="border-primary" classNames="spinner" />
    </div>
    <!-- content -->
    <!-- mb-14 for bottom navigation -->
    <div class="content-wrapper relative flex-grow w-full" v-show="!loadingGet">
      <TransitionPage>
        <router-view />
      </TransitionPage>
    </div>

    <NavigationBottom v-if="!meta.noNavigation" />
  </div>
</template>

<script>
import BaseHeader from '@/components/BaseHeader.vue';
import NavigationBottom from '@/components/NavigationBottom.vue';
import TransitionPage from '@/components/TransitionPage.vue';
import BaseSpinner from '@/components/BaseSpinner.vue';
import ArrowDropDown from '@/assets/icons/arrow-drop-down.svg';
import { mapGetters } from 'vuex';

export default {
  name: 'AppBarLayout',
  data: () => ({
    showSwitcher: false
  }),
  components: {
    ArrowDropDown,
    BaseSpinner,
    BaseHeader,
    NavigationBottom,
    TransitionPage
  },
  computed: {
    ...mapGetters('loading', ['loadingGet']),
    appBar() {
      return this.$route.meta.appBar;
    },
    meta() {
      return this.$route.meta;
    }
  },
  methods: {
    init() {
      this.closeDropDownSheet();
    },
    closeDropDownSheet() {
      this.showSwitcher = false;
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
.has-navigation /deep/ .spinner {
  position: relative;
  top: calc(-1 * var(--navigation-height) / 2);
}
</style>
