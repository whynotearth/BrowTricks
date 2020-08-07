<template>
  <div class="relative" :class="[margin]">
    <input
      class="input text-on-background text-opacity-high appearance-none outline-none relative bg-transparent rounded w-full px-4 py-3 border focus:border-2 active:border-2 focus:border-opacity-medium active:border-opacity-medium"
      :class="[
        { filled: value && value.length > 0 },
        error
          ? 'border-error placeholder-error'
          : 'border-on-background border-opacity-disabled'
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
      :class="[
        error ? 'text-error' : 'text-on-background text-opacity-medium',
        labelBg
      ]"
    >
      {{ label }}
    </label>
    <div class="ml-4 mt-2" v-if="error">
      <slot />
    </div>
    <slot name="end" />
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
      default: Boolean
    },
    idName: {
      type: String,
      default: randomId
    },
    labelBg: {
      type: String,
      default: 'bg-background'
    },
    margin: {
      type: String,
      default: 'mb-4'
    }
  },
  computed: {
    inputListeners: function() {
      return Object.assign({}, this.$listeners, {
        blur: this.onBlur,
        input: this.onInput
      });
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
