<template>
  <div class="text-left" v-html="content"></div>
</template>

<script>
export default {
  name: 'StepContentHtml',
  props: {
    content: String
  }
};
</script>

<style scoped></style>
