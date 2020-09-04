<template>
  <div class="max-w-md mx-auto pt-2">
    <!-- form title -->
    <router-link
      :to="{ name: 'FormTemplateFieldSelection' }"
      class="flex justify-between tg-body-mobile border-b border-divider border-opacity-divider py-3 mb-6"
    >
      <span class="text-on-background text-opacity-high">Name</span>
      <div class="flex items-center text-on-background text-opacity-medium">
        <span class="mr-2">Untitled</span>
        <IconArrowRight
          class="fill-current text-on-background text-opacity-medium"
        />
      </div>
    </router-link>

    <router-link :to="{ name: 'FormTemplateFieldSelection' }">
      <BaseCard className="items-center flex-col">
        <div class="mb-6">
          <IconAdd
            class="fill-current text-on-surface text-opacity-high w-4 h-4"
          />
        </div>

        <h2 class="text-on-surface text-opacity-high mb-6">
          Add Question
        </h2>

        <p class="tg-caption-mobile text-on-surface text-opacity-high">
          Tap to add a new question to your form.
        </p>
      </BaseCard>
    </router-link>
  </div>
</template>

<script>
import IconArrowRight from '@/assets/icons/keyboard_arrow_right.svg';
import BaseCard from '@/components/BaseCard';
import IconAdd from '@/assets/icons/add.svg';
export default {
  name: 'FormTemplatesAddEdit',
  components: { IconArrowRight, BaseCard, IconAdd }
};
</script>

<style scoped></style>
