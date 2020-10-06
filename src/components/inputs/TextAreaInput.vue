<template>
  <FormGroup
    v-bind="$attrs"
    :validatorModel="validatorModel"
    class="flex flex-col"
  >
    <template #control>
      <div class="relative" :class="[fillHeight ? 'h-full' : '']">
        <textarea
          class="block input appearance-none outline-none relative bg-transparent w-full py-3 border-b text-opacity-medium focus:text-opacity-high border-opacity-medium focus:border-opacity-high tg-body-mobile rounded-none"
          :class="[
            fillHeight ? 'h-full' : '',
            textColor,
            borderColor,
            placeholderColor,
            { filled: value && value.length > 0 }
          ]"
          v-bind="attrs"
          :id="idName"
          :value="value"
          v-on="inputListeners"
          :placeholder="placeholder || label"
          :rows="rows"
        ></textarea>
        <label
          :for="idName"
          class="label absolute mb-0 top-0 left-0 mt-3 cursor-text"
          :class="[labelColor]"
        >
          {{ label }}
        </label>
      </div>
    </template>

    <template #error>
      <div class="text-error tg-body-mobile mt-2" v-if="validatorModel.$error">
        <slot />
      </div>
    </template>
  </FormGroup>
</template>

<script>
import { randomId } from '@/helpers.js';
import FormGroup from '@/components/inputs/FormGroup.vue';

export default {
  name: 'TextInput',
  components: { FormGroup },
  props: {
    validatorModel: {
      type: Object,
      default: () => ({})
    },
    attrs: {
      type: Object,
      default: () => {}
    },
    value: {
      type: [String, Number],
      default: null
    },
    rows: {
      type: String,
      default: '3'
    },
    label: {
      type: String,
      default: 'Label'
    },
    placeholder: {
      type: String
    },
    idName: {
      type: String,
      default: randomId
    },
    theme: {
      type: String,
      default: 'light'
    },
    fillHeight: {
      type: Boolean,
      default: false
    },
    // update value on input event
    immediateInput: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    inputListeners: function() {
      return Object.assign({}, this.$listeners, {
        blur: this.onBlur,
        input: this.onInput
      });
    },
    labelColor() {
      if (this.validatorModel.$error) {
        return 'text-error';
      }
      return this.theme === 'dark'
        ? 'text-on-surface text-opacity-medium'
        : 'text-on-background';
    },
    textColor() {
      return this.theme === 'dark' ? 'text-on-surface' : 'text-on-background';
    },
    placeholderColor() {
      if (this.validatorModel.$error) {
        return 'placeholder-error';
      }
      return '';
    },
    borderColor() {
      if (this.validatorModel.$error) {
        return 'border-error';
      }
      return this.theme === 'dark' ? 'border-white' : 'border-black';
    }
  },
  methods: {
    onBlur($event) {
      this.$emit('input', $event.target.value);
    },
    onInput($event) {
      this.$emit('input', $event.target.value);
    }
  }
};
</script>

<style scoped>
.input {
  transition: border 0.2s ease-in-out, color 0.2s ease-in-out;
  z-index: 2;
}
.input[readonly] {
  cursor: not-allowed;
  @apply text-opacity-medium;
}

.label {
  transition: all 0.2s ease-out;
  transition: all 200ms;
  opacity: 0;
  padding: 0;
  z-index: 1;
}

.input:focus + .label,
.input:active + .label,
.input.filled + .label {
  font-size: 0.75rem;
  transition: all 0.2s ease-out;
  top: 0;
  opacity: 1;
  display: block;
  z-index: 3;
}

.input:focus::placeholder {
  color: transparent;
}
</style>
