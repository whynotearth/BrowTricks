<template>
  <div>
    <div class="px-4">
      <div>
        <h2 class="tg-h3-mobile text-on-background text-opacity-high mb-2">
          Upload
        </h2>

        <p class="text-on-background text-opacity-medium tg-body-mobile mb-6">
          Add a caption for your upload.
        </p>
      </div>
    </div>

    <!-- text and preview -->
    <div class="flex text-left px-2 mb-4">
      <div class="flex-grow px-2 break-word">
        <TextAreaInput
          v-model="$v.model.value.$model"
          class="mb-4"
          placeholder="e.g. Check any that apply:"
          label="Question"
          rows="7"
          :error="$v.model.value.$error"
        >
          <p v-if="!$v.model.value.required">
            Description is required
          </p>
        </TextAreaInput>
      </div>
      <div class="image-wrapper max-w-full" v-if="file">
        <BaseImagePreview
          :selectFile="() => {}"
          :file="{ ...file }"
          :thumbnail="getCloudinaryThumbnail(file.url)"
        />
      </div>
    </div>

    <div class="px-4">
      <CheckBox
        class="block mb-8"
        v-model="model.isRequired"
        :value="true"
        label="This question is required"
      />

      <Button class="rounded-full mb-4" title="Save" @clicked="save" />

      <Button
        class="mt-8"
        textColor="text-error"
        title="Delete Question"
        :background="null"
        @clicked="remove"
      />
    </div>
  </div>
</template>

<script>
import TextAreaInput from '@/components/inputs/TextAreaInput';
import CheckBox from '@/components/inputs/CheckBox';
import BaseImagePreview from '@/components/uploader/BaseImagePreview';
import { cloneDeep, get } from 'lodash-es';
import { required } from 'vuelidate/lib/validators';
import { mapActions, mapGetters } from 'vuex';
import { getCloudinaryThumbnail, randomId } from '@/helpers.js';

export default {
  name: 'FormTemplateFieldUpload',
  components: {
    BaseImagePreview,
    TextAreaInput,
    CheckBox
  },
  validations: {
    model: {
      value: {
        required
      }
    }
  },
  props: {
    initialModel: null
  },
  data: () => ({
    file: null,
    model: {
      options: [],
      isRequired: false,
      value: ''
    }
  }),
  computed: {
    ...mapGetters('uploader', ['uploadedFilesGet'])
  },
  created() {
    this.model = { ...this.model, ...cloneDeep(this.initialModel) };
    if (this.model.draft) {
      this.checkUploadedFileExistance();
      this.openDrawerUploadUpdate(false);
    } else {
      this.file = { url: get(this.model, 'options[0].value') };
    }
  },
  beforeDestroy() {
    this.uploadedFilesUpdate([]);
  },
  methods: {
    ...mapActions('uploader', [
      'uploadedFilesUpdate',
      'openDrawerUploadUpdate'
    ]),
    getCloudinaryThumbnail,
    checkUploadedFileExistance() {
      if (!this.uploadedFilesGet[0]) {
        console.log('No new uploaded file.');
        return;
      }
      this.file = this.uploadedFilesGet[0];
      this.model.options = [{ value: this.file.url, key: randomId(8) }];
    },
    remove() {
      this.$emit('remove');
    },
    save() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      // if the field is new, generate a random id
      const id = this.model.id || randomId(8);
      const field = {
        ...this.model,
        id
      };
      this.$emit('save', field);
    }
  }
};
</script>

<style scoped>
.image-wrapper {
  width: 120px;
  height: 168px;
}
</style>
