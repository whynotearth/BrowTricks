<template>
  <div
    class="h-14 w-full px-2 sticky top-0 z-40 flex justify-between items-center text-white"
    :class="[background]"
  >
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

    <div class="tg-color-label-mobile ml-auto">
      <router-link
        class="block py-1 px-2"
        v-if="action"
        :to="action.route"
        :title="action.title"
      >
        <component
          :is="action.icon"
          class="text-background text-opacity-high fill-current"
        />
      </router-link>
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
      return this.appBar.backRoute;
    },
    action() {
      return this.appBar.action;
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
