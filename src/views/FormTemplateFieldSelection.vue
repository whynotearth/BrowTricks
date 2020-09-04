<template>
  <div class="max-w-md mx-auto pt-6">
    <div class="text-on-background">
      <h2 class="tg-h3-mobile text-on-background text-opacity-high mb-4">
        Select a question type:
      </h2>

      <FormTemplateFieldTypeCard
        class="mb-4"
        icon="IconImages"
        title="Upload"
        fieldtype="upload"
        :hasHelp="true"
        description="Already have a PDF or JPEF of your form? Upload to your template
            with an agreement request."
      />

      <FormTemplateFieldTypeCard
        class="mb-4"
        icon="IconCheckSquared"
        title="Agreement Request"
        fieldtype="agreement"
        :hasHelp="true"
        description="Add a required agreement request to your form so your clients can agree to your terms."
      />

      <FormTemplateFieldTypeCard
        class="mb-4"
        icon="IconText"
        title="Text Response"
        fieldtype="textarea"
        :hasHelp="true"
        description="Add a text response question to your form so your clients can type in their answers."
      />

      <FormTemplateFieldTypeCard
        class="mb-4"
        icon="IconChecklist"
        title="Checklist"
        fieldtype="checkbox"
        :hasHelp="true"
        description="Add a checklist to your form so your clients can select all options that apply."
      />

      <FormTemplateFieldTypeCard
        class="mb-4"
        icon="IconRadiolist"
        title="Multiple Choice"
        fieldtype="radio"
        :hasHelp="true"
        description="Add a multiple choice question to your form so your clients can select the best option suited for them."
      />
    </div>
  </div>
</template>

<script>
import FormTemplateFieldTypeCard from '@/components/pmu/FormTemplateFieldTypeCard';
import eventBus from '@/utils/eventBus.js';
export default {
  name: 'FormTemplateFieldSelection',
  components: { FormTemplateFieldTypeCard },
  created() {
    this.prepareBackRoute();
  },
  computed: {
    backRoute() {
      const formId = this.$route.query.formId;
      if (formId) {
        return {
          name: 'FormTemplatesEdit',
          params: { formId }
        };
      }
      return { name: 'FormTemplatesAdd' };
    }
  },
  methods: {
    prepareBackRoute() {
      eventBus.$emit('layoutBackRoute', this.backRoute);
    }
  }
};
</script>

<style scoped></style>
