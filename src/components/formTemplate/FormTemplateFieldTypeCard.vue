<template>
  <BaseCard
    className="items-center flex-col text-center select-none"
    v-bind="attrs"
  >
    <div class="mb-6">
      <component
        :is="icon"
        class="h-6 w-6 fill-current text-on-surface text-opacity-medium"
      />
    </div>

    <!-- title -->
    <h2
      class="text-on-surface text-opacity-high mb-6 flex items-center relative"
    >
      <span class="block">{{ name }}</span>
      <a
        title="Sample Question"
        tabindex="0"
        @click.stop="$emit('selectHelp', type)"
      >
        <IconHelpRounded
          v-if="hasHelp"
          class="text-on-surface text-opacity-medium ml-2 cursor-pointer select-none"
        />
      </a>
    </h2>

    <!-- description -->
    <p
      v-if="description"
      class="tg-caption-mobile text-on-surface text-opacity-high"
    >
      {{ description }}
    </p>

    <!-- default slot -->
    <slot />
  </BaseCard>
</template>

<script>
import BaseCard from '@/components/BaseCard';
import IconImages from '@/assets/icons/images.svg';
import IconDocument from '@/assets/icons/document.svg';
import IconText from '@/assets/icons/text.svg';
import IconCheckSquared from '@/assets/icons/check-squared.svg';
import IconChecklist from '@/assets/icons/checklist.svg';
import IconRadiolist from '@/assets/icons/radiolist.svg';
import IconHelpRounded from '@/assets/icons/help-rounded.svg';

export default {
  name: 'FormTemplateFieldTypeCard',
  components: {
    IconText,
    IconChecklist,
    IconRadiolist,
    IconImages,
    IconDocument,
    BaseCard,
    IconCheckSquared,
    IconHelpRounded
  },
  props: {
    attrs: {
      type: Object,
      default: () => ({})
    },
    icon: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    type: {
      type: String,
      required: true
    },
    hasHelp: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped></style>
