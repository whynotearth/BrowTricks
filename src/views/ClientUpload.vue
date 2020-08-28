<template>
  <div
    class="container mx-auto pt-4 text-on-background text-opacity-high text-left"
  >
    <div class="flex text-left px-2 mb-4">
      <div class="flex-grow px-2 break-word">
        <TextAreaInput
          class="mb-4"
          v-model="$v.description.$model"
          :error="$v.description.$error"
          label="Description"
          labelBackground="has-noise bg-background"
          rows="4"
        >
          <p v-if="!$v.selectedClient.required">
            Select a client please
          </p>

          <p v-else-if="!$v.description.required">
            Description is required
          </p>
        </TextAreaInput>

        <!-- chips -->
        <a
          @click.prevent="isOpenClientSelect = true"
          class="cursor-pointer"
          tabindex="0"
        >
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

    <hr
      v-if="isShareApiSupported"
      class="border-divider border-opacity-divider mb-4"
    />

    <div class="px-4">
      <div v-if="isShareApiSupported">
        <h2 class="mb-4 tg-body-mobile">Share:</h2>
        <a
          @click="share(file)"
          tabindex="0"
          class="cursor-pointer block rounded-full w-10 h-10 bg-secondary flex justify-center items-center mb-6"
        >
          <IconShare
            class="fill-current text-on-secondary text-opacity-medium"
          />
        </a>
      </div>
      <div>
        <Button
          :isRounded="true"
          title="Post"
          theme="btnprimary"
          @clicked="submit"
        ></Button>
      </div>
    </div>

    <ClientSelectOverlay
      :isOpen="isOpenClientSelect"
      @close="isOpenClientSelect = false"
      @select="onSelectClient"
    />
  </div>
</template>

<script>
import ClientSelectOverlay from '@/components/client/ClientSelectOverlay';
import TextAreaInput from '@/components/inputs/TextAreaInput';
import Button from '@/components/inputs/Button';
import BaseImagePreview from '@/components/uploader/BaseImagePreview';
import BaseChip from '@/components/BaseChip';
import { required } from 'vuelidate/lib/validators';
import IconUser from '@/assets/icons/person.svg';
import IconShare from '@/assets/icons/share.svg';
import { mapGetters } from 'vuex';
import { share, isShareApiSupported } from '@/helpers.js';

export default {
  name: 'ClientUpload',
  data: () => ({
    isOpenClientSelect: false,
    description: '',
    file: null,
    selectedClient: null
  }),
  validations: {
    selectedClient: {
      required
    },
    description: {
      required
    }
  },
  computed: {
    ...mapGetters('uploader', ['uploadedFilesGet']),
    isShareApiSupported
  },
  components: {
    ClientSelectOverlay,
    Button,
    TextAreaInput,
    IconUser,
    BaseChip,
    IconShare,
    BaseImagePreview
  },
  beforeMount() {
    this.file = this.uploadedFilesGet[0];
  },
  methods: {
    share,
    onSelectClient(client) {
      this.selectedClient = client;

      this.description =
        this.description + client.firstName + ' ' + client.lastName;
    },
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
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
