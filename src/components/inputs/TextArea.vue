<template>
  <div class="relative tg-body-mobile">
    <textarea
      :id="idName"
      class="input w-full appearance-none outline-none disable-scrollbar resize-none bg-transparent border-b border-current"
      placeholder=" "
      rows="4"
    />
    <label
      :for="idName"
      class="label absolute top-0 left-0 transition-all duration-200"
    >
      {{ label }}
    </label>
    <div
      class="line absolute inset-x-0 bottom-1 border-t border-current w-full h-px transition-all duration-200"
    />
  </div>
</template>

<script>
export default {
  name: 'TextAreaInput',
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

<style scoped>
.disable-scrollbars::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* Chrome/Safari/Webkit */
}

.disable-scrollbars {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
</style>
