<template>
  <div :class="[margin]">
    <!-- control -->
    <slot name="control" />

    <!-- client errors -->
    <slot name="error" />

    <!-- server errors -->
    <div
      class="text-error tg-body-mobile mt-2"
      v-if="!validatorModel.$dirty && serverErrors.length > 0"
    >
      <p class="mb-4" v-for="serverError in serverErrors" :key="serverError">
        {{ serverError }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormGroup',
  props: {
    serverErrors: {
      type: Array,
      default: () => []
    },
    validatorModel: {
      type: Object,
      default: () => ({})
    },
    margin: {
      type: String,
      default: 'mb-6'
    }
  }
};
</script>
