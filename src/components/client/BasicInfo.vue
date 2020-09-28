<template>
  <div class="px-6 pb-20">
    <MaterialInput
      v-model.trim="$v.firstName.$model"
      label="First Name"
      :error="$v.firstName.$error"
      theme="light"
    >
      <p v-if="!$v.firstName.required">
        First Name is required
      </p>
    </MaterialInput>
    <MaterialInput
      v-model.trim="$v.lastName.$model"
      label="Last Name"
      :error="$v.lastName.$error"
      theme="light"
    >
      <p v-if="!$v.lastName.required">
        Last Name is required
      </p>
    </MaterialInput>
    <MaterialInput
      v-model.trim="$v.phone.$model"
      label="Phone number"
      :error="$v.phone.$error"
      theme="light"
    >
      <p v-if="!$v.phone.required">
        This field is required
      </p>
      <p v-else-if="!$v.phone.isPhoneNumberValid">
        Phone number is not valid, it should be a US phone number
      </p>
    </MaterialInput>
    <MaterialInput
      v-model.trim="$v.email.$model"
      label="Email"
      :error="$v.email.$error"
      theme="light"
    >
      <p v-if="!$v.email.required">
        Email is required
      </p>
      <p v-else-if="!$v.email.email">
        Please enter an email address
      </p>
    </MaterialInput>
  </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators';
import MaterialInput from '@/components/inputs/MaterialInput';
import { mapState, mapMutations } from 'vuex';
import { isPhoneNumberValid } from '@/helpers';

export default {
  name: 'BasicInfo',
  components: {
    MaterialInput
  },
  data() {
    return {};
  },
  validations: {
    firstName: {
      required
    },
    lastName: {
      required
    },
    phone: {
      required,
      minLength: minLength(10),
      isPhoneNumberValid
    },
    email: {
      required,
      email
    }
  },
  computed: {
    ...mapState('client', ['clientInfo']),
    firstName: {
      get() {
        return this.clientInfo.firstName;
      },
      set(value) {
        this.updateFirstName(value);
      }
    },
    lastName: {
      get() {
        return this.clientInfo.lastName;
      },
      set(value) {
        this.updateLastName(value);
      }
    },
    phone: {
      get() {
        return this.clientInfo.phoneNumber;
      },
      set(value) {
        this.updatePhone(value);
      }
    },
    email: {
      get() {
        return this.clientInfo.email;
      },
      set(value) {
        this.updateEmail(value);
      }
    }
  },
  methods: {
    ...mapMutations('client', [
      'updateFirstName',
      'updateLastName',
      'updatePhone',
      'updateEmail'
    ])
  }
};
</script>
