<template>
  <div class="px-4 text-left">
    <MaterialInput
      class="flex-grow"
      v-model.trim="signature"
      @input="updateAnswer({ field: 'signature', value: signature })"
      label="Signature"
      labelBg="bg-surface"
    >
      <span
        v-if="$v.signature.$dirty && !$v.signature.required"
        class="text-red-600 text-xs"
      >
        Signature is required
      </span>
    </MaterialInput>
    <MaterialInput
      class="flex-grow"
      v-model.trim="initials"
      @input="updateAnswer({ field: 'initials', value: initials })"
      label="Initials"
      labelBg="bg-surface"
    >
      <span
        v-if="$v.initials.$dirty && !$v.initials.required"
        class="text-red-600 text-xs"
      >
        Initials is required
      </span>
    </MaterialInput>
  </div>
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
    updateAnswer(data) {
      this.$emit('updateAnswer', data);
    }
  }
};
</script>

<style scoped></style>
