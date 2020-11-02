<template>
  <div class="fixed inset-0 z-100">
    <div
      class="bg-brand5 h-full flex flex-col justify-center items-center select-none"
    >
      <div class="max-w-xl w-full h-full">
        <img
          src="https://res.cloudinary.com/whynotearth/image/upload/v1598336510/BrowTricks/static_v2/brandcover_lo3i0l.jpg"
          class="h-vh100 object-cover w-full"
        />
      </div>
      <div class="absolute w-full h-full flex justify-center items-end pb-20">
        <BaseSpinner borderColor="border-secondary" />
      </div>
    </div>
  </div>
</template>

<script>
import BaseSpinner from '@/components/BaseSpinner.vue';
import noPageScrollbarMixin from '@/utils/noPageScrollbarMixin';
export default {
  name: 'SplashOverlayContent',
  // note: we use a mixin
  mixins: [noPageScrollbarMixin],
  components: { BaseSpinner }
};
</script>
