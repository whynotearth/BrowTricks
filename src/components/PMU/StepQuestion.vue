<template>
  <!-- TODO: validation -->
  <form class="text-left" @submit.prevent="submit">
    <div class="mb-4" v-html="question"></div>
    <div v-for="(field, fieldIndex) in fields" :key="fieldIndex">
      <div v-if="field.type === 'radio'">
        <RadioInput
          @updateSelectedOption="
            answerUpdate(field, model[field.name], field.onSelect)
          "
          class="mb-8"
          v-for="(option, radioIndex) in field.options"
          :key="radioIndex"
          v-model="model[field.name]"
          :label="option.label"
          :value="option.value"
          :error="$v.model[field.name].$error"
        />
        <p
          v-if="$v.model[field.name].$error && !$v.model[field.name].required"
          class="text-error tg-body-mobile mt-2"
        >
          {{ field.errorMessages.required }}
        </p>
      </div>

      <div v-if="field.type === 'checkbox'">
        <CheckBox
          v-for="(option, checkboxIndex) in field.options"
          :key="field.name + checkboxIndex"
          @update="answerUpdate(field, model[field.name], field.onSelect)"
          v-model="model[field.name]"
          :label="option.label"
          :value="model[field.name]"
          :checked="model[field.name]"
        />
        <p
          v-if="
            $v.model[field.name].$error && !$v.model[field.name].shouldBeTrue
          "
          class="text-error tg-body-mobile mt-2"
        >
          {{ field.errorMessages.shouldBeTrue }}
        </p>
      </div>

      <div v-if="field.type === 'textarea'">
        <TextArea
          :label="field.label"
          @input="answerUpdate(field, model[field.name])"
          class="mb-2"
          v-model="model[field.name]"
          @keyup.ctrl.enter="submit"
          :error="$v.model[field.name].$error"
        />
        <p
          v-if="$v.model[field.name].$error && !$v.model[field.name].required"
          class="text-error tg-body-mobile mt-2"
        >
          {{ field.errorMessages.required }}
        </p>
      </div>

      <!-- <pre>{{ $v.model[field.name] }}</pre> -->

      <div v-if="field.type === 'input'">
        <MaterialInput
          :label="field.label"
          @input="answerUpdate(field, model[field.name])"
          v-model="model[field.name]"
          :error="$v.model[field.name].$error"
        >
          <p
            v-if="!$v.model[field.name].required"
            class="text-error tg-body-mobile"
          >
            {{ field.errorMessages.required }}
          </p>
          <p
            v-else-if="!$v.model[field.name].isPhoneNumberValid"
            class="text-error tg-body-mobile"
          >
            {{ field.errorMessages.isPhoneNumberValid }}
          </p>
        </MaterialInput>
      </div>
    </div>

    <!-- for submitting by keyboard -->
    <button type="submit" class="hidden">submit</button>
  </form>
</template>

<script>
import RadioInput from '@/components/inputs/RadioInput.vue';
import CheckBox from '@/components/inputs/CheckBox.vue';
import TextArea from '@/components/inputs/TextArea.vue';
import MaterialInput from '@/components/inputs/MaterialInput.vue';
import { isFunction } from 'lodash-es';

export default {
  name: 'StepQuestion',
  data: () => ({
    model: []
  }),
  validations() {
    const model = this.fields.reduce((acc, field) => {
      return {
        ...acc,
        [field.name]: field.validations || {}
      };
    }, {});

    return {
      model
    };
  },
  components: { RadioInput, CheckBox, TextArea, MaterialInput },
  props: {
    question: String,
    fields: {
      type: Array,
      required: true
    },
    validations: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    answerUpdate(field, value, onSelect) {
      this.$emit('answerUpdate', { field, value });
      if (isFunction(onSelect)) {
        const vm = this;
        // a micro delay before going to next step to let user see the result
        setTimeout(() => {
          onSelect(this.$emit, vm);
        }, 80);
      }
    },
    submit() {
      this.$emit('nextStep');
    }
  }
};
</script>

<style scoped></style>
