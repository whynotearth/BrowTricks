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
              <IconCheck
                v-if="selectedClient"
                class="fill-current text-primary w-3 h-3"
              />
              <IconUser v-else class="fill-current text-primary w-3 h-3" />
            </template>
            Select Client
          </BaseChip>
        </a>
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
            :file="{ ...file, thumbnail: getCloudinaryVideoThumbnail(file) }"
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
      :selected="selectedClient"
    />
  </div>
</template>

<script>
import ClientSelectOverlay from '@/components/client/ClientSelectOverlay';
import TextAreaInput from '@/components/inputs/TextAreaInput';
import Button from '@/components/inputs/Button';
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
  getCloudinaryVideoThumbnail
} from '@/helpers.js';

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
    isShareApiSupported,
    tenantSlug() {
      return this.$route.params.tenantSlug;
    }
  },
  components: {
    ClientSelectOverlay,
    Button,
    TextAreaInput,
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
    if (!this.uploadedFilesGet[0]) {
      alert('No uploaded file.');
      this.$router.push({ name: 'TenantHome' });
    }
    this.file = this.uploadedFilesGet[0];
  },
  methods: {
    ...mapActions('client', ['updateClient', 'fetchClient']),
    ...mapActions('uploader', ['uploadedFilesUpdate']),
    share,
    getCloudinaryVideoThumbnail,
    onSelectClient(client) {
      this.selectedClient = client;

      this.description =
        this.description + client.firstName + ' ' + client.lastName;
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
            clientId: this.selectedClient.id,
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
