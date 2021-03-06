import { get } from 'lodash-es';
import { mapActions } from 'vuex';

export default {
  data: () => ({
    serverErrors: {},
    errorMessage: '',
    loadingStatus: {
      submit: false
    }
  }),
  created() {
    this.clearErrors();
  },
  methods: {
    ...mapActions('loading', ['loadingUpdate']),
    beforeSubmit() {
      this.blurFocusedInput();
      this.clearErrors();

      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log('Form is invalid, will not submit.');
      }
      return !this.$v.$invalid;
    },
    onSubmitCatch(
      error,
      {
        serverErrorsField = 'response.data.errors',
        messageFields = [
          'response.data.error',
          'response.data.message',
          'response.data.title',
          'response.data[0].description',
          'message'
        ]
      } = {}
    ) {
      this.clearErrors();
      console.log(
        'Server error on form submition:',
        get(error, 'response.data', get(error, 'message', 'unknown'))
      );
      this.serverErrors = get(error, serverErrorsField, []);
      this.errorMessage =
        get(error, messageFields[0]) ||
        get(error, messageFields[1]) ||
        get(error, messageFields[2]) ||
        get(error, messageFields[3]) ||
        get(error, messageFields[4], 'Something went wrong');
    },
    clearErrors() {
      this.$v.$reset();
      this.errorMessage = '';
      this.serverErrors = [];
    },
    blurFocusedInput() {
      const focusedInput = document.querySelector('input:focus,textarea:focus');
      if (focusedInput) {
        const event = new Event('blur');
        focusedInput.dispatchEvent(event);
      }
    }
  }
};
