<template>
  <div class="pmu-sign-flow tg-body-mobile min-w-app">
    <!-- NOTE: these files can affect other pages, so keeping them in component template, makes the isolated -->
    <link
      rel="stylesheet"
      href="https://unpkg.com/@ditdot-dev/vue-flow-form@1.1.0/dist/vue-flow-form.min.css"
    />
    <link
      rel="stylesheet"
      href="https://unpkg.com/@ditdot-dev/vue-flow-form@1.1.0/dist/vue-flow-form.theme-minimal.min.css"
    />
    <ErrorFullScreen :height="null" v-if="isReady && !(questions.length > 0)">
      This form template has no questions.
    </ErrorFullScreen>
    <FlowForm
      v-else-if="isReady"
      v-on:submit="onSubmit"
      v-on:complete="onComplete"
      v-bind:questions="questions"
      v-bind:language="language"
    >
      <template #complete>
        <div class="section-wrap">
          <!-- error screen -->
          <ErrorFullScreen :height="null" v-if="errorMessage">
            {{ errorMessage }}
            <template #actionButton>
              <router-link
                v-if="isFromNotify"
                class="tg-body-mobile tg-text-brand3 underline"
                :to="{ name: 'Home' }"
                >Return to Home</router-link
              >
              <router-link
                v-else
                class="tg-body-mobile tg-text-brand3 underline"
                :to="{ name: 'ClientInfo' }"
                >Return to Client Profile</router-link
              >
            </template>
          </ErrorFullScreen>
          <div v-else-if="isSubmitted">
            <p class="mb-2">
              <span class="fh2">Thank You!</span>
              <span class="tg-body-mobile text-on-background"
                >PMU successfuly submitted.</span
              >
            </p>

            <router-link
              v-if="isFromNotify"
              class="tg-body-mobile tg-text-brand3 underline"
              :to="{ name: 'Home' }"
              >Return to Home</router-link
            >
            <router-link
              v-else
              class="tg-body-mobile tg-text-brand3 underline"
              :to="{ name: 'ClientInfo' }"
              >Return to Client Profile</router-link
            >
          </div>
          <div v-else class="relative">
            <h1>
              <span class="fh2">Review and Sign</span>
            </h1>

            <div class="preview-wrapper relative mb-4">
              <PmuFormFilledPreview
                class="mb-8"
                v-if="isCompleted"
                title="Here is your PMU form:"
                :clientId="clientId"
                :tenantSlug="tenantSlug"
                :templateId="templateId"
                :answersBody="answersBody"
              />
            </div>

            <h3 class="tg-body-mobile mb-2">Sign here:</h3>
            <SignaturePad
              class="border border-divider border-opacity-medium bg-surface mb-6"
              :width="280"
              :height="240"
              ref="signaturePad"
              :options="{}"
              @input="onSignatureUpdate"
            />

            <div class="flex">
              <Button
                title="Undo"
                :background="null"
                class="uppercase w-1/2 ml-0 mr-0"
                padding="px-0 py-3"
                :width="null"
                maxWidth="max-w-200"
                :isBordered="true"
                @clicked="onSignatureUndo"
              />
              <Button
                :title="saveButtonText"
                :background="null"
                class="uppercase w-1/2 ml-3 mr-auto"
                padding="px-2 py-3"
                :width="null"
                maxWidth="max-w-200"
                :isBordered="true"
                @clicked="onSignatureSave"
              />
            </div>
          </div>
        </div>
      </template>

      <template #completeButton v-if="!signatureImage && !errorMessage">
        <p class="tg-body-mobile">
          Please sign the document and save your signature.
        </p>
      </template>
    </FlowForm>
  </div>
</template>

<script>
import FlowForm, { LanguageModel } from '@whynotearth/vue-flow-form';
import { mapActions } from 'vuex';
import { adaptApiQuestionsToModel, adaptAnswersToApi } from '@/services/pmu.js';
import { get } from 'lodash-es';
import PmuFormFilledPreview from '@/components/pmu/PmuFormFilledPreview.vue';
import ErrorFullScreen from '@/components/ErrorFullScreen.vue';
import SignaturePad from '@/components/SignaturePad.vue';

// https://github.com/ditdot-dev/vue-flow-form

export default {
  name: 'PmuSignFlow',
  props: ['tenantSlug', 'clientId', 'templateId'],
  components: {
    ErrorFullScreen,
    FlowForm,
    PmuFormFilledPreview,
    SignaturePad
  },
  created() {
    this.init();
  },
  data() {
    return {
      isSubmitted: false,
      isCompleted: false,
      errorMessage: '',
      isReady: false,
      language: new LanguageModel({
        // submitText: 'Submit',
        // continue: 'Continue'
      }),
      questions: [],
      questionListFlowObject: [],
      signatureImageDraft: '',
      signatureImage: ''
    };
  },
  computed: {
    isFromNotify() {
      return this.$route.name === 'PmuSignFromNotify';
    },
    saveButtonText() {
      const hasUnsavedSignature =
        this.signatureImageDraft !== this.signatureImage;
      return `Save Signature${hasUnsavedSignature ? ' *' : ''}`;
    },
    answersBody() {
      console.log('update body');
      return adaptAnswersToApi({
        questionList: this.questionListFlowObject,
        signatureImage: this.signatureImage
      });
    }
  },
  methods: {
    ...mapActions('formTemplate', ['templateFetch']),
    ...mapActions('client', ['pmuSignSubmitAnswers']),
    async init() {
      this.isCompleted = false;
      this.errorMessage = '';
      const templateId = this.templateId;
      const template = await this.templateFetch({
        params: {
          tenantSlug: this.tenantSlug,
          templateId
        }
      });
      const questions = template.items;
      this._adaptApiQuestionsToModel(questions);
    },
    _adaptApiQuestionsToModel(questions) {
      this.questions = adaptApiQuestionsToModel(questions);
      this.isReady = true;
    },
    onSignatureSave() {
      this.signatureImage = this.signatureImageDraft;
    },
    onSignatureUndo() {
      this.$refs.signaturePad.undo();
    },
    onSignatureUpdate(data) {
      console.log('signature updated (not saved yet)');
      this.signatureImageDraft = data;
    },
    onComplete(completed, questionList) {
      console.log('on complete');
      this.questionListFlowObject = questionList;
      this.isCompleted = completed;
    },
    onSubmit(questionList) {
      // This method will only be called if you don't override the
      // completeButton slot.
      this.questionListFlowObject = questionList;

      const path = this.$router.resolve({
        name: 'PmuFormDownload'
      }).href;
      const callbackUrl = `${window.location.origin}${path}`;
      console.log('notificationCallBackUrl', callbackUrl);
      this.pmuSignSubmitAnswers({
        params: {
          clientId: this.clientId,
          tenantSlug: this.tenantSlug,
          templateId: this.templateId,
          body: this.answersBody
        }
      })
        .then(() => {
          this.isSubmitted = true;
        })
        .catch(error => {
          this.errorMessage = get(
            error,
            'response.data.message',
            'Something went wrong, Answers not submitted.'
          );
        });
    }
  }
};
</script>

<style>
/* @import '~@whynotearth/vue-flow-form/dist/vue-flow-form.css';
@import '~@whynotearth/vue-flow-form/dist/vue-flow-form.theme-minimal.css'; */
.preview-wrapper {
  min-height: 120px;
}
.pmu-sign-flow .o-btn-action {
  text-transform: none;
}
</style>
