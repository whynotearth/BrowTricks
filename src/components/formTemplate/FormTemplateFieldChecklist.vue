<style scoped></style>
<template>
  <div>
    <div class="px-4">
      <h2 class="tg-h3-mobile text-on-background text-opacity-high mb-2">
        Checklist
      </h2>

      <p class="text-on-background text-opacity-medium tg-body-mobile mb-6">
        Add a checklist to your form so your clients can select all options that
        apply.
      </p>

      <TextAreaInput
        v-model="model.value"
        class="mb-4"
        placeholder="e.g. Check any that apply:"
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

      <hr class="mb-2 border-on-background border-opacity-divider" />

      <div class="py-4 mb-4 rounded-lg">
        <div
          class="flex items-center pb-4 w-full"
          v-for="choice in model.options"
          :key="choice.key"
        >
          <MaterialInput
            class="flex-grow"
            :margin="null"
            label="Option"
            placeholder="e. g. I am pregnant or breastfeeding"
            labelBackground="has-noise bg-background"
            v-model.trim="choice.value"
          />

          <a
            @click.prevent.stop="choiceRemove(choice.key)"
            href="#"
            class="flex justify-end ml-4"
            title="Delete the above disclosure"
          >
            <IconDelete
              class="text-on-background text-opacity-medium w-6 h-6"
            />
          </a>
        </div>

        <a
          tabindex="0"
          @click="choiceAdd"
          class="text-primary tg-color-label-mobile text-center py-2 w-full block cursor-pointer"
          >Add Option</a
        >
      </div>

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
import { cloneDeep } from 'lodash-es';
import MaterialInput from '@/components/inputs/MaterialInput';
import IconDelete from '@/assets/icons/delete.svg';

export default {
  name: 'FormTemplateFieldChecklist',
  components: {
    TextAreaInput,
    CheckBox,
    Button,
    IconDelete,
    MaterialInput
  },
  props: {
    initialModel: null
  },
  data: () => ({
    model: {
      options: [],
      isRequired: false,
      value: ''
    }
  }),
  created() {
    this.model = { ...this.model, ...cloneDeep(this.initialModel) };
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
    },

    choiceAdd() {
      let choice = {
        value: null,
        key: randomId()
      };
      this.model.options.push(choice);
    },
    choiceRemove(key) {
      const index = this.sentences.findIndex(q => q.key === key);
      this.sentences.splice(index - 1, 1);
    }
  }
};
</script>

<style scoped></style>
