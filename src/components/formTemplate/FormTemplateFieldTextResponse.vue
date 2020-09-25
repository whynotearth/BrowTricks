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

      <!-- :error="$v.model.value.$error" -->
      <TextAreaInput
        v-model="$v.model.value.$model"
        class="mb-4"
        placeholder="e.g. I am being treated for, or was in the past for the following conditions (Please include allergies, espcially to dye, pigment, or numbing agent.)"
        label="Question"
        rows="8"
      >
        <p v-if="!$v.model.value.required">
          Question is required
        </p>
      </TextAreaInput>

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
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'FormTemplateFieldTextResponse',
  components: { TextAreaInput, CheckBox },
  validations: {
    model: {
      value: {
        required
      }
    }
  },
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
      // this.$v.$touch();
      // if (this.$v.$invalid) {
      //   return;
      // }

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
