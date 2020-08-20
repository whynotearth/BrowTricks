<template>
  <div @click.stop class="rounded-lg w-full p-8 sm:w-128 bg-surface mx-4">
    <h6 v-if="title" class="tg-h3-mobile text-on-surface text-opacity-high">
      {{ title }}
    </h6>
    <div class="flex justify-end" :class="[title ? 'mt-8' : '']">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseDialog',
  props: {
    title: {
      type: String
    }
  }
};
</script>

<style scoped></style>
