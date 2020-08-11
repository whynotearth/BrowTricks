<template>
  <div class="relative" :class="[margin]">
    <input
      class="input text-opacity-high appearance-none outline-none relative bg-transparent rounded w-full px-4 py-3 border border-opacity-medium focus:border-opacity-high"
      :class="[
        textColor,
        borderColor,
        placeholderColor,
        { filled: value && value.length > 0 }
      ]"
      v-bind="attrs"
      :id="idName"
      :type="type"
      :min="min"
      :step="step"
      :value="value"
      v-on="inputListeners"
      :placeholder="placeholder || label"
    />
    <label
      :for="idName"
      class="label absolute mb-0 top-0 left-0 mt-3 ml-3 cursor-text"
      :class="[labelColor, labelBg]"
    >
      {{ label }}
    </label>
    <div class="ml-4 mt-2" v-if="error">
      <slot />
    </div>
  </div>
</template>

<script>
import { randomId } from '@/helpers.js';

export default {
  name: 'TextInput',
  props: {
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
    min: {
      type: [String, Number],
      default: 0
    },
    step: {
      type: String,
      default: '1'
    },
    error: {
      type: Boolean,
      default: false
    },
    idName: {
      type: String,
      default: randomId
    },
    theme: {
      type: String,
      // TODO: dark
      default: 'light'
    },
    margin: {
      type: String,
      default: 'mb-4'
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
      if (this.error) {
        return 'text-error';
      }
      return this.theme === 'dark'
        ? 'text-on-newbackground'
        : 'text-on-background';
    },
    labelBg() {
      return this.theme === 'dark' ? 'bg-newsurface' : 'bg-background';
    },
    textColor() {
      return this.theme === 'dark'
        ? 'text-on-newbackground'
        : 'text-on-background';
    },
    placeholderColor() {
      if (this.error) {
        return 'placeholder-error';
      }
      return '';
    },
    borderColor() {
      if (this.error) {
        return 'border-error';
      }
      return this.theme === 'dark' ? 'border-white' : 'border-black';
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
  transition: border 0.2s ease-in-out;
  z-index: 2;
}
.input[readonly] {
  @apply text-opacity-medium;
}

.label {
  transition: all 0.2s ease-out;
  transition: all 200ms;
  opacity: 0;
  padding: 0 5px;
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
