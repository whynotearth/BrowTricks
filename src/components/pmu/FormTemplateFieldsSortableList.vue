<template>
  <ul class="list yeahhhhh">
    <slot />
  </ul>
</template>

<script>
import { ContainerMixin } from 'vue-slicksort';

export default {
  mixins: [ContainerMixin],
  name: 'FormTemplateFieldsSortableList'
};
</script>

<style scoped></style>
