<template>
  <div class="flex flex-col items-center text-left w-full">
    <div
      class="flex-grow w-full bg-surface rounded-t-xl px-4 py-8 flex flex-col items-center"
    >
      <form
        @submit.prevent="submit"
        novalidate
        class="flex flex-col w-full max-w-sm flex-grow justify-between"
      >
        <h2 class="tg-h3-mobile text-on-background text-opacity-high mb-3">
          Enter the code sent to your number
        </h2>
        <div class="flex flex-row justify-evenly" ref="otpContainer">
          <MaterialInput
            class="w-full"
            v-model.trim="$v.verifyCode.$model"
            label="Code"
            type="tel"
            :attrs="{
              pattern: '[0-9]*',
              autocomplete: 'one-time-code',
              inputmode: 'numeric',
              enterkeyhint: 'send'
            }"
            :validatorModel="$v.verifyCode"
          >
            <p v-if="!$v.verifyCode.required">
              Code is required
            </p>
            <p v-if="!$v.verifyCode.numeric">
              Code should be a number
            </p>
          </MaterialInput>
        </div>

        <p v-if="errorMessage" class="mb-4 text-error tg-body-mobile">
          {{ errorMessage }}
        </p>

        <div>
          <Button type="submit" title="Verify" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import MaterialInput from '@/components/inputs/MaterialInput.vue';
import { required, numeric } from 'vuelidate/lib/validators';
import { mapActions, mapGetters } from 'vuex';
import { showOverlayAndRedirect } from '@/helpers';
import { get } from 'lodash-es';
import formGeneralUtils from '@/mixins/formGeneralUtils.js';

export default {
  name: 'AuthNumberVerify',
  // NOTE: we use a mixin
  mixins: [formGeneralUtils],
  components: {
    MaterialInput
  },
  data() {
    return {
      verifyCode: ''
    };
  },
  validations: {
    verifyCode: {
      required,
      numeric
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'isPhoneNumberConfirmedGet'])
  },
  created() {
    this.clearErrors();
    this.init();
  },
  methods: {
    ...mapActions('loading', ['loadingUpdate']),
    ...mapActions('auth', [
      'register',
      'requestVerifyCode',
      'submitVerifyCode'
    ]),
    async init() {
      if (!this.isAuthenticated) {
        this.goLogin();
        return;
      }

      if (this.isPhoneNumberConfirmedGet) {
        this.goPanelRedirector();
        return;
      }

      this.loadingUpdate(true);
      await this._requestVerifyCode();
      this.loadingUpdate(false);
    },
    clearError() {
      this.errorMessage = '';
    },
    _requestVerifyCode() {
      return this.requestVerifyCode({
        // params: {
        //   body: {
        //     tenantSlug: optional
        //     phoneNumber: (can be ignored)
        //   }
        // }
      })
        .then(() => {
          console.log('Code sent');
        })
        .catch(this.onSubmitCatch);
    },
    submit() {
      if (!this.beforeSubmit()) {
        return;
      }

      this.submitVerifyCode({
        params: { body: { token: this.verifyCode } }
      })
        .then(this.onSuccess)
        .catch(error => {
          this.errorMessage = get(
            error,
            'response.data[0].description',
            'Something went wrong'
          );
        });
    },
    onSuccess() {
      showOverlayAndRedirect({
        title: 'Success!',
        route: { name: 'PanelRedirector' }
      });
    },
    goLogin() {
      console.log('Login first, then verify');
      this.$router.replace({ name: 'AuthLogin' });
    },
    goPanelRedirector() {
      this.$router.replace({ name: 'PanelRedirector' });
    }
  }
};
</script>
