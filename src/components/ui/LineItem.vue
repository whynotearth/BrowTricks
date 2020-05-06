<template>
  <div class="flex items-center w-full">
    <div class="mr-2 h-10 w-10">
      <slot name="image" />
    </div>
    <div class="text-left">
      <p>
        <slot name="title" />
      </p>
      <p>
        <slot name="subtitle" />
      </p>
      <p class="text-opacity-medium">
        <slot name="description" />
      </p>
    </div>
    <div class="ml-auto" @click="$emit('detailClicked')">
      <slot name="detail" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LineItem'
};
</script>

<style scoped />
