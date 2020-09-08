<template>
  <div class="max-w-md mx-auto pt-6 px-4">
    <div class="text-on-background">
      <h2 class="tg-h3-mobile text-on-background text-opacity-high mb-4">
        Select a question type:
      </h2>

      <a
        v-for="field in fieldsAvailable"
        :key="field.type"
        @click.prevent="selectField(field)"
        class="cursor-pointer"
      >
        <FormTemplateFieldTypeCard
          class="mb-4"
          :hasHelp="true"
          :icon="field.icon"
          :title="field.title"
          :type="field.type"
          :description="field.description"
        />
      </a>
    </div>
  </div>
</template>

<script>
import FormTemplateFieldTypeCard from '@/components/pmu/FormTemplateFieldTypeCard';
import { mapActions } from 'vuex';
export default {
  name: 'FormTemplateFieldSelection',
  components: { FormTemplateFieldTypeCard },
  computed: {
    // NOTE: types are: text, agreement_request, text_response, checklist, multiple_choice, image, pdf
    fieldsAvailable() {
      return [
        {
          icon: 'IconImages',
          title: 'Upload',
          type: 'image',
          description:
            'Already have a PDF or JPEF of your form? Upload to your template with an agreement request.'
        },
        {
          icon: 'IconCheckSquared',
          title: 'Agreement Request',
          type: 'agreement_request',
          description:
            'Add a required agreement request to your form so your clients can agree to your terms.'
        },
        {
          icon: 'IconText',
          title: 'Text Response',
          type: 'text_response',
          description:
            'Add a text response question to your form so your clients can type in their answers.'
        },
        {
          icon: 'IconChecklist',
          title: 'Checklist',
          type: 'checklist',
          description:
            'Add a checklist to your form so your clients can select all options that apply.'
        },
        {
          icon: 'IconRadiolist',
          title: 'Multiple Choice',
          type: 'multiple_choice',
          description:
            'Add a multiple choice question to your form so your clients can select the best option suited for them.'
        }
      ];
    }
  },
  methods: {
    ...mapActions('formTemplate', ['currentFieldReset']),
    async selectField(field) {
      const newField = await this.currentFieldReset(field.type);
      this.$router.push({
        name: 'FormTemplateFieldEdit',
        params: { fieldId: newField.id },
        query: { type: field.type }
      });
    }
  }
};
</script>

<style scoped></style>
