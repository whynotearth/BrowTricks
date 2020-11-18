<template>
  <ClassicLayout class="bg-background">
    <template #header>
      <HeaderNavigation />
    </template>

    <template #content>
      <div class="max-w-3xl mx-auto py-10">
        <ContentPricing />
      </div>

      <NavigationFooter />
    </template>
  </ClassicLayout>
</template>

<script>
import HeaderNavigation from '@/components/HeaderNavigation.vue';
import ContentPricing from '@/components/ContentPricing.vue';
import NavigationFooter from '@/components/NavigationFooter.vue';
export default {
  name: 'Pricing',
  components: { HeaderNavigation, ContentPricing, NavigationFooter }
};
</script>

<style scoped></style>
