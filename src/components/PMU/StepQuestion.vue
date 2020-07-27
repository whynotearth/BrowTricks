<template>
  <div class="text-left">
    <div class="mb-4" v-html="question"></div>
    <div v-for="(field, fieldIndex) in fields" :key="fieldIndex">
      <div v-if="field.type === 'radio'">
        <RadioInput
          @updateSelectedOption="answerUpdate(field.name, model[field.name])"
          class="mb-2"
          v-for="(option, radioIndex) in field.options"
          :key="radioIndex"
          v-model="model[field.name]"
          :value="option"
        />
      </div>

      <div v-if="field.type === 'textarea'">
        <TextArea
          :label="field.label"
          @input="answerUpdate(field.name, model[field.name])"
          class="mb-2"
          v-model="model[field.name]"
        />
      </div>

      <div v-if="field.type === 'input'">
        <MaterialInput
          :label="field.label"
          @input="answerUpdate(field.name, model[field.name])"
          class="mb-2"
          v-model="model[field.name]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RadioInput from '@/components/inputs/RadioInput.vue';
import TextArea from '@/components/inputs/TextArea.vue';
import MaterialInput from '@/components/inputs/MaterialInput.vue';
export default {
  name: 'StepQuestion',
  data: () => ({
    model: []
  }),
  components: { RadioInput, TextArea, MaterialInput },
  props: {
    question: String,
    fields: {
      type: Array,
      required: true
    }
  },
  methods: {
    answerUpdate(field, value) {
      this.$emit('answerUpdate', { field, value });
    }
  }
};
</script>

<style scoped></style>
