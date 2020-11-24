<template>
  <ClassicLayout class="bg-background">
    <template #header>
      <HeaderNavigation />
    </template>

    <template #content>
      <div class="mt-8">Coming soon</div>
    </template>
  </ClassicLayout>
</template>

<script>
import HeaderNavigation from '@/components/HeaderNavigation.vue';
export default {
  name: 'Help',
  components: { HeaderNavigation }
};
</script>

<style scoped></style>
