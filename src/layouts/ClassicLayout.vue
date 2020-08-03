<template>
  <div class="flex flex-col min-h-full">
    <slot name="header" />
    <div class="flex-grow overflow-auto flex flex-col">
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
