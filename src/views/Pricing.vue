<template>
  <div>
    <div
      class="max-w-3xl mx-auto py-10 min-h-vh100--without-footernav-n-header"
    >
      <ContentPricing />
    </div>

    <NavigationFooter />
  </div>
</template>

<script>
import ContentPricing from '@/components/ContentPricing.vue';
import NavigationFooter from '@/components/NavigationFooter.vue';
export default {
  name: 'Pricing',
  components: { ContentPricing, NavigationFooter }
};
</script>

<style scoped></style>
