<template>
  <FormGroup v-bind="$attrs" :validatorModel="validatorModel">
    <template #control>
      <div class="relative">
        <label
          for="phone_number"
          class="block label mt-3 cursor-text text-sm -mb-2 z-10 relative"
          >Phone Number</label
        >
        <div class="relative rounded-md shadow-sm">
          <div class="absolute inset-y-0 left-0 flex items-center">
            <select
              aria-label="Country"
              class="form-select h-full py-0 pl-3 pr-7 outline-none border-transparent bg-transparent text-gray-500 sm:text-sm sm:leading-5"
            >
              <option>US</option>
              <option>CA</option>
              <option>EU</option>
            </select>
          </div>
          <input
            v-bind="attrs"
            :id="idName"
            type="tel"
            class="form-input block w-full pl-16 pt-3 pb-2 outline-none border-b border-on-surface text-opacity-medium focus:text-opacity-high border-opacity-medium focus:border-opacity-high rounded-none"
            :value="value | trim"
            v-on="inputListeners"
            :placeholder="placeholder"
          />
        </div>
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
import MaterialInput from '@/components/inputs/MaterialInput';
import FormGroup from '@/components/inputs/FormGroup.vue';
export default {
  name: 'PhoneInput',
  components: { FormGroup, MaterialInput },
  computed: {
    placeholder() {
      return {
        us: '+1 (555) 987-6543'
      };
    }
  },
  props: {}
};
</script>
