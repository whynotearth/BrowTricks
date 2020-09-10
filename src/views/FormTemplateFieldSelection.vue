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
          :name="field.name"
          :type="field.type"
          :description="field.description"
        />
      </a>
    </div>

    <FormTemplateDrawerUpload
      @close="isOpenDrawerUploadUpdate(false)"
      :isOpen="isOpenDrawerUploadGet"
      :fieldId="get(draftField, 'id', null)"
    ></FormTemplateDrawerUpload>
  </div>
</template>

<script>
import FormTemplateFieldTypeCard from '@/components/formTemplate/FormTemplateFieldTypeCard';
import FormTemplateDrawerUpload from '@/components/formTemplate/FormTemplateDrawerUpload';
import { get } from 'lodash-es';

import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'FormTemplateFieldSelection',
  components: { FormTemplateFieldTypeCard, FormTemplateDrawerUpload },
  data: () => ({
    draftField: null
  }),
  computed: {
    ...mapGetters('uploader', ['isOpenDrawerUploadGet']),
    // NOTE: types are: text, agreement_request, text_response, checklist, multiple_choice, image, pdf
    uploaderField() {
      return {
        useUploader: true,
        icon: 'IconImages',
        name: 'Upload',
        type: 'image',
        description:
          'Already have a PDF or JPEF of your form? Upload to your template with an agreement request.'
      };
    },
    fieldsAvailable() {
      return [
        this.uploaderField,
        {
          icon: 'IconCheckSquared',
          name: 'Agreement Request',
          type: 'agreement_request',
          description:
            'Add a required agreement request to your form so your clients can agree to your terms.'
        },
        {
          icon: 'IconText',
          name: 'Text Response',
          type: 'text_response',
          description:
            'Add a text response question to your form so your clients can type in their answers.'
        },
        {
          icon: 'IconChecklist',
          name: 'Checklist',
          type: 'checklist',
          description:
            'Add a checklist to your form so your clients can select all options that apply.'
        },
        {
          icon: 'IconRadiolist',
          name: 'Multiple Choice',
          type: 'multiple_choice',
          description:
            'Add a multiple choice question to your form so your clients can select the best option suited for them.'
        }
      ];
    }
  },
  beforeDestroy() {
    this.isOpenDrawerUploadUpdate(false);
  },
  methods: {
    ...mapActions('formTemplate', ['currentFieldReset']),
    ...mapActions('uploader', ['isOpenDrawerUploadUpdate']),
    get,
    async selectField(field) {
      this.draftField = await this.currentFieldReset(field.type);
      if (field.useUploader) {
        this.selectUploader();
      } else {
        this.selectOrdinaryFields(field.type, this.draftField.id);
      }
    },

    selectUploader() {
      this.isOpenDrawerUploadUpdate(true);
    },
    selectOrdinaryFields(type, fieldId) {
      this.$router.push({
        name: 'FormTemplateFieldEdit',
        params: { fieldId },
        query: { type }
      });
    }
  }
};
</script>

<style scoped></style>
