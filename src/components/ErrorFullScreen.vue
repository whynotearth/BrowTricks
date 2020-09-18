<template>
  <div class="px-4 max-w-md mx-auto h-vh100 flex items-center justify-center">
    <BaseCard className="w-full justify-center">
      <div class="flex flex-col">
        <div class="text-error tg-body-mobile mb-6">
          <slot />
        </div>

        <div class="text-center">
          <Button :to="{ name: 'Home' }" title="Go home page" theme="none" />
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<script>
import BaseCard from '@/components/BaseCard.vue';
import Button from '@/components/inputs/Button.vue';

export default {
  name: 'ErrorFullScreen',
  components: { Button, BaseCard }
};
</script>

<style scoped></style>
