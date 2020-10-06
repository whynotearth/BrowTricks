<template>
  <PageContentBoard>
    <div
      class="mx-auto pt-4 text-on-background text-opacity-high text-left max-w-2xl"
    >
      <div class="flex items-stretch px-2 mb-6">
        <!-- description -->
        <div class="flex-grow px-2 break-word flex flex-col">
          <TextAreaInput
            class="flex-grow"
            :margin="null"
            v-model="$v.description.$model"
            :validatorModel="$v.description"
            label="Description"
            rows="4"
          >
            <p v-if="!$v.description.required">
              Description is required
            </p>
          </TextAreaInput>

          <div>
            <!-- chips -->
            <a
              @click.prevent="isOpenClientSelect = true"
              class="cursor-pointer"
              tabindex="0"
              aria-label="Select client"
              title="Select client"
            >
              <BaseChip>
                <template #icon>
                  <IconCheck
                    v-if="selectedClientId"
                    class="fill-current text-on-surface w-3 h-3"
                  />
                  <IconUser
                    v-else
                    class="fill-current text-on-surface w-3 h-3"
                  />
                </template>
                Client
              </BaseChip>
            </a>
            <p
              v-if="$v.selectedClientId.$error"
              class="text-error tg-body-mobile mt-2"
            >
              Client is required
            </p>
          </div>
        </div>

        <!-- media -->
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

      <div class="px-4">
        <div>
          <Button
            :isRounded="true"
            title="Post"
            @clicked="submit"
            background="bg-brand2"
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
  </PageContentBoard>
</template>

<script>
import ClientSelectOverlay from '@/components/client/ClientSelectOverlay';
import PageContentBoard from '@/components/PageContentBoard';
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
    },
    description: {
      required
    }
  },
  created() {
    this.setDefaultSelectedClient();
  },
  computed: {
    ...mapGetters('uploader', ['uploadedFilesGet']),
    tenantSlug() {
      return this.$route.params.tenantSlug;
    }
  },
  components: {
    PageContentBoard,
    ClientSelectOverlay,
    IconUser,
    IconCheck,
    BaseChip,
    IconShare,
    BaseImagePreview,
    BaseVideoPreview
  },
  beforeMount() {
    this.checkUploadedFileExistance();
    this.openDrawerUploadUpdate(false);
  },
  methods: {
    ...mapActions('client', ['updateClient', 'fetchClient']),
    ...mapActions('uploader', ['openDrawerUploadUpdate']),
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
    async setDefaultSelectedClient() {
      if (!this.$route.query.clientId) {
        return;
      }

      this.selectedClientId = this.$route.query.clientId;
      const client = await this._fetchClient(this.selectedClientId);
      this.onSelectClient(client);
    },
    async _fetchClient(clientId) {
      return await this.fetchClient({
        params: {
          clientId,
          tenantSlug: this.tenantSlug
        }
      }).catch(() => {
        console.log('Could not get client info.');
      });
    },
    onSelectClient(client) {
      this.selectedClientId = client.id;
      this.description += `@${client.firstName}-${client.lastName}`;
    },
    async submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      const client = await this._fetchClient(this.selectedClientId);

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
        params: {
          tenantSlug: this.tenantSlug,
          clientId: client.id,
          body: updatedInfo
        }
      })
        .then(() => {
          showOverlayAndRedirect({
            title: 'Success!',
            route: { name: 'ClientInfo', params: { clientId: client.id } }
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
  width: 160px;
}
</style>
