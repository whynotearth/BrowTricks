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
      class="absolute inset-x-0 line border-t border-current w-full h-px transition-all duration-200"
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

<style>
.input:focus ~ .label,
.input:not(:placeholder-shown) ~ .label {
  font-size: 0.75rem;
  transform: translateY(-1.25rem);
}

.line {
  bottom: 0.25rem;
  transform: scale(0);
}

.input:focus ~ .line {
  transform: scale(1);
}
</style>
