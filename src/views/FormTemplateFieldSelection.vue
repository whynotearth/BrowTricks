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
          @selectHelp="selectHelp"
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
      @close="openDrawerUploadUpdate(false)"
      :isOpen="openDrawerUploadGet === UploaderTypes.FORM_TEMPLATE"
      :fieldId="get(draftField, 'id', null)"
    ></FormTemplateDrawerUpload>

    <FormTemplateCardHelp @close="helpModalType = null" :type="helpModalType" />
  </div>
</template>

<script>
import FormTemplateFieldTypeCard from '@/components/formTemplate/FormTemplateFieldTypeCard';
import FormTemplateDrawerUpload from '@/components/formTemplate/FormTemplateDrawerUpload';
import FormTemplateCardHelp from '@/components/formTemplate/FormTemplateCardHelp';
import { get } from 'lodash-es';
import { UploaderTypes } from '@/services/uploader.js';

import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'FormTemplateFieldSelection',
  components: {
    FormTemplateFieldTypeCard,
    FormTemplateDrawerUpload,
    FormTemplateCardHelp
  },
  data: () => ({
    draftField: null,
    helpModalType: null
  }),
  computed: {
    ...mapGetters('uploader', ['openDrawerUploadGet']),
    UploaderTypes() {
      return UploaderTypes;
    },
    // NOTE: types are: text, agreement_request, text_response, checklist, multiple_choice, image, pdf
    uploaderField() {
      return {
        useUploader: true,
        icon: 'IconImages',
        name: 'Upload',
        // NOTE: we'll set the actual type in FormTemplateDrawerUpload after upload file (image or pdf)
        type: 'upload',
        description:
          'Already have a PDF or JPEF of your form? Upload to your template with an agreement request.',
        value: 'I agree to all terms and conditions above.'
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
            'Add a required agreement request to your form so your clients can agree to your terms.',
          value:
            'By selecting this box, I certify that I have read, or had read to me, the content of this consent, and I fully understand its contents.'
        },
        {
          icon: 'IconText',
          name: 'Text Response',
          type: 'text_response',
          description:
            'Add a text response question to your form so your clients can type in their answers.',
          value:
            'I am being treated for, or was in the past for the following conditions (Please include allergies, especially to dye, pigment, or numbing agent.)'
        },
        {
          icon: 'IconChecklist',
          name: 'Checklist',
          type: 'checklist',
          description:
            'Add a checklist to your form so your clients can select all options that apply.',
          value: 'Select all that apply',
          options: [
            'I am currently taking blood thinggers',
            'I am pregnant or breastfeeding',
            'I have skin diseases such as psoriasis or eczema'
          ]
        },
        {
          icon: 'IconRadiolist',
          name: 'Multiple Choice',
          type: 'multiple_choice',
          description:
            'Add a multiple choice question to your form so your clients can select the best option suited for them.',
          value: 'I am not on any medications that can cause my blood to thin.',
          options: ['Yes', 'No']
        }
      ];
    }
  },
  beforeDestroy() {
    this.openDrawerUploadUpdate(false);
  },
  methods: {
    ...mapActions('formTemplate', ['currentFieldReset']),
    ...mapActions('uploader', ['openDrawerUploadUpdate']),
    get,
    selectHelp(type) {
      this.helpModalType = type;
    },
    async selectField(field) {
      this.draftField = await this.currentFieldReset(field);
      if (field.useUploader) {
        this.selectUploader();
      } else {
        this.selectOrdinaryFields(field.type, this.draftField.id);
      }
    },

    selectUploader() {
      this.openDrawerUploadUpdate(UploaderTypes.FORM_TEMPLATE);
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
