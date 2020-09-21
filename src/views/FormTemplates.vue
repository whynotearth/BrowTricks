<template>
  <div class="page-content--min-h text-left flex flex-col">
    <TransitionPage>
      <router-view v-on="$listeners" />
    </TransitionPage>
  </div>
</template>

<script>
import TransitionPage from '@/components/TransitionPage';
export default {
  name: 'FormTemplates',
  components: { TransitionPage }
};
</script>
