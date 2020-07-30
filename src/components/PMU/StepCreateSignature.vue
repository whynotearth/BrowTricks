<template>
  <form class="px-4 text-left" @submit.prevent="submit">
    <MaterialInput
      class="flex-grow"
      v-model.trim="signature"
      @input="answerUpdate({ field: { name: 'signature' }, value: signature })"
      label="Signature"
      :error="$v.signature.$error"
    >
      <p v-if="!$v.signature.required" class="text-error tg-body-mobile">
        Signature is required
      </p>
    </MaterialInput>
    <MaterialInput
      class="flex-grow"
      v-model.trim="initials"
      @input="answerUpdate({ field: { name: 'initials' }, value: initials })"
      label="Initials"
      :error="$v.initials.$error"
    >
      <p v-if="!$v.initials.required" class="text-error tg-body-mobile">
        Initials is required
      </p>
    </MaterialInput>

    <!-- preview -->
    <div class="shadow-1dp p-4 bg-surface mb-4 rounded-xl">
      <p class="tg-h3-mobile mb-4">
        Signed by: <span>{{ signature }}</span>
      </p>
      <p class="tg-dancing-desktop">{{ signature }}</p>
    </div>

    <div class="shadow-1dp p-4 bg-surface mb-4 rounded-xl">
      <p class="tg-h3-mobile mb-4">
        Initials: <span>{{ initials }}</span>
      </p>
      <p class="tg-dancing-desktop">{{ initials }}</p>
    </div>

    <!-- for submiting by keyboard -->
    <button class="hidden">submit</button>
  </form>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import MaterialInput from '@/components/inputs/MaterialInput.vue';

export default {
  name: 'StepCreateSignature',
  components: { MaterialInput },
  validations: {
    signature: {
      required
    },
    initials: {
      required
    }
  },
  data: () => ({
    signature: '',
    initials: ''
  }),
  methods: {
    answerUpdate(data) {
      this.$emit('answerUpdate', data);
    },
    submit() {
      this.$emit('nextStep');
    }
  }
};
</script>

<style scoped></style>
