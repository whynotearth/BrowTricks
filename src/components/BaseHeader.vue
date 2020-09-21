<template>
  <div
    class="h-14 w-full px-2 py-5 sticky top-0 z-40 flex-row justify-center items-center"
    :class="[background, shadow, hasNoise ? 'has-noise' : '']"
  >
    <a
      v-if="$slots.icon"
      @click.prevent="$emit('iconClicked')"
      class="cursor-pointer w-10 h-10 flex justify-center items-center"
    >
      <span class="opacity-high" :class="[iconColor]"><slot name="icon"/></span>
    </a>
    <div v-if="$slots.content" class="tg-h2-mobile">
      <slot name="content" />
    </div>
    <div class="tg-color-label-mobile ml-auto">
      <slot name="end" />
    </div>

    <slot name="menu-drawer" />
  </div>
</template>

<script>
export default {
  name: 'BaseHeader',
  props: {
    theme: {
      type: String,
      default: 'dark'
    },
    hasNoise: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    background() {
      return this.theme === 'dark' ? 'bg-primary' : 'bg-background';
    },
    shadow() {
      return this.theme === 'dark' ? 'shadow-4dp' : '';
    },
    iconColor() {
      return this.theme === 'dark' ? 'text-background' : 'text-primary';
    }
  }
};
</script>
