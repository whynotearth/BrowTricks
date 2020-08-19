<template>
  <div class="layout-splash text-on-background-image bg-cover bg-no-repeat">
    <!-- loading -->
    <div
      v-show="isLoading"
      class="flex flex-col justify-center items-center min-h-vh100"
    >
      <BaseSpinner />
    </div>
    <div
      v-show="!isLoading"
      class="flex flex-col justify-end items-center min-h-vh100 py-5"
    >
      <div class="flex flex-col max-w-sm mx-auto overflow-auto p-4">
        <div class="mx-auto"><slot name="image" /></div>
        <h1 class="tg-h1-mobile  mb-4">
          <slot name="title" />
        </h1>
        <div v-if="$slots.subtitle" class="tg-body-mobile mb-4">
          <slot name="subtitle" />
        </div>
        <div
          v-if="$slots.link"
          class="tg-body-hyperlink-mobile text-secondary mb-4"
        >
          <slot name="link" />
        </div>
        <div v-if="$slots.primaryCTA" class="mb-4">
          <slot name="primaryCTA" />
        </div>
        <div v-if="$slots.secondaryCTA" class="mb-4">
          <slot name="secondaryCTA" />
        </div>
        <div
          v-if="$slots.rejectCTA"
          class="tg-color-label-mobile text-error mb-4"
        >
          <slot name="rejectCTA" />
        </div>
        <div
          v-if="$slots.tertiaryCTA"
          class="tg-body-hyperlink-mobile text-on-background-image text-opacity-medium mb-4"
        >
          <slot name="tertiaryCTA" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseSpinner from '@/components/BaseSpinner';

export default {
  name: 'SplashLayout',
  components: { BaseSpinner },
  computed: {
    ...mapGetters('loading', ['isLoading'])
  }
};
</script>

<style scoped>
.layout-splash {
  background-image: url('https://res.cloudinary.com/whynotearth/image/upload/v1597845106/BrowTricks/static_v2/background-full-page_gon3ol.png');
}
</style>
