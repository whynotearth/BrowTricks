<template>
  <FormGroup v-bind="$attrs" :validatorModel="validatorModel">
    <template #control>
      <div class="relative z-10">
        <VuePhoneNumberInput
          :error="validatorModel.$error"
          color="#0D1F3C"
          valid-color="#22C38B"
          error-color="#E74323"
          :default-country-code="value.countryCode"
          :border-radius="0"
          :preferred-countries="['US']"
          v-model="inputModel"
          @update="onUpdateModel"
          @phone-number-blur="onBlur"
          v-on="$listeners"
          :show-code-on-list="false"
          no-example
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
// import MaterialInput from '@/components/inputs/MaterialInput';
import FormGroup from '@/components/inputs/FormGroup.vue';
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import { randomId } from '@/helpers';

export default {
  name: 'PhoneInput',
  components: {
    VuePhoneNumberInput,
    FormGroup
    // MaterialInput
  },
  data: () => ({
    phoneModel: {}
  }),
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    validatorModel: {
      type: Object,
      default: () => ({})
    },
    attrs: {
      type: Object,
      default: () => {}
    },
    label: {
      type: String,
      default: 'Label'
    },
    type: {
      type: String,
      default: 'text'
    },
    idName: {
      type: String,
      default: randomId
    }
  },
  computed: {
    inputModel: {
      get() {
        return this.value.phoneNumber;
      },
      set(value) {
        console.log('value', value);
        // this.$emit('change', value);
      }
    }
  },
  methods: {
    onBlur() {
      //
    },
    onUpdateModel(phoneModel) {
      this.$emit('change', phoneModel);
    }
  }
};
</script>
