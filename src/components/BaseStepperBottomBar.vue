<template>
  <div
    class="w-full text-center mt-4 flex fixed inset-x-0 bottom-0 z-40 -shadow-8dp"
  >
    <Button
      title="Back"
      textColor="text-on-primary text-opacity-high"
      background="bg-primary"
      :isRounded="false"
      :maxWidth="null"
      textJustify="justify-start"
      class="py-3"
      :width="hideNext ? 'flex-grow' : 'w-1/3'"
      @clicked="$emit('previousStep')"
      v-if="firstPageStepBack || page != 1"
    >
      <template #start>
        <ArrowLeftIcon class="fill-current" />
      </template>
    </Button>
    <Button
      :title="nextStepText"
      textColor="text-on-secondary text-opacity-high"
      background="bg-secondary"
      :isRounded="false"
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
import ArrowRightIcon from '@/assets/icons/keyboard_arrow_right.svg';
import ArrowLeftIcon from '@/assets/icons/keyboard_arrow_left.svg';

export default {
  name: 'CheckoutNavBar',
  components: {
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
