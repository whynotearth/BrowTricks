<template functional>
  <article class="px-2">
    <header class="flex mb-6 items-center">
      <div class="text-center px-4 flex-grow">
        <h2
          class="tg-h1-mobile text-on-background text-opacity-medium"
          v-html="props.article.title"
        ></h2>
      </div>
    </header>

    <div
      class="tg-body-mobile text-on-background text-opacity-medium"
      v-html="props.article.content"
    ></div>
  </article>
</template>

<script>
export default {
  name: 'ArticleMini',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
};
</script>
