<template>
  <div>
    <div class="px-4">
      <h2 class="tg-h3-mobile text-on-background text-opacity-high mb-2">
        Text Response
      </h2>

      <p class="text-on-background text-opacity-medium tg-body-mobile mb-6">
        Add a text response question to your form so your clients can type in
        their answers.
      </p>

      <TextAreaInput
        v-model="model.value"
        class="mb-4"
        placeholder="e.g. I am being treated for, or was in the past for the following conditions (Please include allergies, espcially to dye, pigment, or numbing agent.)"
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
import Button from '@/components/inputs/Button';
import { randomId } from '@/helpers.js';
import { adaptApiTemplateFieldItemToModelCard } from '@/services/formTemplate.js';
import { cloneDeep } from 'lodash-es';

export default {
  name: 'FormTemplateFieldChecklist',
  components: { TextAreaInput, CheckBox, Button },
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
      const field = adaptApiTemplateFieldItemToModelCard({
        ...this.model,
        id
      });
      this.$emit('save', field);
    }
  }
};
</script>

<style scoped></style>
