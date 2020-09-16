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
    <flow-form
      v-if="isReady"
      v-on:submit="onSubmit"
      v-on:complete="onComplete"
      v-bind:questions="questions"
      v-bind:language="language"
    />

    <div
      v-if="errorMessage"
      class="max-w-4xl mx-auto px-3 text-error tg-body-mobile"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import FlowForm, { LanguageModel } from '@whynotearth/vue-flow-form';
import { mapActions } from 'vuex';
import { adaptApiQuestionsToModel } from '@/services/pmu.js';
import { get, isArray } from 'lodash-es';

// https://github.com/ditdot-dev/vue-flow-form

export default {
  name: 'example',
  props: ['tenantSlug', 'clientId'],
  components: {
    FlowForm
  },
  created() {
    this.init();
  },
  data() {
    return {
      errorMessage: '',
      isReady: false,
      language: new LanguageModel({
        // Your language definitions here (optional).
        // You can leave out this prop if you want to use the default definitions.
      }),
      questions: []
    };
  },
  methods: {
    ...mapActions('formTemplate', ['templateFetch']),
    ...mapActions('client', ['pmuSignAnswers']),
    async init() {
      this.errorMessage = '';
      const templateId = this.$route.params.templateId;
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
      console.log('quesitonList', questionList);
      const payload = {
        answers: questionList.map(question => {
          return {
            formItemId: question.questionId,
            value: isArray(question.answer)
              ? question.answer
              : [question.answer]
          };
        })
      };

      console.log('submit payload:', payload);
      this.pmuSignAnswers({
        params: {
          clientId: this.clientId,
          tenantSlug: this.tenantSlug,
          body: payload
        }
      }).catch(error => {
        this.errorMessage = get(
          error,
          'response.data.message',
          'Something went wrong, Answers NOT submitted!'
        );
      });
    },
    onComplete() {
      console.log('on complete');
    }
  }
};
</script>

<style>
/* @import '~@whynotearth/vue-flow-form/dist/vue-flow-form.css';
@import '~@whynotearth/vue-flow-form/dist/vue-flow-form.theme-minimal.css'; */
</style>
