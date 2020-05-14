<template>
  <div class="relative tg-body-mobile w-full">
    <textarea
      :id="idName"
      class="input w-full appearance-none outline-none disable-scrollbars resize-none bg-transparent border-b"
      placeholder=" "
      rows="4"
      :textAreaStyle="textAreaStyle"
    />
    <label
      :for="idName"
      class="label absolute top-0 left-0 transition-all duration-200"
    >
      <slot />
    </label>
    <div
      class="line absolute top-32 border-t-2 w-full h-px transition-all duration-200"
      :lineStyle="lineStyle"
    />
  </div>
</template>

<script>
import { randomId } from '@/helpers.js';

export default {
  name: 'TextAreaInput',
  props: {
    idName: {
      type: String,
      default: randomId
    },
    textAreaStyle: {
      type: Array
    },
    lineStyle: {
      type: Array
    }
  }
};
</script>
