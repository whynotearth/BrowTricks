<template>
  <div class="max-w-sm mx-auto pt-4 px-4">
    <Button
      :to="{ name: 'PMUFlowQuestions' }"
      class="mb-4"
      title="Text to (510) 123-1234"
      :isRounded="true"
      :isRipple="false"
    />
    <Button
      :to="{ name: 'PMUFlowQuestions' }"
      class="mb-4"
      title="Complete in Person"
      :isRounded="true"
      :isRipple="false"
    />
  </div>
</template>

<script>
import Button from '@/components/Button.vue';
export default {
  name: 'PMUFlowOptions',
  components: { Button },
  beforeCreate() {
    this.$parent.$emit('layoutTitle', 'Paul - PMU Form');
  }
};
</script>

<style scoped></style>
