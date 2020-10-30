<template>
  <FormGroup v-bind="$attrs" :validatorModel="validatorModel">
    <template #control>
      <div class="relative">
        <input
          class="input appearance-none outline-none relative bg-transparent w-full pt-3 pb-2 border-b text-opacity-medium focus:text-opacity-high border-opacity-medium focus:border-opacity-high rounded-none"
          :class="[
            textColor,
            borderColor,
            placeholderColor,
            { filled: value && value.length > 0 }
          ]"
          v-bind="attrs"
          :id="idName"
          :type="type"
          :value="value | trim"
          v-on="inputListeners"
          :placeholder="placeholder || label"
        />
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
    label: {
      type: String,
      default: 'Label'
    },
    placeholder: {
      type: String
    },
    type: {
      type: String,
      default: 'text'
    },
    idName: {
      type: String,
      default: randomId
    },
    theme: {
      type: String,
      default: 'light'
    },
    // update value on input event
    immediateInput: {
      type: Boolean,
      default: false
    }
  },
  filters: {
    trim: function(value) {
      return (value || '').trim();
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
      return this.theme === 'dark' ? 'border-white' : 'border-on-surface';
    }
  },
  methods: {
    onBlur($event) {
      if (!this.value && !$event.target.value) {
        return;
      }
      this.$emit('input', $event.target.value);
    },
    onInput($event) {
      if (this.immediateInput) {
        this.$emit('input', $event.target.value);
      }
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
  @apply text-sm;
  transition: all 0.2s ease-out;
  top: 0;
  opacity: 1;
  display: block;
  z-index: 3;
}

.input:focus::placeholder {
  color: transparent;
}

/* change autofill background to white */
.input:-webkit-autofill,
.input:-webkit-autofill:hover,
.input:-webkit-autofill:focus,
.input:-webkit-autofill:active {
  box-shadow: 0 0 0 30px white inset;
}
</style>
