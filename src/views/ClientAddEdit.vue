<template>
  <div class="text-left">
    <div
      class="min-h-screen bg-background w-full flex flex-col justify-between"
    >
      <div>
        <StepperTop :navigation="navigation" :page="page" />
        <div class="my-4">
          <transition name="fade" mode="out-in">
            <keep-alive>
              <component
                :is="component"
                :ref="component"
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
            navigation[page] && page < navigation.length
              ? 'NEXT STEP'
              : 'FINISH'
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
import { mapMutations, mapActions, mapState } from 'vuex';
import StepperTop from '@/components/BaseStepperTopBar';
import StepperBottom from '@/components/BaseStepperBottomBar';
import BasicInfo from '@/components/client/BasicInfo';
import Notifications from '@/components/client/Notifications';

export default {
  name: 'ClientAddEdit',
  components: {
    StepperTop,
    StepperBottom,
    BasicInfo,
    Notifications
  },
  props: {
    tenantSlug: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      navigation: [
        {
          step: 'basic-info',
          name: 'Basic Info'
        },
        {
          step: 'notifications',
          name: 'Notifications'
        }
      ],
      errors: null
    };
  },
  computed: {
    ...mapState('client', ['page']),
    component() {
      return this.navigation[this.page - 1].step;
    }
  },
  methods: {
    ...mapMutations('client', ['pageChange', 'resetClientInfo']),
    ...mapActions('client', ['createClient']),
    ...mapActions('auth', ['ping']),
    previousStep() {
      if (this.page > 1) {
        this.pageChange(this.page - 1);
      } else if (this.page === 1) {
        this.resetClientInfo();
        this.goClientList();
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
          this.register();
        }
      }
    },
    register() {
      this.createClient({
        tenantSlug: this.tenantSlug
      })
        .then(() => {
          this.goClientList();
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    goClientList() {
      this.$router.push({
        name: 'ClientList',
        params: { tenantSlug: this.tenantSlug }
      });
    }
  },
  watch: {
    component(step) {
      this.$router
        .push(
          this.$route.params.clientId
            ? {
                name: 'EditClient',
                params: {
                  step,
                  tenantSlug: this.tenantSlug,
                  clientId: this.$route.params.clientId
                }
              }
            : {
                name: 'AddClient',
                params: { step, tenantSlug: this.tenantSlug }
              }
        )
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
          this.goClientList();
        }
      }
    }
  }
};
</script>
