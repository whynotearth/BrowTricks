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

<style>
.input:focus ~ .label,
.input:not(:placeholder-shown) ~ .label {
  font-size: 0.75rem;
  transform: translateY(-1.2rem);
}

.line {
  transform: scale(0);
}

.input:focus ~ .line {
  transform: scale(1);
}
</style>
