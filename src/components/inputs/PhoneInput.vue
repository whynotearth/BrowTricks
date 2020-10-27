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
            id="phone_number"
            class="form-input block w-full pl-16 pt-3 pb-2 outline-none border-b border-on-surface text-opacity-medium focus:text-opacity-high border-opacity-medium focus:border-opacity-high rounded-none"
            placeholder="+1 (555) 987-6543"
          />
        </div>
      </div>
    </template>
  </FormGroup>
</template>

<script>
import MaterialInput from '@/components/inputs/MaterialInput';
import FormGroup from '@/components/inputs/FormGroup.vue';
export default {
  name: 'PhoneInput',
  components: { FormGroup, MaterialInput }
};
</script>

<style scoped></style>
