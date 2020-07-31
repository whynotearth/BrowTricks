<template>
  <div
    class="h-14 w-full p-5 sticky top-0 z-10 flex justify-between items-center bg-newbackground"
  >
    <a
      v-if="$slots.icon"
      @click.prevent="$emit('iconClicked')"
      class="cursor-pointer"
    >
      <slot name="icon" />
    </a>
    <div v-if="$slots.content" class="tg-h2-mobile">
      <slot name="content" />
    </div>
    <div class="tg-color-label-mobile ml-auto">
      <slot name="end" />
    </div>

    <!-- <slot name="menu-drawer" /> -->
  </div>
</template>

<script>
export default {
  name: 'BaseHeader'
};
</script>
