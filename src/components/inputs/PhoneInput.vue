<template>
  <FormGroup v-bind="$attrs" :validatorModel="validatorModel">
    <template #control>
      <div class="relative z-10">
        <pre>{{ validatorModel }}</pre>
        <VuePhoneNumberInput
          v-model="inputModel"
          :error="validatorModel.$error"
          color="#0D1F3C"
          valid-color="#22C38B"
          error-color="#E74323"
          :border-radius="0"
          :default-country-code="'US'"
          :preferred-countries="['US']"
          no-example
          v-on="$listeners"
          @update="onUpdateModel"
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
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import { randomId } from '@/helpers';

export default {
  name: 'PhoneInput',
  components: {
    VuePhoneNumberInput,
    FormGroup
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
      type: String,
      default: ''
    },
    validatorModel: {
      type: Object,
      default: () => ({})
    },
    // attrs: {
    //   type: Object,
    //   default: () => {}
    // },
    label: {
      type: String,
      default: 'Label'
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
        console.log('set', value);
        this.$emit('change', value);
        console.log('this.phoneModel.countryCallingCode', this.phoneModel);
        this.$emit('changeCountry', this.phoneModel.countryCallingCode);
      }
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
