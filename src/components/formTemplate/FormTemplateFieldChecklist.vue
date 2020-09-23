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
        v-model="$v.model.value.$model"
        class="mb-4"
        placeholder="e.g. Check any that apply:"
        label="Question"
        rows="8"
        :error="$v.model.value.$error"
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

      <hr class="mb-2 border-on-background border-opacity-divider" />

      <div class="py-4 mb-4 rounded-lg">
        <div
          class="flex items-center pb-4 w-full"
          v-for="choice in $v.model.options.$model"
          :key="choice.key"
        >
          <MaterialInput
            class="flex-grow"
            :margin="null"
            label="Option"
            placeholder="e. g. I am pregnant or breastfeeding"
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

        <p
          class="text-error tg-body-mobile text-center"
          v-if="$v.model.options.$error"
        >
          At least one option is required
        </p>
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
import { randomId } from '@/helpers.js';
import { cloneDeep } from 'lodash-es';
import MaterialInput from '@/components/inputs/MaterialInput';
import IconDelete from '@/assets/icons/delete.svg';
import { minLength, required } from 'vuelidate/lib/validators';

export default {
  name: 'FormTemplateFieldChecklist',
  components: {
    TextAreaInput,
    CheckBox,
    IconDelete,
    MaterialInput
  },
  validations: {
    model: {
      options: {
        required,
        minLength: minLength(1),
        $each: {
          value: {
            required,
            minLength: minLength(1)
          }
        }
      },
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
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      // if the field is new, generate a random id
      const id = this.model.id || randomId(8);
      const field = {
        ...this.model,
        id
      };

      this.$emit('save', field);
    },

    choiceAdd() {
      this.$v.model.options.$reset();

      let choice = {
        value: null,
        key: randomId()
      };
      this.model.options.push(choice);
    },
    choiceRemove(key) {
      const index = this.model.options.findIndex(q => q.key === key);
      this.model.options.splice(index, 1);
    }
  }
};
</script>

<style scoped></style>
