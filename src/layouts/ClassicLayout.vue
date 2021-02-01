<template>
  <div class="h-full min-h-vh100 flex flex-col">
    <slot name="header" />

    <div
      v-show="loadingGet"
      class="relative flex-grow max-w-6xl mx-auto w-full flex justify-around items-center"
    >
      <BaseSpinner />
    </div>

    <!-- mb-14 for bottom navigation -->
    <div v-show="!loadingGet" class="flex-grow overflow-auto flex flex-col">
      <TransitionPage>
        <slot name="content" />
      </TransitionPage>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseSpinner from '@/components/BaseSpinner';
import TransitionPage from '@/components/TransitionPage';

export default {
  name: 'ClassicLayout',
  components: { TransitionPage, BaseSpinner },
  computed: {
    ...mapGetters('loading', ['loadingGet'])
  }
};
</script>
