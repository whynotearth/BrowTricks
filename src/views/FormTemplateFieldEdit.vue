<template>
  <div class="max-w-md mx-auto pt-6">
    <component
      :initialModel="currentFieldGet"
      @save="submit"
      @remove="removeField"
      :is="componentName"
    ></component>
  </div>
</template>

<script>
import FormTemplateFieldAgreementRequest from '@/components/formTemplate/FormTemplateFieldAgreementRequest';
import FormTemplateFieldChecklist from '@/components/formTemplate/FormTemplateFieldChecklist';
import FormTemplateFieldTextResponse from '@/components/formTemplate/FormTemplateFieldTextResponse';
import FormTemplateFieldText from '@/components/formTemplate/FormTemplateFieldText';
import FormTemplateFieldMultipleChoice from '@/components/formTemplate/FormTemplateFieldMultipleChoice';
import FormTemplateFieldImage from '@/components/formTemplate/FormTemplateFieldImage';
import FormTemplateFieldPdf from '@/components/formTemplate/FormTemplateFieldPdf';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'FormTemplateFieldEdit',
  components: {
    FormTemplateFieldAgreementRequest,
    FormTemplateFieldChecklist,
    FormTemplateFieldTextResponse,
    FormTemplateFieldText,
    FormTemplateFieldMultipleChoice,
    FormTemplateFieldImage,
    FormTemplateFieldPdf
  },
  props: ['tenantSlug'],
  created() {
    this.init();
  },
  computed: {
    ...mapGetters('formTemplate', ['currentFieldGet']),
    componentType() {
      return this.$route.query.type;
    },
    componentName() {
      switch (this.componentType) {
        case 'agreement_request':
          return 'FormTemplateFieldAgreementRequest';

        case 'checklist':
          return 'FormTemplateFieldChecklist';

        case 'text_response':
          return 'FormTemplateFieldTextResponse';

        case 'text':
          return 'FormTemplateFieldText';

        case 'multiple_choice':
          return 'FormTemplateFieldMultipleChoice';

        case 'image':
          return 'FormTemplateFieldImage';

        case 'pdf':
          return 'FormTemplateFieldPdf';

        default:
          throw new Error('Field type not found');
      }
    }
  },
  destroyed() {
    this.currentFieldReset();
  },
  methods: {
    ...mapActions('formTemplate', ['currentFieldReset', 'saveField']),
    init() {
      this.model = { ...this.currentFieldGet };
    },
    async submit(field) {
      const templateId = await this.saveField({
        tenantSlug: this.tenantSlug,
        field,
        formId: Number(this.$route.params.formId)
      });
      this.redirectBack(templateId);
    },
    removeField() {
      console.log('TODO: delete field');
      this.redirectBack(this.$route.params.formId);
    },
    redirectBack(templateId) {
      this.$router.push({
        name: 'FormTemplateItemEdit',
        params: { formId: templateId },
        query: { refresh: 1 }
      });
    }
  }
};
</script>

<style scoped></style>
