<template>
  <FormGroup v-bind="$attrs" :validatorModel="validatorModel">
    <template #control>
      <div class="label-wrapper relative z-10">
        <label
          :for="idName"
          class="label text-opacity-high text-sm block -mb-2 relative z-10"
          :class="[labelColor]"
        >
          {{ label }}
        </label>
        <VueTelInput
          wrapperClasses="input-wrapper outline-none text-opacity-medium focus:text-opacity-high transition-colors duration-200"
          inputClasses="input outline-none bg-transparent appearance-none pt-3 pb-2"
          mode="international"
          :preferredCountries="['US']"
          v-model="inputModel"
          :inputId="idName"
        />
      </div>
    </template>

    <template #error>
      <div class="text-error tg-body-mobile mt-2" v-if="validatorModel.$error">
        <slot />
      </div>
    </template>
  </FormGroup>
</template>

<script>
import FormGroup from '@/components/inputs/FormGroup.vue';
import { VueTelInput } from 'vue-tel-input';
import { randomId } from '@/helpers';

export default {
  name: 'PhoneInput',
  components: {
    VueTelInput,
    FormGroup
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    validatorModel: {
      type: Object,
      default: () => ({})
    },
    label: {
      type: String,
      default: 'Mobile Number'
    },
    idName: {
      type: String,
      default: randomId
    }
  },
  computed: {
    inputModel: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('change', value);
      }
    },
    labelColor() {
      if (this.validatorModel.$error) {
        return 'text-error';
      }
      return 'text-on-background';
    }
  },
  methods: {
    onUpdateModel(phoneModel) {
      console.log('phoneModel', phoneModel);
      this.phoneModel = phoneModel;
    }
  }
};
</script>

<style scoped>
.input-wrapper.input-wrapper {
  border-width: 0 0 1px 0;
  @apply rounded-none border-on-surface border-opacity-medium;
}
.input-wrapper.input-wrapper:focus-within {
  box-shadow: none;
  @apply border-on-surface border-opacity-high;
}
/deep/ .vti__dropdown {
  @apply outline-none;
}
/deep/ .vti__dropdown:focus-visible {
  outline: 2px solid black;
}
/deep/ .vti__dropdown:hover,
/deep/ .vti__dropdown:focus {
  background: none;
}
</style>
