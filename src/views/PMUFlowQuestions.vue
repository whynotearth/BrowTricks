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
        <div class="my-4 max-w-md mx-auto pt-4">
          <transition name="fade" mode="out-in">
            <keep-alive>
              <component
                v-bind="componentProps"
                :is="componentName"
                :ref="componentName"
                @nextStep="nextStep"
                @updateAnswer="updateAnswer"
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
        :nextStepText="
          `${
            navigation[step] && step < navigation.length ? 'CONTINUE' : 'FINISH'
          } ►`
        "
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
import StepCreateSignature from '@/components/PMU/StepCreateSignature';
import StepContentHTML from '@/components/PMU/StepContentHTML';
import StepQuestion from '@/components/PMU/StepQuestion';

export default {
  name: 'PMUFlowQuestions',
  components: {
    StepperTop,
    StepperBottom,
    BusinessInfo,
    StepCreateSignature,
    StepContentHTML,
    StepQuestion
  },
  data() {
    return {
      step: null,
      result: {
        signature: '',
        initials: '',
        allowPhoto: false,
        isUnderCareOfPhysician: false,
        conditions: '',
        isTakingBloodThinner: false,
        physicianName: '',
        physicianPhoneNumber: '',
        answers: [
          {
            questionId: 0,
            answer: ''
          }
        ]
      },
      errors: null
    };
  },
  created() {
    // NOTE: for development, you can set this to every step you need to debug
    // FIXME: SET 0
    this.stepUpdate(0);
  },
  computed: {
    componentName() {
      return this.navigation[this.step].componentName;
    },
    componentProps() {
      return this.navigation[this.step].componentProps;
    },
    navigation() {
      return [
        {
          slug: 'create-signature',
          name: 'Create Signature',
          componentName: 'StepCreateSignature'
        },
        {
          slug: 'disclosures',
          name: 'Disclosures',
          componentName: 'StepContentHTML',
          componentProps: {
            content: `<p>I, <span class="tg-dancing-mobile">${this.result.signature}</span>, have requested information relating to the procedure of Intradermal Cosmetics so that I may make an informed decision as to whether or not to undergo the procedure.</p>
<p>The type of Intradermal Procedure used will be Micro Pigment Implantation, aka, Microblading. It is defined as the process of implanting micro pockets of pigment into the dermal layer of the skin. This is a form of tattooing used for permanent cosmetics and semi permanent eyebrow filling.</p>`
          }
        },
        {
          slug: 'release',
          name: 'Release',
          componentName: 'StepQuestion',
          componentProps: {
            content:
              'Do you authorize to have photographs taken both before and after treatment, and that photographs taken may be used for advertising/training purposes?',
            type: 'radio',
            radioOptions: ['Yes', 'No']
          }
        },
        // todo: medical disclaimer 1
        {
          onNext: this.submit,
          slug: 'medical-disclaimer-2',
          name: 'Medical Disclaimer',
          componentName: 'StepQuestion',
          componentProps: {
            text:
              'Do you authorize to have photographs taken both before and after treatment, and that photographs taken may be used for advertising/training purposes?',
            type: 'textarea'
          }
        }
      ];
    }
  },
  methods: {
    stepUpdate(step) {
      this.step = step;
      const newRoute = this.navigation[step];
      if (this.$route.params.stepSlug === newRoute.slug) {
        // current route is correct
        return;
      }

      this.$router.push({
        name: 'PMUFlowQuestions',
        params: { stepSlug: newRoute.slug }
      });
    },
    updateAnswer({ field, value }) {
      this.result[field] = value;
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

      const onNext = this.navigation[this.step].onSubmit;
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
      console.log('submit');
    }
  }
};
</script>
