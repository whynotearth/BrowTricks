<template functional>
  <div class="content-board text-left w-full bg-background rounded-t-xl">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'PageContentBoard'
};
</script>

<style scoped>
.content-board {
  min-height: calc(
    100 * var(--vh) - var(--header-height) - var(--content-board-spacer)
  );
  margin-bottom: var(--content-board-spacer);
}
</style>
