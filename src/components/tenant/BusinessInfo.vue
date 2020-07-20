<template>
  <div class="px-6">
    <material-input
      v-model="$v.name.$model"
      label="Name"
      :error="$v.name.$dirty && !$v.name.required"
    >
      <span
        v-if="$v.name.$dirty && !$v.name.required"
        class="text-red-600 text-xs"
      >
        Name is required
      </span>
    </material-input>
    <material-input
      v-model="$v.phone.$model"
      label="Phone number"
      :error="$v.phone.$dirty && (!$v.phone.required || !$v.phone.minLength)"
    >
      <span
        v-if="$v.phone.$dirty && !$v.phone.required"
        class="text-red-600 text-xs"
      >
        Phone number is required
      </span>
      <span
        v-if="
          $v.phone.$dirty &&
            (!$v.phone.minLength || !$v.phone.isPhoneNumberValid)
        "
        class="text-red-600 text-xs"
      >
        Please enter a valid phone number
      </span>
    </material-input>
    <text-area v-model="$v.description.$model" label="Description" />
    <hr class="border-on-background border-opacity-divider my-8" />
    <ImageUpload v-model="logo" :defaultImages="logo">
      <template #title>
        <div class="tg-body-mobile ">
          <span class="text-on-background text-opacity-high"> Logo </span>
          <span class="text-on-background text-opacity-medium">
            ( 500 x 599 pixels JPEG / PNG )
          </span>
        </div>
      </template>
    </ImageUpload>
    <span v-if="$v.logo.$dirty && $v.logo.$error" class="text-red-600 text-xs">
      Logo is required
    </span>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import { required, minLength } from 'vuelidate/lib/validators';
import MaterialInput from '@/components/inputs/MaterialInput';
import TextArea from '@/components/inputs/TextArea.vue';
import ImageUpload from '@/components/imageUpload/ImageUpload.vue';
import { isPhoneNumberValid } from '@/helpers';

export default {
  name: 'BusinessInfo',
  components: {
    MaterialInput,
    TextArea,
    ImageUpload
  },
  data() {
    return {};
  },
  validations: {
    name: {
      required
    },
    phone: {
      required,
      minLength: minLength(10),
      isPhoneNumberValid
    },
    description: {},
    logo: {
      $each: {
        secure_url: {
          required
        }
      }
    }
  },
  computed: {
    ...mapGetters('tenant', [
      'getName',
      'getPhone',
      'getDescription',
      'getLogo'
    ]),
    name: {
      get() {
        return this.getName;
      },
      set(value) {
        this.updateName(value);
      }
    },
    phone: {
      get() {
        return this.getPhone;
      },
      set(value) {
        this.updatePhone(value);
      }
    },
    description: {
      get() {
        return this.getDescription;
      },
      set(value) {
        this.updateDescription(value);
      }
    },
    logo: {
      get() {
        return [{ secure_url: this.getLogo }];
      },
      set(value) {
        this.updateLogo(value[0] ? value[0].secure_url : '');
      }
    }
  },
  methods: {
    ...mapMutations('tenant', [
      'updateName',
      'updatePhone',
      'updateDescription',
      'updateLogo'
    ])
  }
};
</script>
