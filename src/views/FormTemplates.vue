<template>
  <PageContentBoard>
    <TransitionPage>
      <router-view v-on="$listeners" />
    </TransitionPage>
  </PageContentBoard>
</template>

<script>
import TransitionPage from '@/components/TransitionPage';
import PageContentBoard from '@/components/PageContentBoard';
export default {
  name: 'FormTemplates',
  components: { TransitionPage, PageContentBoard }
};
</script>
