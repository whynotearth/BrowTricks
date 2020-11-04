<template>
  <article>
    <header class="flex mb-6 items-center">
      <div class="article-image flex justify-center items-center">
        <img class="max-w-full max-h-full" :src="article.image" alt="" />
      </div>
      <div class="text-center px-4 flex-grow">
        <h2
          class="tg-h2-mobile text-on-background text-opacity-medium"
          v-html="article.title"
        ></h2>
      </div>
    </header>

    <div
      class="tg-body-mobile text-on-background text-opacity-medium"
      v-html="article.content"
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

<style scoped>
.article-image {
  width: 40px;
  height: 40px;
}
</style>
