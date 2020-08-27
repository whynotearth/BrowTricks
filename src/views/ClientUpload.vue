<template>
  <div class="container mx-auto pt-4">
    <div class="flex text-on-background text-left">
      <div class="px-2 flex-grow">
        <TextArea
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
        </TextArea>

        <!-- chips -->
        <a @click.prevent="openClients" class="cursor-pointer">
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TextArea from '@/components/inputs/TextArea';
import BaseImagePreview from '@/components/uploader/BaseImagePreview';
import BaseChip from '@/components/BaseChip';
import { required } from 'vuelidate/lib/validators';
import IconUser from '@/assets/icons/person.svg';

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
  components: { TextArea, IconUser, BaseChip, BaseImagePreview },
  beforeMount() {
    console.log('in client upload', this.uploadedFilesGet);
    this.file = this.uploadedFilesGet[0];
  },
  methods: {
    openClients() {
      console.log('openClients...');
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
