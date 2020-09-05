<template>
  <div class="max-w-md mx-auto pt-2">
    <!-- form title -->
    <router-link
      :to="{ name: 'FormTemplateFieldSelection' }"
      class="flex justify-between tg-body-mobile border-b border-divider border-opacity-divider py-3 mb-6"
    >
      <label
        for="formTemplateName"
        class="text-on-background text-opacity-high"
      >
        Name
      </label>
      <div class="flex items-center text-on-background text-opacity-medium">
        <span id="formTemplateName" class="mr-2">Untitled</span>
        <IconArrowRight
          class="fill-current text-on-background text-opacity-medium"
        />
      </div>
    </router-link>

    <!-- current questions -->
    <SortableList lockAxis="y" v-model="currentFields">
      <li v-for="(field, index) in currentFields" :key="index">
        <FormTemplateFieldTypeCard
          :item="field"
          :index="index"
          class="mb-4"
          :icon="field.icon"
          :title="field.title"
          :fieldtype="field.fieldtype"
        >
          <p class="text-on-background text-opacity-high">
            {{ field.textContent }}
          </p>
        </FormTemplateFieldTypeCard>
      </li>
    </SortableList>

    <!-- add question -->
    <router-link
      :to="{
        name: 'FormTemplateFieldSelection',
        query: { formId: $route.params.formId }
      }"
    >
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
import FormTemplateFieldTypeCard from '@/components/pmu/FormTemplateFieldTypeCard';
import IconArrowRight from '@/assets/icons/keyboard_arrow_right.svg';
import BaseCard from '@/components/BaseCard';
import IconAdd from '@/assets/icons/add.svg';
import { ContainerMixin } from 'vue-slicksort';

const SortableList = {
  mixins: [ContainerMixin],
  /*
  same as: `<ul><slot /></ul>`
  */
  render: function(createElement) {
    return createElement('ul', this.$slots.default);
  }
};

export default {
  name: 'FormTemplatesAddEdit',
  components: {
    SortableList,

    FormTemplateFieldTypeCard,
    IconArrowRight,
    BaseCard,
    IconAdd
  },
  data: () => ({
    currentFields: [
      {
        title: 'Upload 1',
        icon: 'IconImages',
        fieldtype: 'upload',
        textContent: 'content of question here.....'
      },
      {
        title: 'Upload 2',
        icon: 'IconImages',
        fieldtype: 'upload',
        textContent: 'content of question here.....'
      },
      {
        title: 'Upload 3',
        icon: 'IconImages',
        fieldtype: 'upload',
        textContent: 'content of question here.....'
      }
    ]
  })
};
</script>

<style scoped></style>
