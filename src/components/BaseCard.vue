<template functional>
  <div
    class="flex bg-surface shadow-1dp py-6 px-4 rounded-lg"
    :class="props.className"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'BaseCard'
};
</script>
