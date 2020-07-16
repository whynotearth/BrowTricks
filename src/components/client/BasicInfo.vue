<template>
  <div class="px-6">
    <material-input
      v-model="$v.firstName.$model"
      label="First Name"
      :error="$v.firstName.$dirty && !$v.firstName.required"
    >
      <span
        v-if="$v.firstName.$dirty && !$v.firstName.required"
        class="text-red-600 text-xs"
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
        class="text-red-600 text-xs"
      >
        Last Name is required
      </span>
    </material-input>
    <material-input
      v-model="$v.phone.$model"
      label="Phone Number"
      :error="$v.phone.$dirty && (!$v.phone.required || !$v.phone.minLength)"
    >
      <span
        v-if="$v.phone.$dirty && !$v.phone.required"
        class="text-red-600 text-xs"
      >
        Phone number is required
      </span>
      <span
        v-if="$v.phone.$dirty && !$v.phone.minLength"
        class="text-red-600 text-xs"
      >
        Please enter a valid phone number
      </span>
    </material-input>
    <material-input
      v-model="$v.email.$model"
      label="Email"
      :error="$v.email.$dirty && (!$v.email.required || !$v.email.email)"
    >
      <span
        v-if="$v.email.$dirty && !$v.email.required"
        class="text-red-600 text-xs"
      >
        Email is required
      </span>
      <span
        v-if="$v.email.$dirty && !$v.email.email"
        class="text-red-600 text-xs"
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
      minLength: minLength(7)
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
