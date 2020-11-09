<template functional>
  <div
    class="flex bg-surface"
    :class="[props.className, props.rounded, props.padding, props.shadow]"
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
    },
    padding: {
      default: 'py-6 px-4'
    },
    shadow: {
      default: 'shadow-1dp'
    }
  }
};
</script>
