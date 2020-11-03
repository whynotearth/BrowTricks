<template>
  <div class="relative">
    <MaterialInput
      v-model="validatorModel.$model"
      v-on="$listeners"
      v-bind="$attrs"
      :type="fieldType"
      :label="label"
      :attrs="{
        autocomplete: isNew ? 'new-password' : 'current-password',
        enterkeyhint: 'send'
      }"
      :validatorModel="validatorModel"
    >
      <slot></slot>
    </MaterialInput>

    <button
      :aria-label="`${toggleText} password`"
      class="type-toggle focus:outline-none border-none absolute right-0 top-0 z-10 uppercase tg-caption-mobile"
      @click="toggleType"
      type="button"
    >
      {{ toggleText }}
    </button>
  </div>
</template>

<script>
import MaterialInput from '@/components/inputs/MaterialInput.vue';
export default {
  name: 'PasswordInput',
  components: { MaterialInput },
  data: () => ({
    fieldType: 'password'
  }),
  computed: {
    toggleText() {
      return this.fieldType === 'password' ? 'Show' : 'Hide';
    }
  },
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
  },
  methods: {
    toggleType() {
      console.log('show/hide', this.fieldType);
      this.fieldType = this.fieldType === 'password' ? 'text' : 'password';
    }
  }
};
</script>

<style scoped>
.type-toggle {
  transform: translateY(16px);
}
</style>
