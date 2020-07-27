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
import StepCreateSignature from '@/components/PMU/StepCreateSignature';
import StepContentHTML from '@/components/PMU/StepContentHTML';
import StepQuestion from '@/components/PMU/StepQuestion';
import { mapActions, mapGetters } from 'vuex';

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
  props: ['tenantSlug'],
  data() {
    return {
      step: null,
      navigationPart2: [],
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
    this.stepUpdate(15);
    this.prepareTenantQuestions();
  },
  computed: {
    ...mapGetters('PMU', ['tenantQuestions']),
    componentName() {
      return this.navigation[this.step].componentName;
    },
    componentProps() {
      return this.navigation[this.step].componentProps;
    },
    navigation() {
      return [
        ...this.navigationPart1,
        ...this.navigationPart2,
        ...this.navigationPart3
      ];
    },
    navigationPart1() {
      return [
        {
          slug: 'create-signature',
          name: 'Create Signature',
          componentName: 'StepCreateSignature'
        },
        {
          slug: 'disclosures-1',
          name: 'Disclosures',
          componentName: 'StepContentHTML',
          componentProps: {
            content: `<p>I, <span class="tg-dancing-mobile text-secondary">${this.result.signature}</span>, have requested information relating to the procedure of Intradermal Cosmetics so that I may make an informed decision as to whether or not to undergo the procedure.</p>
<p>The type of Intradermal Procedure used will be Micro Pigment Implantation, aka, Microblading. It is defined as the process of implanting micro pockets of pigment into the dermal layer of the skin. This is a form of tattooing used for permanent cosmetics and semi permanent eyebrow filling.</p>`
          }
        },
        {
          slug: 'disclosures-2',
          name: 'Disclosures',
          componentName: 'StepContentHTML',
          componentProps: {
            content:
              '<p class="mb-4">I voluntarily request as my intradermal technician, <span class="tg-dancing-mobile text-secondary">Brow Tricks Beauty</span>, and such association and technical assistance as she may deem necessary to perform the following procedures on my body:</p><p>Eyebrow Microblading</p>'
          }
        },
        {
          slug: 'release',
          name: 'Release',
          componentName: 'StepQuestion',
          componentProps: {
            question:
              'Do you authorize to have photographs taken both before and after treatment, and that photographs taken may be used for advertising/training purposes?',
            fields: [
              {
                type: 'radio',
                name: 'allowPhoto',
                options: ['Yes', 'No']
              }
            ]
          }
        },

        {
          slug: 'medical-disclaimer-1',
          name: 'Medical Disclaimer',
          componentName: 'StepQuestion',
          componentProps: {
            question:
              'I am currently under the care of a physician for any medical reason, or have a past medical issue that may affect my procedure.',
            fields: [
              {
                type: 'radio',
                name: 'isUnderCareOfPhysician',
                options: ['Yes', 'No']
              }
            ]
          }
        },
        {
          slug: 'medical-disclaimer-2',
          name: 'Medical Disclaimer',
          componentName: 'StepQuestion',
          componentProps: {
            question:
              'I am being treated for, or was in the past, for the following conditions (Please include allergies, especially to dye, pigment, or numbing agents):',
            fields: [
              {
                type: 'textarea',
                name: 'conditions',
                label: 'Conditions'
              }
            ]
          }
        },
        {
          slug: 'medical-disclaimer-3',
          name: 'Medical Disclaimer',
          componentName: 'StepQuestion',
          componentProps: {
            question:
              'Are you on any medication that causes your blood to thin?',
            fields: [
              {
                type: 'radio',
                name: 'isTakingBloodThinner',
                options: ['Yes', 'No']
              }
            ]
          }
        },

        {
          slug: 'medical-disclaimer-4',
          name: 'Medical Disclaimer',
          componentName: 'StepQuestion',
          componentProps: {
            question: 'Please list your physician’s name and phone number:',
            fields: [
              {
                type: 'input',
                name: 'physicianName',
                label: 'Name'
              },
              {
                type: 'input',
                name: 'physicianPhoneNumber',
                label: 'Phone Number'
              }
            ]
          }
        },

        {
          slug: 'medical-disclaimer-5',
          name: 'Medical Disclaimer',
          componentName: 'StepQuestion',
          componentProps: {
            question:
              'I have been told that there may be known and unknown risks and hazards related to the performance of the planned procedure and I understand that no warranty or guarantees have been made as to the results.',
            fields: [
              {
                type: 'radio',
                name: 'unknownField1',
                options: ['Yes', 'No']
              }
            ]
          }
        },

        {
          slug: 'medical-disclaimer-6',
          name: 'Medical Disclaimer',
          componentName: 'StepQuestion',
          componentProps: {
            question:
              'I acknowledge the manufacturer of the pigment and numbing agents requires spot testing and specifically disclaims any responsibility for adverse reaction to applied products. I understand spot testing may identify individuals who develop an immediate allergic reactions, however spot testing does not identify individuals who may have a delayed allergic reaction to pigment.',
            fields: [
              {
                type: 'radio',
                name: 'unknownField2',
                options: ['Yes', 'No']
              }
            ]
          }
        },
        {
          slug: 'medical-disclaimer-7',
          name: 'Medical Disclaimer',
          componentName: 'StepQuestion',
          componentProps: {
            question:
              'I have been told that this procedure may involve discomfort. I also understand that I can ask for additional numbing as needed, but that the more numbing that is applied, the higher the risk of having an adverse reaction.',
            fields: [
              {
                type: 'radio',
                name: 'unknownField3',
                options: ['Yes', 'No']
              }
            ]
          }
        },

        {
          slug: 'medical-disclaimer-8',
          name: 'Medical Disclaimer',
          componentName: 'StepQuestion',
          componentProps: {
            question:
              'I understand the markings are permanent and that there is the possibility of hyperpigmentation resulting from a procedure, especially to individuals prone to hyperpigmentation from scars or other injuries.',
            fields: [
              {
                type: 'radio',
                name: 'unknownField4',
                options: ['Yes', 'No']
              }
            ]
          }
        },

        {
          slug: 'medical-disclaimer-9',
          name: 'Medical Disclaimer',
          componentName: 'StepQuestion',
          componentProps: {
            question:
              'I understand that a follow up procedure likely be needed.',
            fields: [
              {
                type: 'radio',
                name: 'unknownField5',
                options: ['Yes', 'No']
              }
            ]
          }
        },
        {
          slug: 'medical-disclaimer-10',
          name: 'Medical Disclaimer',
          componentName: 'StepQuestion',
          componentProps: {
            question:
              'I understand other risks involved may include, but are not limited to, allergic and other reactions to applied pigments, allergic and other reactions to products applied during and after the procedure, fanning or spreading of pigments (pigment migration) fading of color.',
            fields: [
              {
                type: 'radio',
                name: 'unknownField6',
                options: ['Yes', 'No']
              }
            ]
          }
        },

        {
          slug: 'medical-disclaimer-11',
          name: 'Medical Disclaimer',
          componentName: 'StepQuestion',
          componentProps: {
            question:
              'I accept full responsibility for any and all, present and future, medical treatments and expenses I may incur in the event I need to seek treatments for any known or unknown reason associated with this procedure.',
            fields: [
              {
                type: 'radio',
                name: 'unknownField7',
                options: ['Yes', 'No']
              }
            ]
          }
        },

        {
          slug: 'medical-disclaimer-12',
          name: 'Medical Disclaimer',
          componentName: 'StepQuestion',
          componentProps: {
            question:
              'I have been given an opportunity to ask questions about the procedures to be done and the risks and hazards involved, and I believe that I have sufficient information to give informed consent.',
            fields: [
              {
                type: 'radio',
                name: 'unknownField8',
                options: ['Yes', 'No']
              }
            ]
          }
        },

        {
          slug: 'review-sign-1',
          name: 'Review & Sign',
          componentName: 'StepQuestion',
          componentProps: {
            question:
              'I certify that I have read, or had read to me, the content of this consent, and I fully understand its contents.',
            fields: [
              {
                type: 'radio',
                name: 'unknownField9',
                options: ['Yes', 'No']
              }
            ]
          }
        },
        {
          slug: 'review-sign-2',
          name: 'Review & Sign',
          componentName: 'StepQuestion',
          componentProps: {
            question:
              'I have read, or have had read to me, and have received a copy of the Post Procedure Instructions and I understand its content.',
            fields: [
              {
                type: 'radio',
                name: 'unknownField10',
                options: ['Yes', 'No']
              }
            ]
          }
        }
      ];
    },
    navigationPart3() {
      return [
        {
          onNext: this.submit,
          slug: 'review-sign-submit',
          name: 'Review & Sign',
          componentName: 'StepQuestion',
          componentProps: {
            question: 'Preview PDF [not ready yet].',
            fields: []
          }
        }
      ];
    }
  },
  methods: {
    ...mapActions('PMU', ['fetchQuestions']),
    prepareTenantQuestions() {
      this.fetchQuestions({
        params: {
          tenantSlug: this.tenantSlug
        }
      }).then(() => {
        const tenantQuestions = this.tenantQuestions(this.tenantSlug);
        this.navigationPart2 = tenantQuestions.map((item, index) =>
          this.createTextAreaQuestion(item, index)
        );
      });
    },
    createTextAreaQuestion({ question, id }, index) {
      return {
        slug: `tenant-question-${index + 1}`,
        name: 'Tenant Question',
        componentName: 'StepQuestion',
        componentProps: {
          question,
          fields: [
            {
              type: 'textarea',
              name: `tenantQuestion${index + 1}`,
              label: 'Answer',
              data: { isTenantQuestion: true, questionId: id }
            }
          ]
        }
      };
    },
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
    answerUpdate({ field, value }) {
      console.log('{ field, value }', { field, value });
      // handle tenant questions
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
      else {
        this.result[field.name] = value;
      }
      console.log('result', this.result);
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
