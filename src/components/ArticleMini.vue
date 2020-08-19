<template>
  <article class="mb-10">
    <h2 class="tg-h2-mobile text-on-background text-opacity-high mb-6 text-center">
      <slot name="title" />
    </h2>

    <div class="tg-body-mobile text-on-background text-opacity-medium text-left">
      <slot name="content" />
    </div>
  </article>
</template>

<script>
export default {
  name: 'BaseArticleMini'
};
</script>
