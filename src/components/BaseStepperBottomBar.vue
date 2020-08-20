<template>
  <div class="w-full text-center mt-4 flex sticky inset-x-0 bottom-0 z-10">
    <Button
      title="Back"
      textColor="text-white"
      :maxWidth="null"
      textJustify="justify-start"
      class="bg-primary text-white text-opacity-medium py-3"
      :width="hideNext ? 'flex-grow' : 'w-1/3'"
      @clicked="$emit('previousStep')"
      v-if="firstPageStepBack || page != 1"
    >
      <template #icon>
        <ArrowLeftIcon class="fill-current" />
      </template>
    </Button>
    <Button
      :title="nextStepText"
      textColor="text-white"
      background="bg-secondary"
      :maxWidth="null"
      textJustify="justify-end"
      :width="'flex-grow'"
      @clicked="$emit('nextStep')"
    >
      <template #end>
        <ArrowRightIcon class="fill-current" />
      </template>
    </Button>
  </div>
</template>

<script>
import Button from '@/components/inputs/Button.vue';
import ArrowRightIcon from '@/assets/icons/keyboard_arrow_right.svg';
import ArrowLeftIcon from '@/assets/icons/keyboard_arrow_left.svg';

export default {
  name: 'CheckoutNavBar',
  components: {
    Button,
    ArrowRightIcon,
    ArrowLeftIcon
  },
  props: {
    nextStepText: {
      type: String
    },
    hideNext: {
      type: Boolean,
      default: false
    },
    page: {
      type: Number
    },
    firstPageStepBack: {
      type: Boolean,
      default: false
    }
  }
};
</script>
