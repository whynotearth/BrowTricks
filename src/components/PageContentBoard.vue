<template functional>
  <div
    class="content-board text-left w-full rounded-t-xl"
    :class="[
      props.classNames,
      props.background,
      props.hasSpacer ? 'has-spacer' : ''
    ]"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'PageContentBoard',
  props: {
    classNames: {
      default: ''
    },
    background: {
      default: 'bg-background'
    },
    hasSpacer: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style scoped>
.content-board {
  min-height: calc(100 * var(--vh) - var(--header-height));
}

/* or hsa-navigation-bottom */
.has-spacer {
  padding-bottom: calc(var(--navigation-height) + var(--content-board-spacer));
}
</style>
