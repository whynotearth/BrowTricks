<template>
  <div class="px-8">
    <div class="py-10">
      <h4 class="tg-body-mobile text-on-background text-opacity-high">
        Link your Google account to get started!
      </h4>
    </div>
    <AuthButtons />
    <div
      v-if="!isAuthenticated && $v.isAuthenticated.$dirty"
      class="text-red-600 text-xs"
    >
      To go on with next step you should sign up.
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';
import AuthButtons from '@/components/auth/AuthButtons';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'LinkAccount',
  components: {
    AuthButtons
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'userName'])
  },
  validations: {
    isAuthenticated: {
      required,
      isValid: value => value === true
    }
  },
  async created() {
    if (this.$route.query.token) {
      await this.updateToken(this.$route.query.token);
    }

    if (this.isAuthenticated) {
      this.updateEmail(this.userName);
    }
    if (this.$route.query.emailVerified) {
      this.$emit('nextStep');
    }
  },
  methods: {
    ...mapActions('auth', ['updateToken']),
    ...mapMutations('tenant', ['updateEmail'])
  }
};
</script>
