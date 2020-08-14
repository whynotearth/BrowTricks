<template>
  <div class="relative">
    <textarea
      class="input text-on-newbackground text-opacity-high disable-scrollbars appearance-none resize-none outline-none relative bg-transparent rounded h-32 w-full px-4 py-3 border focus:border-2 active:border-2 focus:border-opacity-medium active:border-opacity-medium"
      :class="[
        { filled: value && value.length > 0 },
        error
          ? 'border-error placeholder-error'
          : 'border-on-newbackground border-opacity-disabled'
      ]"
      :id="idName"
      :value="value"
      v-on="inputListeners"
      :placeholder="placeholder || label"
    ></textarea>
    <label
      :for="idName"
      class="label absolute mb-0 top-0 left-0 mt-3 ml-3 cursor-text"
      :class="[
        error ? 'text-error' : 'text-on-newbackground text-opacity-medium',
        labelBg
      ]"
    >
      {{ label }}
    </label>
  </div>
</template>

<script>
import { randomId } from '@/helpers.js';

export default {
  name: 'TextInput',
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: 'Label'
    },
    placeholder: {
      type: String
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
      default: 'bg-newbackground'
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
