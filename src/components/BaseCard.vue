<template functional>
  <div
    class="flex bg-surface shadow-1dp py-6 px-4"
    :class="[props.className, props.rounded]"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'BaseCard',
  props: {
    className: {
      default: ''
    },
    rounded: {
      default: 'rounded-lg'
    }
  }
};
</script>
