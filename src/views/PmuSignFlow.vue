<template>
  <div class="">
    <link
      href="https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap"
      rel="stylesheet"
    />
    <div
      class="min-h-screen bg-background w-full flex flex-col justify-between"
    >
      <div>
        <StepperTop :navigation="navigation" :page="step + 1" />
        <div class="my-4 max-w-md mx-auto px-4 pt-4">
          <transition name="fade" mode="out-in">
            <keep-alive>
              <component
                v-bind="componentProps"
                :is="componentName"
                :ref="componentName"
                @nextStep="nextStep"
                @answerUpdate="answerUpdate"
              ></component>
            </keep-alive>
          </transition>
          <div v-if="errors" class="px-4 text-error text-xs">
            <div v-for="(error, key) in errors" :key="key">
              <p v-for="(detail, key) in error" :key="key">{{ detail }}</p>
            </div>
          </div>
        </div>
      </div>
      <StepperBottom
        :page="step + 1"
        :nextStepText="step === navigation.length - 1 ? 'Finish' : 'Continue'"
        @previousStep="previousStep"
        @nextStep="nextStep"
        :firstPageStepBack="true"
      />
    </div>
  </div>
</template>

<script>
import StepperTop from '@/components/BaseStepperTopBar';
import StepperBottom from '@/components/BaseStepperBottomBar';
import BusinessInfo from '@/components/tenant/BusinessInfo';
import StepContentHTML from '@/components/pmu/StepContentHtml';
import StepQuestion from '@/components/pmu/StepQuestion';
import {
  // defaultNavigationSteps,
  tenantQuestionsNavigationSteps
} from '@/services/pmu.js';
import { mapActions, mapGetters } from 'vuex';
import { showOverlayAndRedirect } from '@/helpers.js';

export default {
  name: 'PmuSignFlow',
  components: {
    StepperTop,
    StepperBottom,
    BusinessInfo,
    StepContentHTML,
    StepQuestion
  },
  props: ['tenantSlug', 'clientId'],
  data() {
    return {
      step: null,
      navigationPart3: [],
      result: {
        signature: '',
        initials: '',
        allowPhoto: '',
        isUnderCareOfPhysician: '',
        conditions: '',
        isTakingBloodThinner: '',
        physicianName: '',
        physicianPhoneNumber: '',
        answers: [
          // {
          //   questionId: 0,
          //   answer: ''
          // }
        ]
      },
      errors: null
    };
  },
  created() {
    // NOTE: for development, you can set this to every step you need to debug
    this.stepUpdate(0);
    this.prepareTenantQuestions();
  },
  computed: {
    ...mapGetters('tenant', ['pmuDisclosuresGet']),
    ...mapGetters('auth', ['isAuthenticated']),
    componentName() {
      return this.navigation[this.step].componentName;
    },
    componentProps() {
      return this.navigation[this.step].componentProps;
    },
    navigation() {
      return [
        // ...this.navigationPart1,
        // ...this.navigationPart2,
        ...this.navigationPart3,
        ...this.navigationPart4
      ];
    },
    // navigationPart1() {
    //   return defaultNavigationSteps({ signature: this.result.signature });
    // },
    // navigationPart2() {
    //   if (this.navigationPart3.length > 0) {
    //     return [
    //       {
    //         slug: 'tenant-questions',
    //         name: 'Tenant Questions',
    //         componentName: 'StepContentHTML',
    //         componentProps: {
    //           content:
    //             'Boise Brow Queen has some additional questions for their services:'
    //         }
    //       }
    //     ];
    //   }
    //   return [];
    // },
    navigationPart4() {
      return [
        {
          onNext: this.submit,
          slug: 'review-sign-submit',
          name: 'Review & Sign',
          componentName: 'StepContentHTML',
          componentProps: {
            content: 'Submit and sign answers?'
          }
        }
      ];
    }
  },
  methods: {
    // ...mapActions('pmu', [
    //   'fetchQuestions',
    //   'submitAnswers',
    //   'getSignUrl',
    //   'submitSign'
    // ]),
    ...mapActions('tenant', ['pmuDisclosuresFetch']),
    ...mapActions('client', ['pmuSignAnswers']),
    async prepareTenantQuestions() {
      await this.pmuDisclosuresFetch({
        params: { tenantSlug: this.tenantSlug }
      });
      console.log('pmuDisclosuresGet', this.pmuDisclosuresGet);
      this.navigationPart3 = this.pmuDisclosuresGet.map((item, index) =>
        tenantQuestionsNavigationSteps(item, index)
      );
    },
    stepUpdate(step) {
      this.step = step;
      const newRoute = this.navigation[step];
      if (this.$route.params.stepSlug === newRoute.slug) {
        // current route is correct
        return;
      }

      this.$router
        .push({
          name: 'PmuSignFlow',
          params: { stepSlug: newRoute.slug }
        })
        .catch(() => {});
    },
    answerUpdate({ field, value }) {
      if (field.noSave) {
        return;
      }
      // handle tenant questions
      // -----------------------
      if (field.data && field.data.isTenantQuestion) {
        const questionId = field.data.questionId;
        const currentAnswerIndex = this.result.answers.findIndex(
          item => item.questionId === questionId
        );
        if (currentAnswerIndex > -1) {
          this.result.answers.splice(currentAnswerIndex, 1);
        }
        this.result.answers.push({
          questionId,
          answer: value
        });
      }
      // handle others
      // -------------
      else {
        this.result[field.name] = value;
      }
    },
    previousStep() {
      if (this.step > 0) {
        this.stepUpdate(this.step - 1);
        return;
      }
      this.$router.push({ name: 'PMUFlowStart' });
    },
    async nextStep() {
      const valid = this.validateStep(this.step);
      if (!valid) {
        return;
      }

      const onNext = this.navigation[this.step].onNext;
      if (onNext) {
        await onNext();
      }

      const isLastStep = this.step === this.navigation.length - 1;
      if (isLastStep) return;
      this.stepUpdate(this.step + 1);
    },
    validateStep(step) {
      let valid = true;
      const stepComponentRef = this.$refs[this.navigation[step].componentName];
      const hasComponentValidation = !!stepComponentRef.$v;
      if (hasComponentValidation) {
        // trigger validation touch
        stepComponentRef.$v.$touch();
        valid = !stepComponentRef.$v.$invalid;
      }
      return valid;
    },
    async submit() {
      this.pmuSignAnswers({
        params: {
          clientId: this.clientId,
          tenantSlug: this.tenantSlug
        }
      })
        .then(async () => {
          const redirectRoute = this.isAuthenticated
            ? { name: 'ClientEdit' }
            : { name: 'Home' };
          showOverlayAndRedirect({
            title: 'Success!',
            message: 'Signed successfully!',
            // TODO: return to PmuSign if it was not comming from sms notify
            route: redirectRoute,
            params: {
              clientId: this.clientId,
              tenantSlug: this.tenantSlug
            }
          });
        })
        .catch(error => {
          alert('Something went wrong in sign process.');
          console.log(error);
        });
    }
  }
};
</script>
