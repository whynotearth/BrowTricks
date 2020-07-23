<template>
  <div v-html="content"></div>
</template>

<script>
export default {
  name: 'StepContentHTML',
  props: {
    content: String
  }
};
</script>

<style scoped></style>
