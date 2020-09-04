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
        description="Already have a PDF or JPEF of your form? Upload to your template
            with an agreement request."
      />

      <FormTemplateFieldTypeCard
        class="mb-4"
        icon="IconCheckSquared"
        title="Agreement Request"
        fieldtype="agreement"
        description="Add a required agreement request to your form so your clients can agree to your terms."
      />

      <FormTemplateFieldTypeCard
        class="mb-4"
        icon="IconText"
        title="Text Response"
        fieldtype="textarea"
        description="Add a text response question to your form so your clients can type in their answers."
      />

      <FormTemplateFieldTypeCard
        class="mb-4"
        icon="IconChecklist"
        title="Checklist"
        fieldtype="checkbox"
        description="Add a checklist to your form so your clients can select all options that apply. Add a checklist to your form so your clients can select all options that apply."
      />

      <FormTemplateFieldTypeCard
        class="mb-4"
        icon="IconRadiolist"
        title="Multiple Choice"
        fieldtype="radio"
        description="Add a multiple choice question to your form so your clients can select the best option suited for them."
      />
    </div>
  </div>
</template>

<script>
import FormTemplateFieldTypeCard from '@/components/pmu/FormTemplateFieldTypeCard';
export default {
  name: 'FormTemplateFieldSelection',
  components: { FormTemplateFieldTypeCard }
};
</script>

<style scoped></style>
