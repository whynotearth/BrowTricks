<template>
  <!-- todo: remove -->
  <div class="">
    <div class="min-h-vh100 w-full flex flex-col justify-between">
      <!-- isModalOpen for business hours -->
      <div :class="[isModalOpen ? 'z-50' : 'z-30']">
        <StepperTop :navigation="navigation" :page="page" />
        <div>
          <transition name="fadeslow" mode="out-in">
            <keep-alive>
              <component
                :is="component"
                :ref="component"
                @nextStep="nextStep"
                @modalToggled="onModalToggled"
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
            navigation[page] && page < navigation.length
              ? 'NEXT STEP'
              : 'FINISH'
          }`
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
import Notifications from '@/components/tenant/Notifications';
import BusinessHours from '@/components/tenant/BusinessHours';
import PaymentMethods from '@/components/tenant/PaymentMethods';

export default {
  name: 'SignUpForm',
  components: {
    StepperTop,
    StepperBottom,
    BusinessInfo,
    Notifications,
    BusinessHours,
    PaymentMethods
  },
  data() {
    return {
      isModalOpen: false,
      navigation: [
        {
          step: 'business-info',
          name: 'Business Info'
        },
        {
          step: 'notifications',
          name: 'Notifications'
        },
        {
          step: 'business-hours',
          name: 'Business Hours'
        },
        {
          step: 'payment-methods',
          name: 'Payment Methods'
        }
      ],
      errors: null
    };
  },
  computed: {
    ...mapGetters('tenant', ['page']),
    ...mapGetters('auth', ['isAuthenticated', 'userName']),
    component() {
      return this.navigation[this.page - 1].step;
    }
  },
  created() {
    this.updateEmail(this.userName);
  },
  methods: {
    ...mapMutations('tenant', ['pageChange', 'updateEmail']),
    ...mapActions('tenant', ['createTenant']),
    onModalToggled(isModalOpen) {
      this.isModalOpen = isModalOpen;
    },
    previousStep() {
      if (this.page > 1) {
        this.pageChange(this.page - 1);
      } else if (this.page === 1) {
        this.$router.push({ name: 'PanelRedirector' });
      }
    },
    nextStep() {
      let valid = true;
      const isThereValidationAtComponent = !!this.$refs[this.component].$v;
      if (isThereValidationAtComponent) {
        this.$refs[this.component].$v.$touch();
        valid = !this.$refs[this.component].$v.$invalid;
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
      this.createTenant()
        .then(slug => {
          this.$router.push({
            name: 'FormTemplatesListEmpty',
            params: { tenantSlug: slug }
          });
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  },
  watch: {
    component(step) {
      this.$router
        .push({ name: 'TenantSignup', params: { step } })
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
          console.log('a problem in watch step occured');
        }
      }
    }
  }
};
</script>
