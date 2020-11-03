<template>
  <div class="relative">
    <MaterialInput
      v-model="validatorModel.$model"
      v-on="$listeners"
      v-bind="$attrs"
      type="password"
      :label="label"
      :attrs="{
        autocomplete: isNew ? 'new-password' : 'current-password',
        enterkeyhint: 'send'
      }"
      :validatorModel="validatorModel"
    >
      <slot></slot>
    </MaterialInput>

    <!-- <button type="button">show</button> -->
  </div>
</template>

<script>
import MaterialInput from '@/components/inputs/MaterialInput.vue';
export default {
  name: 'PasswordInput',
  components: { MaterialInput },
  props: {
    label: {
      type: String,
      default: 'Password'
    },
    isNew: {
      type: Boolean,
      default: false
    },
    validatorModel: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>

<style scoped></style>
