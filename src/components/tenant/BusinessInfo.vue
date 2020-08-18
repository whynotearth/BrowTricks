<template>
  <div class="px-6">
    <MaterialInput
      v-model="$v.name.$model"
      label="Name"
      :error="$v.name.$error"
    >
      <span v-if="!$v.name.required">
        Name is required
      </span>
    </MaterialInput>
    <MaterialInput
      v-model="$v.phone.$model"
      label="Phone number"
      :error="$v.phone.$error"
    >
      <p v-if="!$v.phone.required">
        This field is required
      </p>
      <p v-else-if="!$v.phone.isPhoneNumberValid">
        Phone number is not valid, it should be a US phone number
      </p>
    </MaterialInput>
    <TextArea v-model="$v.description.$model" label="Description" />
    <hr class="border-on-background border-opacity-divider my-8" />
    <MediaManager
      :maxFiles="1"
      :files="currentImages"
      @change="_updateLogo"
      :uploadPreset="uploadPreset"
    >
      <template #uploadButton>
        <MediaUploader
          :files="currentImages"
          @change="_updateLogo"
          :uploadPreset="uploadPreset"
        />
      </template>

      <template #title>
        <div class="tg-body-mobile ">
          <span class="text-on-background text-opacity-high"> Logo </span>
          <span class="text-on-background text-opacity-medium">
            ( 500 x 600 pixels JPEG / PNG )
          </span>
        </div>
      </template>
    </MediaManager>
    <span v-if="$v.logo.$dirty && $v.logo.$error" class="text-error text-xs">
      Logo is required
    </span>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import { required, minLength } from 'vuelidate/lib/validators';
import MaterialInput from '@/components/inputs/MaterialInput';
import TextArea from '@/components/inputs/TextArea.vue';
import MediaManager from '@/components/uploader/MediaManager.vue';
import MediaUploader from '@/components/uploader/MediaUploader.vue';
import { isPhoneNumberValid } from '@/helpers';

export default {
  name: 'BusinessInfo',
  components: {
    MaterialInput,
    TextArea,
    MediaManager,
    MediaUploader
  },
  data() {
    return {
      uploadPreset: process.env.VUE_APP_UPLOADER_IMAGE_PRESET
    };
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
        url: {
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
    currentImages() {
      if (!this.getLogo) {
        return [];
      }
      return [{ url: this.getLogo, resourceType: 'image' }];
    }
  },
  methods: {
    ...mapMutations('tenant', [
      'updateName',
      'updatePhone',
      'updateDescription',
      'updateLogo'
    ]),
    _updateLogo(images) {
      const lastIndex = images.length - 1;
      const logo = images[lastIndex] ? images[lastIndex].url : '';
      this.updateLogo(logo);
    }
  }
};
</script>
