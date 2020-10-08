<template>
  <div>
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
          <ErrorFullScreen :height="null" v-if="errorMessage">
            {{ errorMessage }}
          </ErrorFullScreen>
          <div v-else-if="isSubmitted">
            <p>
              <span class="fh2">Thank You!</span>
              <span class="tg-mobile-body text-on-background"
                >PMU successfuly submitted.</span
              >
            </p>
          </div>
          <div v-else>
            <p>
              <span class="fh2">Review and Sign</span>
            </p>

            <PmuFormFilledPreview
              v-if="isCompleted"
              title="Here is your PMU form:"
              :clientId="clientId"
              :tenantSlug="tenantSlug"
              :templateId="templateId"
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
import { get } from 'lodash-es';
import PmuFormFilledPreview from '@/components/pmu/PmuFormFilledPreview.vue';
import ErrorFullScreen from '@/components/ErrorFullScreen.vue';

// https://github.com/ditdot-dev/vue-flow-form

export default {
  name: 'PmuSignFlowPreview',
  props: ['tenantSlug', 'templateId'],
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
    onSubmit(questionList) {
      // This method will only be called if you don't override the
      // completeButton slot.

      const path = this.$router.resolve({
        name: 'PmuFormDownload'
      }).href;
      const callbackUrl = `${window.location.origin}${path}`;
      console.log('notificationCallBackUrl', callbackUrl);
      const payload = adaptAnswersToApi(questionList, callbackUrl);

      console.log('answers for api:', payload);
      this.pmuSignSubmitAnswers({
        params: {
          clientId: this.clientId,
          tenantSlug: this.tenantSlug,
          templateId: this.templateId,
          body: payload
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
