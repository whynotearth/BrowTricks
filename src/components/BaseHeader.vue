<template>
  <div class="w-full sticky top-0 z-40" :class="[background]">
    <div class="h-14 flex justify-between items-center text-white w-full px-2">
      <router-link
        v-if="backRoute"
        @click.prevent="$emit('iconClicked')"
        class="cursor-pointer w-10 h-10 flex justify-center items-center"
        :to="backRoute"
      >
        <span class="opacity-high text-white"><IconBack /></span>
      </router-link>

      <slot name="title">
        <div class="flex-grow">
          <h1 class="tg-h2-mobile">
            {{ appBar.title }}
          </h1>
        </div>
      </slot>

      <div class="ml-auto">
        <slot name="action" />
      </div>
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
    },
    backRoute() {
      return this.$route.query.backPath || this.appBar.backRoute;
    }
  },
  props: {
    background: {
      type: String,
      default: 'bg-primary'
    }
  }
};
</script>
