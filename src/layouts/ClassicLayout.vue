<template>
  <div class="flex flex-col min-h-full">
    <slot name="header" />
    <!-- mb-14 for bottom navigation -->
    <div class="flex-grow overflow-auto flex flex-col mb-14 pb-6">
      <slot name="content" />
    </div>
    <slot name="footer" />
  </div>
</template>

<script>
export default {
  name: 'ClassicLayout'
};
</script>
