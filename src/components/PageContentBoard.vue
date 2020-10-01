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
  min-height: calc(
    100 * var(--vh) - var(--header-height) - var(--content-board-spacer)
  );
}
.has-spacer {
  padding-bottom: var(--navigation-height);
  margin-bottom: var(--content-board-spacer);
}
</style>
