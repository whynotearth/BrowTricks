<template>
  <div @click.stop="">
    <transition name="fade">
      <BaseDialog
        v-if="type"
        @close="$emit('close')"
        background="bg-transparent"
        textColor="text-on-background"
        :padding="null"
      >
        <div class="mx-auto">
          <img class="card-help--image block" :src="images[type]" alt="" />
        </div>
      </BaseDialog>
    </transition>
  </div>
</template>

<script>
import BaseDialog from '@/components/BaseDialog';
export default {
  name: 'FormTemplateCardHelp',
  components: { BaseDialog },
  props: ['type'],
  computed: {
    images() {
      return {
        agreement_request:
          'https://res.cloudinary.com/whynotearth/image/upload/v1599809198/BrowTricks/static_v2/form-template-card-help-1_z2flwp.png',
        upload:
          'https://res.cloudinary.com/whynotearth/image/upload/v1599809203/BrowTricks/static_v2/form-template-card-help-5_y4rqcw.png',
        text_response:
          'https://res.cloudinary.com/whynotearth/image/upload/v1599809202/BrowTricks/static_v2/form-template-card-help-2_ugptip.png',
        checklist:
          'https://res.cloudinary.com/whynotearth/image/upload/v1599809201/BrowTricks/static_v2/form-template-card-help-4_pvbes7.png',
        multiple_choice:
          'https://res.cloudinary.com/whynotearth/image/upload/v1599809198/BrowTricks/static_v2/form-template-card-help-3_m15vuh.png'
      };
    }
  }
};
</script>

<style scoped>
.card-help--image {
  max-height: calc(100vh - 64px);
  max-height: calc(100 * var(--vh) - 64px);
}
</style>
