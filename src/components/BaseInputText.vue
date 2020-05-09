<template>
  <div class="relative tg-body-mobile w-full">
    <input
      :id="idName"
      :type="type"
      placeholder=" "
      class="input border-b w-full appearance-none outline-none bg-transparent"
      :class="inputStyle"
    />
    <label
      :for="idName"
      class="label absolute inset-y-0 left-0 transition-all duration-200"
    >
      <slot />
    </label>
    <div
      class="line border-t w-full h-px transition-all duration-200"
      :lineStyle="lineStyle"
    />
  </div>
</template>

<script>
import { randomId } from '@/helpers.js';

export default {
  name: 'TextInput',
  props: {
    idName: {
      type: String,
      default: randomId
    },
    type: {
      type: String,
      default: 'text'
    },
    inputStyle: {
      type: Array
    },
    lineStyle: {
      type: Array
    }
  }
};
</script>
