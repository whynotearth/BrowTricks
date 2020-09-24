<template>
  <div class="text-left">
    <SignUpForm />
  </div>
</template>

<script>
import SignUpForm from '@/components/auth/SignUpForm.vue';
import { mapMutations } from 'vuex';

export default {
  name: 'TenantSignup',
  components: {
    SignUpForm
  },
  methods: {
    ...mapMutations('tenant', ['resetCreateTenantForm'])
  },
  destroyed() {
    this.resetCreateTenantForm();
  }
};
</script>
