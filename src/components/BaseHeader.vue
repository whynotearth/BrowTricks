<template>
  <div
    class="h-14 w-full px-2 py-5 top-0 z-10 flex justify-between items-center bg-newbackground"
  >
    <a
      v-if="$slots.icon"
      @click.prevent="$emit('iconClicked')"
      class="cursor-pointer w-10 h-10 flex justify-center items-center"
    >
      <slot name="icon" />
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
  name: 'BaseHeader'
};
</script>
