<template>
  <div class="text-left">
    <TransitionPage>
      <router-view v-on="$listeners" />
    </TransitionPage>
  </div>
</template>

<script>
import TransitionPage from '@/components/TransitionPage.vue';
export default {
  name: 'FormTemplateItem',
  components: { TransitionPage }
};
</script>
