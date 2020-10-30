<template>
  <div
    class="h-full min-h-vh100 layout--splash text-on-background bg-cover bg-no-repeat bg-secondary sm:bg-none"
    :style="{ 'background-image': `url(${backgroundImage})` }"
  >
    <!-- loading -->
    <div
      v-show="loadingGet"
      class="flex flex-col justify-center items-center min-h-vh100"
    >
      <BaseSpinner />
    </div>

    <!-- main content -->
    <div
      v-show="!loadingGet"
      class="flex flex-col justify-between items-center min-h-vh100 py-5"
    >
      <div class="flex flex-col max-w-sm mx-auto overflow-auto p-4">
        <!-- slot: image -->
        <div class="mx-auto"><slot name="image" /></div>
        <p class="tg-h2-mobile text-on-background mb-4" v-if="$slots.pretitle">
          <slot name="pretitle" />
        </p>
        <h1 class="tg-h1-mobile text-on-background  mb-4 uppercase">
          <slot name="title" />
        </h1>
        <div v-if="$slots.subtitle" class="tg-body-mobile mb-4">
          <slot name="subtitle" />
        </div>
      </div>

      <!-- slots:
        link, primaryCTA, secondaryCTA, rejectCTA, tertiaryCTA
      -->
      <div class="flex flex-col max-w-sm mx-auto overflow-auto p-4">
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
          class="tg-body-hyperlink-mobile text-on-background text-opacity-medium mb-4"
        >
          <slot name="tertiaryCTA" />
        </div>

        <div
          v-if="$slots.moreContent"
          class="text-on-background text-opacity-high tg-body-mobile"
        >
          <slot name="moreContent" />
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
    ...mapGetters('loading', ['loadingGet'])
  },
  props: {
    backgroundImage: {
      type: String,
      default:
        'https://res.cloudinary.com/whynotearth/image/upload/v1600846678/BrowTricks/static_v2/bg-pattern-2_rfldwv.png'
    }
  }
};
</script>

<style scoped>
.layout--splash {
  background-size: cover;
  background-position: center;
}
</style>
