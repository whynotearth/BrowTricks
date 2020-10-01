import { get } from 'lodash-es';

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
    beforeSubmit() {
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
          'response.data[0].description'
        ]
      } = {}
    ) {
      this.clearErrors();
      console.log('Error in form submition:', get(error, 'response.data', ''));
      this.serverErrors = get(error, serverErrorsField, []);
      this.errorMessage = get(
        error,
        messageFields[0],
        get(
          error,
          messageFields[1],
          get(
            error,
            messageFields[2],
            get(error, messageFields[3], 'Something went wrong')
          )
        )
      );
    },
    clearErrors() {
      this.$v.$reset();
      this.errorMessage = '';
      this.serverErrors = [];
    }
  }
};