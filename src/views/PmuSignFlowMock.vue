<template>
  <div>
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
        <div class="section-wrap pb-8">
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
      questions: []
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
    onSubmit() {
      // This method will only be called if you don't override the
      // completeButton slot.

      this.isSubmitted = true;
    },
    onComplete(completed, questionList) {
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
