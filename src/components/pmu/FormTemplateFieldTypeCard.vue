<template>
  <BaseCard className="items-center flex-col text-center">
    <div class="mb-6">
      <component
        :is="icon"
        class="h-6 w-6 fill-current text-on-surface text-opacity-medium"
      />
    </div>
    <h2 class="text-on-surface text-opacity-high mb-6 flex items-center">
      <span class="block">{{ title }}</span>
      <IconHelpRounded
        @click="openHelp(fieldtype)"
        class="text-on-surface text-opacity-medium ml-2 cursor-pointer select-none"
      />
    </h2>

    <p class="tg-caption-mobile text-on-surface text-opacity-high">
      Already have a PDF or JPEF of your form? Upload to your template with an
      agreement request.
    </p>
  </BaseCard>
</template>

<script>
import BaseCard from '@/components/BaseCard';
import IconImages from '@/assets/icons/images.svg';
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
    BaseCard,
    IconCheckSquared,
    IconHelpRounded
  },
  props: {
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    fieldtype: {
      type: String,
      required: true
    }
  },
  methods: {
    openHelp(fieldtype) {
      console.log('fieldtype', fieldtype);
    }
  }
};
</script>

<style scoped></style>
