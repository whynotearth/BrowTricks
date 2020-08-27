<template>
  <div
    class="container mx-auto pt-4 text-on-background text-opacity-high text-left"
  >
    <div class="flex text-left px-2">
      <div class="flex-grow px-2 break-word">
        <TextAreaInput
          class="mb-4"
          v-model="$v.description.$model"
          :error="$v.description.$error"
          label="Description"
          labelBackground="has-noise bg-background"
          rows="4"
        >
          <p v-if="!$v.description.required">
            Description is required
          </p>
        </TextAreaInput>

        <!-- chips -->
        <a @click.prevent="openClients" class="cursor-pointer" tabindex="0">
          <BaseChip>
            <template #icon>
              <IconUser class="fill-current text-primary w-3 h-3" />
            </template>
            Client
          </BaseChip>
        </a>
      </div>
      <div class="px-2">
        <div class="image-wrapper max-w-full">
          <BaseImagePreview
            v-if="file.resourceType === 'image'"
            :selectFile="() => {}"
            :file="{ ...file }"
          />
        </div>
      </div>
    </div>

    <hr class="border-divider border-opacity-divider my-4" />

    <div class="px-4">
      <div>
        <h2 class="mb-4 tg-body-mobile">Share:</h2>
        <a
          tabindex="0"
          class="cursor-pointer block rounded-full w-10 h-10 bg-secondary flex justify-center items-center mb-6"
        >
          <IconShare
            class="fill-current text-on-secondary text-opacity-medium"
          />
        </a>

        <Button
          :isRounded="true"
          title="Post"
          theme="btnprimary"
          @clicked="submit"
        ></Button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TextAreaInput from '@/components/inputs/TextAreaInput';
import Button from '@/components/inputs/Button';
import BaseImagePreview from '@/components/uploader/BaseImagePreview';
import BaseChip from '@/components/BaseChip';
import { required } from 'vuelidate/lib/validators';
import IconUser from '@/assets/icons/person.svg';
import IconShare from '@/assets/icons/share.svg';

export default {
  name: 'ClientUpload',
  data: () => ({
    description: '',
    file: null
  }),
  validations: {
    description: {
      required
    }
  },
  computed: {
    ...mapGetters('uploader', ['uploadedFilesGet'])
  },
  components: {
    Button,
    TextAreaInput,
    IconUser,
    BaseChip,
    IconShare,
    BaseImagePreview
  },
  beforeMount() {
    console.log('in client upload', this.uploadedFilesGet);
    this.file = this.uploadedFilesGet[0];
  },
  methods: {
    openClients() {
      console.log('openClients...');
    },
    submit() {
      console.log('submit...');
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
