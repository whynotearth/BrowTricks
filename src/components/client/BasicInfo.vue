<template>
  <div class="px-6">
    <material-input
      v-model="$v.firstName.$model"
      label="First Name"
      :error="$v.firstName.$dirty && !$v.firstName.required"
    >
      <span
        v-if="$v.firstName.$dirty && !$v.firstName.required"
        class="text-error text-xs"
      >
        First Name is required
      </span>
    </material-input>
    <material-input
      v-model="$v.lastName.$model"
      label="Last Name"
      :error="$v.lastName.$dirty && !$v.lastName.required"
    >
      <span
        v-if="$v.lastName.$dirty && !$v.lastName.required"
        class="text-error text-xs"
      >
        Last Name is required
      </span>
    </material-input>
    <MaterialInput
      v-model="$v.phone.$model"
      label="Phone number"
      :error="$v.phone.$error"
    >
      <p
        v-if="!$v.phone.required"
        class="text-error tg-body-mobile"
      >
        This field is required
      </p>
      <p
        v-else-if="!$v.phone.isPhoneNumberValid"
        class="text-error tg-body-mobile"
      >
        Phone number is not valid, it should be a US phone number
      </p>
    </MaterialInput>
    <material-input
      v-model="$v.email.$model"
      label="Email"
      :error="$v.email.$dirty && (!$v.email.required || !$v.email.email)"
    >
      <span
        v-if="$v.email.$dirty && !$v.email.required"
        class="text-error text-xs"
      >
        Email is required
      </span>
      <span
        v-if="$v.email.$dirty && !$v.email.email"
        class="text-error text-xs"
      >
        Please enter a email address
      </span>
    </material-input>
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
