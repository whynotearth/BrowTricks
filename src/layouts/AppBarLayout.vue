<template>
  <div class="min-h-vh100 w-full bg-primary flex flex-col">
    <BaseHeader v-if="appBar" />

    <!-- loading -->
    <div
      v-show="loadingGet"
      class="relative flex-grow max-w-6xl mx-auto w-full flex justify-around items-center"
    >
      <BaseSpinner />
    </div>
    <!-- content -->
    <!-- mb-14 for bottom navigation -->
    <div class="relative flex-grow w-full" v-show="!loadingGet">
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
import { mapGetters } from 'vuex';

export default {
  name: 'AppBarLayout',
  components: {
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
  }
};
</script>
