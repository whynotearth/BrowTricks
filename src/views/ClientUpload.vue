<template>
  <div
    class="mx-auto pt-4 text-on-background text-opacity-high text-left max-w-4xl"
  >
    <div class="flex text-left px-2 mb-4">
      <div class="flex-grow px-2 break-word">
        <!-- <TextAreaInput
          class="mb-4"
          v-model="$v.description.$model"
          :error="$v.description.$error"
          label="Description"
          rows="4"
        >
          <p v-if="!$v.description.required">
            Description is required
          </p>
        </TextAreaInput> -->

        <!-- chips -->
        <a
          @click.prevent="isOpenClientSelect = true"
          class="cursor-pointer"
          tabindex="0"
        >
          <BaseChip>
            <template #icon>
              <IconCheck
                v-if="selectedClientId"
                class="fill-current text-primary w-3 h-3"
              />
              <IconUser v-else class="fill-current text-primary w-3 h-3" />
            </template>
            Select Client
          </BaseChip>
        </a>
        <p
          v-if="$v.selectedClientId.$error"
          class="text-error tg-body-mobile mt-2 ml-4"
        >
          Client is required
        </p>
      </div>
      <div class="px-2">
        <div class="image-wrapper max-w-full" v-if="file">
          <BaseImagePreview
            v-if="file.resourceType === 'image'"
            :selectFile="() => {}"
            :file="{ ...file }"
          />
          <BaseVideoPreview
            v-if="file.resourceType === 'video'"
            :selectFile="() => {}"
            :file="{ ...file, thumbnail: getCloudinaryThumbnail(file.url) }"
          />
        </div>
      </div>
    </div>

    <hr
      v-if="isShareApiSupported"
      class="border-divider border-opacity-divider mb-4"
    />

    <div class="px-4">
      <div v-if="file && isShareApiSupported">
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
      :tenantSlug="tenantSlug"
      :isOpen="isOpenClientSelect"
      @close="isOpenClientSelect = false"
      @select="onSelectClient"
      :selectedId="selectedClientId"
    />
  </div>
</template>

<script>
import ClientSelectOverlay from '@/components/client/ClientSelectOverlay';
// // import TextAreaInput from '@/components/inputs/TextAreaInput';

import BaseImagePreview from '@/components/uploader/BaseImagePreview';
import BaseVideoPreview from '@/components/uploader/BaseVideoPreview';
import BaseChip from '@/components/BaseChip';
import { required } from 'vuelidate/lib/validators';
import IconUser from '@/assets/icons/person.svg';
import IconCheck from '@/assets/icons/check.svg';
import IconShare from '@/assets/icons/share.svg';
import { mapGetters, mapActions } from 'vuex';
import {
  share,
  isShareApiSupported,
  showOverlayAndRedirect,
  getCloudinaryThumbnail
} from '@/helpers.js';

export default {
  name: 'ClientUpload',
  data: () => ({
    isOpenClientSelect: false,
    description: '',
    file: null,
    selectedClientId: null
  }),
  validations: {
    selectedClientId: {
      required
    }
    // description: {
    //   required
    // }
  },
  created() {
    this.setDefaultSelectedClientId();
  },
  computed: {
    ...mapGetters('uploader', ['uploadedFilesGet']),
    isShareApiSupported,
    tenantSlug() {
      return this.$route.params.tenantSlug;
    }
  },
  components: {
    ClientSelectOverlay,
    // TextAreaInput,
    IconUser,
    IconCheck,
    BaseChip,
    IconShare,
    BaseImagePreview,
    BaseVideoPreview
  },
  beforeDestroy() {
    this.uploadedFilesUpdate([]);
  },
  beforeMount() {
    this.checkUploadedFileExistance();
    this.isOpenDrawerUploadUpdate(false);
  },
  methods: {
    ...mapActions('client', ['updateClient', 'fetchClient']),
    ...mapActions('uploader', [
      'uploadedFilesUpdate',
      'isOpenDrawerUploadUpdate'
    ]),
    share,
    getCloudinaryThumbnail,
    checkUploadedFileExistance() {
      if (!this.uploadedFilesGet[0]) {
        alert('No uploaded file.');
        this.$router.push({ name: 'TenantHome' });
        return;
      }
      this.file = this.uploadedFilesGet[0];
    },
    setDefaultSelectedClientId() {
      if (!this.$route.query.clientId) {
        return;
      }
      this.selectedClientId = this.$route.query.clientId;
    },
    onSelectClient(client) {
      this.selectedClientId = client.id;
    },
    async submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      let client;
      try {
        client = await this.fetchClient({
          params: {
            clientId: this.selectedClientId,
            tenantSlug: this.tenantSlug
          }
        });
      } catch (error) {
        alert('Error in getting client info');
        return;
      }

      const clientId = client.id;
      const filesAdapted = this.uploadedFilesGet.map(item => ({
        ...item,
        url: item.url,
        publicId: item.publicId
      }));
      const images = [
        ...client.images,
        ...filesAdapted.filter(item => item.resourceType === 'image')
      ];
      const videos = [
        ...client.videos,
        ...filesAdapted.filter(item => item.resourceType === 'video')
      ];
      const updatedInfo = {
        ...client,
        images,
        videos
      };
      this.updateClient({
        tenantSlug: this.tenantSlug,
        clientId,
        body: updatedInfo
      })
        .then(() => {
          showOverlayAndRedirect({
            title: 'Success!',
            route: { name: 'ClientEdit', params: { clientId } }
          });
        })
        .catch(error => {
          console.log('Update client error', error.response);
        });
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
