<template>
  <div class="max-w-4xl mx-auto pt-6">
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
import FormTemplateFieldUpload from '@/components/formTemplate/FormTemplateFieldUpload';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'FormTemplateFieldEdit',
  components: {
    FormTemplateFieldAgreementRequest,
    FormTemplateFieldChecklist,
    FormTemplateFieldTextResponse,
    FormTemplateFieldText,
    FormTemplateFieldMultipleChoice,
    FormTemplateFieldUpload
  },
  props: ['tenantSlug'],
  created() {
    this.init();
  },
  computed: {
    ...mapGetters('formTemplate', ['currentFieldGet', 'currentTemplateGet']),
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

        // same as TextResponse
        case 'text':
          return 'FormTemplateFieldTextResponse';

        case 'multiple_choice':
          return 'FormTemplateFieldMultipleChoice';

        case 'image':
          return 'FormTemplateFieldUpload';

        case 'pdf':
          return 'FormTemplateFieldUpload';

        default:
          throw new Error('Field type not found');
      }
    }
  },
  destroyed() {
    this.currentFieldClear();
  },
  methods: {
    ...mapActions('formTemplate', [
      'currentFieldClear',
      'saveField',
      'fieldDelete'
    ]),
    init() {
      this.model = { ...this.currentFieldGet };
    },
    async submit(field) {
      this.saveField({
        tenantSlug: this.tenantSlug,
        field,
        formId: Number(this.$route.params.formId)
      }).then(templateId => {
        const _templateId = templateId || this.$route.params.formId;
        this.redirectBack(_templateId);
      });
    },
    async removeField() {
      if (!this.currentFieldGet.draft) {
        await this.fieldDelete({
          fieldId: this.currentFieldGet.id,
          tenantSlug: this.tenantSlug
        })
          .then(() => {
            this.redirectBack(this.$route.params.formId);
          })
          .catch(() => {
            alert('Something went wrong');
          });
      } else {
        this.redirectBack(this.$route.params.formId);
      }
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
