<template>
  <div class="relative">
    <MaterialInput
      v-model.trim="validatorModel.$model"
      v-on="$listeners"
      v-bind="$attrs"
      type="password"
      label="Password"
      :attrs="{ autocomplete: 'current-password', enterkeyhint: 'send' }"
    >
      <p v-if="!validatorModel.required">
        Password is required
      </p>
    </MaterialInput>

    <button type="button">show</button>
  </div>
</template>

<script>
import MaterialInput from '@/components/inputs/MaterialInput.vue';
export default {
  name: 'PasswordInput',
  components: { MaterialInput },
  props: {
    validatorModel: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>

<style scoped></style>
