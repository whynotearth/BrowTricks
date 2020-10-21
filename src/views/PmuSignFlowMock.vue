<template>
  <div class="tg-body-mobile">
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
        <div class="section-wrap overflow-auto">
          <ErrorFullScreen :height="null" v-if="errorMessage">
            {{ errorMessage }}
          </ErrorFullScreen>
          <div v-else-if="isSubmitted">
            <p class="mb-2">
              <span class="fh2">Thank You!</span>
              <span class="tg-body-mobile text-on-background"
                >PMU successfuly submitted.</span
              >
            </p>

            <router-link
              class="tg-body-mobile tg-text-brand3 underline"
              :to="{ name: 'FormTemplateItemEdit' }"
              >Back to Form Template</router-link
            >
          </div>
          <div v-else class="relative">
            <p>
              <span class="fh2">Review and Sign</span>
            </p>

            <PmuFormFilledPreview
              class="mb-8"
              v-if="isCompleted"
              :isMock="true"
              title="Here is your PMU form:"
              :tenantSlug="tenantSlug"
              :templateId="formId"
              :answers="answers"
            />

            <h3 class="tg-body-mobile mb-2">Sign here:</h3>
            <VueSignaturePad
              class="border border-divider border-opacity-medium bg-surface mb-6"
              width="280px"
              height="240px"
              ref="signaturePad"
              :options="{ onEnd: onSignatureEnd }"
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
                title="Save Signature"
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
    </FlowForm>
  </div>
</template>

<script>
import FlowForm, { LanguageModel } from '@whynotearth/vue-flow-form';
import { mapActions } from 'vuex';
import { adaptApiQuestionsToModel, adaptAnswersToApi } from '@/services/pmu.js';
import PmuFormFilledPreview from '@/components/pmu/PmuFormFilledPreview.vue';
import ErrorFullScreen from '@/components/ErrorFullScreen.vue';

// https://github.com/ditdot-dev/vue-flow-form

export default {
  name: 'PmuSignFlowMock',
  props: ['tenantSlug', 'formId'],
  components: {
    ErrorFullScreen,
    FlowForm,
    PmuFormFilledPreview
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
      language: new LanguageModel({}),
      answers: [],
      questions: [],
      signatureImageData: ''
    };
  },
  methods: {
    ...mapActions('formTemplate', ['templateFetch']),
    ...mapActions('client', ['pmuSignSubmitAnswers']),
    async init() {
      this.isCompleted = false;
      this.errorMessage = '';
      const template = await this.templateFetch({
        params: {
          tenantSlug: this.tenantSlug,
          templateId: this.formId
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
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
      console.log(isEmpty);
      console.log(data);
      this.signatureImageData = data;
      // this.answers
    },
    onSignatureUndo() {
      console.log('undo');
      this.$refs.signaturePad.undoSignature();
    },
    onSignatureEnd(arggg) {
      console.log('on end signature......', arggg);
    },
    onSubmit() {
      // This method will only be called if you don't override the
      // completeButton slot.

      this.isSubmitted = true;
    },
    onComplete(completed, questionList) {
      console.log('on complete');
      this.answers = adaptAnswersToApi(questionList);
      this.isCompleted = completed;
    }
  }
};
</script>

<style>
/* @import '~@whynotearth/vue-flow-form/dist/vue-flow-form.css';
@import '~@whynotearth/vue-flow-form/dist/vue-flow-form.theme-minimal.css'; */
</style>
