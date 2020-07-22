<template>
  <div class="px-4 text-left">
    <link
      href="https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap"
      rel="stylesheet"
    />
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

    <div class="shadow-1dp p-4 bg-surface mb-4 rounded-xl">
      <p class="tg-h3-mobile mb-4">
        Signed by: <span>{{ signature }}</span>
      </p>
      <p class="tg-dancing">{{ signature }}</p>
    </div>

    <div class="shadow-1dp p-4 bg-surface mb-4 rounded-xl">
      <p class="tg-h3-mobile mb-4">
        Initials: <span>{{ initials }}</span>
      </p>
      <p class="tg-dancing">{{ initials }}</p>
    </div>
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
