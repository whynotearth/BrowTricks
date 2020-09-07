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
import eventBus from '@/utils/eventBus.js';
export default {
  name: 'FormTemplateFieldSelection',
  components: { FormTemplateFieldTypeCard },
  created() {
    this.prepareBackRoute();
  },
  computed: {
    fieldsAvailable() {
      return [
        {
          icon: 'IconImages',
          title: 'Upload',
          type: 'upload',
          description:
            'Already have a PDF or JPEF of your form? Upload to your template with an agreement request.'
        },
        {
          icon: 'IconCheckSquared',
          title: 'Agreement Request',
          type: 'agreement',
          description:
            'Add a required agreement request to your form so your clients can agree to your terms.'
        },
        {
          icon: 'IconText',
          title: 'Text Response',
          type: 'textarea',
          description:
            'Add a text response question to your form so your clients can type in their answers.'
        },
        {
          icon: 'IconChecklist',
          title: 'Checklist',
          type: 'checkbox',
          description:
            'Add a checklist to your form so your clients can select all options that apply.'
        },
        {
          icon: 'IconRadiolist',
          title: 'Multiple Choice',
          type: 'radio',
          description:
            'Add a multiple choice question to your form so your clients can select the best option suited for them.'
        }
      ];
    },
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
    ...mapActions('formTemplate', ['currentFieldUpdate']),
    prepareBackRoute() {
      eventBus.$emit('layoutBackRoute', this.backRoute);
    },
    selectField(field) {
      this.currentFieldUpdate({
        id: null,
        type: field.type
      });
      this.$router.push({
        name: 'FormTemplateFieldAdd',
        query: { ...this.$route.query, type: field.type }
      });
    }
  }
};
</script>

<style scoped></style>
