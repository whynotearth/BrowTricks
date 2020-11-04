<template>
  <PageContentBoard :hasSpacer="false">
    <div
      class="min-h-vh100--without-header flex flex-col justify-center items-center"
    >
      <BaseSpinner borderColor="border-primary" classNames="spinner" />
    </div>
  </PageContentBoard>
</template>

<script>
import { mapActions } from 'vuex';
import BaseSpinner from '@/components/BaseSpinner.vue';
import PageContentBoard from '@/components/PageContentBoard.vue';
export default {
  name: 'AuthLogout',
  components: { BaseSpinner, PageContentBoard },
  created() {
    this.logout();
  },
  methods: {
    ...mapActions('auth', ['logout'])
  }
};
</script>

<style scoped></style>
