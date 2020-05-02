<template>
  <div class="relative tg-body-mobile">
    <input
      :id="idName"
      type="text"
      placeholder=" "
      class="input border-b border-current w-full appearance-none outline-none bg-transparent"
    />
    <label
      :for="idName"
      class="label absolute inset-y-0 left-0 transition-all duration-200"
    >
      {{ label }}
    </label>
    <div
      class="line border-t border-current w-full h-px transition-all duration-200"
    />
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    label: {
      type: String,
      required: true
    },
    idName: {
      type: String,
      required: true
    }
  }
};
</script>
