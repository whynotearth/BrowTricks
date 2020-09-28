<template functional>
  <div
    class="content-board text-left w-full rounded-t-xl"
    :class="[props.background]"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'PageContentBoard',
  props: {
    background: {
      default: 'bg-background'
    }
  }
};
</script>

<style scoped>
.content-board {
  min-height: calc(
    100 * var(--vh) - var(--header-height) - var(--content-board-spacer)
  );
  padding-bottom: var(--navigation-height);
  margin-bottom: var(--content-board-spacer);
}
</style>
