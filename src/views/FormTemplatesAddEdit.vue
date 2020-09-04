<template>
  <div class="max-w-md mx-auto pt-2">
    <router-link
      :to="{ name: 'FormTemplateFieldSelection' }"
      class="flex justify-between tg-body-mobile border-b border-divider border-opacity-divider py-3"
    >
      <span class="text-on-background text-opacity-high">Name</span>
      <div class="flex items-center text-on-background text-opacity-medium">
        <span class="mr-2">Untitled</span>
        <IconArrowRight
          class="fill-current text-on-background text-opacity-medium"
        />
      </div>
    </router-link>
  </div>
</template>

<script>
import IconArrowRight from '@/assets/icons/keyboard_arrow_right.svg';
export default {
  name: 'FormTemplatesAddEdit',
  components: { IconArrowRight }
};
</script>

<style scoped></style>
