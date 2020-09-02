<template>
  <div class="w-full lg:max-w-full flex lg:flex">
    <div
      class="w-full mx-10 block cursor-pointer bg-surface shadow-1dp py-6 px-4 rounded-lg"
    >
      <slot name="header"></slot>
      <br />
      <slot name="content"></slot>
      <slot></slot>
      <br />
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component({
  name: 'BaseCard'
})
export default class extends Vue {}
</script>
