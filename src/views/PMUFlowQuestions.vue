<template>
  <div class="">
    <div
      class="min-h-screen bg-background w-full flex flex-col justify-between"
    >
      <div>
        <StepperTop :navigation="navigation" :page="page" />
        <div class="my-4">
          <transition name="fade" mode="out-in">
            <keep-alive>
              <component
                :is="componentName"
                :ref="componentName"
                @nextStep="nextStep"
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
        :page="page"
        :nextStepText="
          `${
            navigation[page] && page < navigation.length ? 'CONTINUE' : 'FINISH'
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
import { mapGetters, mapMutations, mapActions } from 'vuex';
import StepperTop from '@/components/BaseStepperTopBar';
import StepperBottom from '@/components/BaseStepperBottomBar';
import BusinessInfo from '@/components/tenant/BusinessInfo';
import StepCreateSignature from '@/components/PMU/StepCreateSignature';

export default {
  name: 'PMUFlowQuestions',
  components: {
    StepperTop,
    StepperBottom,
    BusinessInfo,
    StepCreateSignature
  },
  data() {
    return {
      navigation: [
        {
          step: 'create-signature',
          name: 'Create Signature',
          componentName: 'StepCreateSignature'
        }
      ],
      errors: null
    };
  },
  computed: {
    ...mapGetters('PMU', ['page']),
    componentName() {
      return this.navigation[this.page - 1].componentName;
    }
  },
  methods: {
    ...mapMutations('PMU', ['pageChange']),
    ...mapActions('PMU', []),
    previousStep() {
      if (this.page > 1) {
        this.pageChange(this.page - 1);
      } else if (this.page === 1) {
        this.$router.push({ name: 'PMUFlowStart' });
      }
    },
    nextStep() {
      let valid = true;
      const isThereValidationAtComponent = !!this.$refs[this.componentName].$v;
      if (isThereValidationAtComponent) {
        this.$refs[this.componentName].$v.$touch();
        valid = !this.$refs[this.componentName].$v.$invalid;
      }

      if (valid) {
        if (this.page < this.navigation.length) {
          this.pageChange(this.page + 1);
        } else {
          this.submit();
        }
      }
    },
    submit() {
      console.log('submit');
    }
  },
  watch: {
    componentName(step) {
      this.$router
        .push({ name: 'PMUFlowQuestions', params: { step } })
        .catch(() => {});
    },
    '$route.params.step': {
      immediate: true,
      handler() {
        const stepFromUrl = this.$route.params.step;
        const index = this.navigation.findIndex(
          nav => nav.step === stepFromUrl
        );

        if (index >= 0) {
          this.pageChange(index + 1);
        } else if (index < 0) {
          this.$router.push({ name: 'PMUFlowStart' });
        }
      }
    }
  }
};
</script>
