<template>
  <div
    class="h-14 w-full px-2 sticky top-0 z-40 flex justify-between items-center"
    :class="[background, shadow]"
  >
    <router-link
      v-if="routeBack"
      @click.prevent="$emit('iconClicked')"
      class="cursor-pointer w-10 h-10 flex justify-center items-center"
      :to="routeBack"
    >
      <span class="opacity-high" :class="[iconColor]"><IconBack /></span>
    </router-link>
    <div class="flex-grow">
      <h1 class="tg-h2-mobile">
        {{ appBar.title }}
      </h1>
    </div>
    <div class="tg-color-label-mobile ml-auto">
      <slot name="end" />
    </div>
  </div>
</template>

<script>
import IconBack from '@/assets/icons/arrow-back.svg';

export default {
  name: 'BaseHeader',
  components: { IconBack },
  computed: {
    meta() {
      return this.$route.meta;
    },
    appBar() {
      return this.$route.meta.appBar || {};
    }
  },
  props: {
    routeBack: {
      type: Object
    },
    background: {
      type: String,
      default: 'bg-primary'
    },
    shadow: {
      type: String,
      default: ''
    },
    iconColor: {
      type: String,
      default: 'text-on-primary'
    }
  }
};
</script>
