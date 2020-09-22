<template>
  <div>
    <div class="px-4">
      <h2 class="tg-h3-mobile text-on-background text-opacity-high mb-2">
        Agreement Request
      </h2>

      <p class="text-on-background text-opacity-medium tg-body-mobile mb-6">
        Add an agreement request to your form so your clients can agree to your
        terms.
      </p>

      <TextAreaInput
        v-model="model.value"
        class="mb-4"
        placeholder="By selecting this box, I agree that I have read and understood the instructions given to me."
        label="Question"
        labelBackground="bg-background has-noise"
        rows="8"
      />

      <CheckBox
        class="block mb-8"
        v-model="model.isRequired"
        :value="true"
        label="This question is required"
      />

      <Button class="rounded-full mb-4" title="Save" @clicked="save" />

      <Button
        class="mt-8"
        textColor="text-error"
        title="Delete Question"
        theme="none"
        @clicked="remove"
      />
    </div>
  </div>
</template>

<script>
import TextAreaInput from '@/components/inputs/TextAreaInput';
import CheckBox from '@/components/inputs/CheckBox';

import { randomId } from '@/helpers.js';
import { cloneDeep } from 'lodash-es';

export default {
  name: 'FormTemplateFieldAgreementRequest',
  components: { TextAreaInput, CheckBox },
  props: {
    initialModel: null
  },
  data: () => ({
    model: {
      isRequired: false,
      value: ''
    }
  }),
  created() {
    this.model = cloneDeep(this.initialModel);
  },
  methods: {
    remove() {
      this.$emit('remove');
    },
    save() {
      // if the field is new, generate a random id
      const id = this.model.id || randomId(8);
      const field = {
        ...this.model,
        id
      };
      this.$emit('save', field);
    }
  }
};
</script>

<style scoped></style>
