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
            title="Upload"
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
    description: {}
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
    BaseImagePreview,
    BaseVideoPreview
  },
  beforeMount() {
    this.checkUploadedFileExistance();
    this.openDrawerUploadUpdate(false);
  },
  methods: {
    ...mapActions('client', ['fetchClient', 'videoAdd', 'imageAdd']),
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
      const regex = /@[A-Za-z0-9.\s]+-[A-Za-z0-9.\s]+\s/g;
      const found = this.description.match(regex);
      if (found) {
        this.description = this.description.replace(
          regex,
          `@${client.firstName}-${client.lastName} `
        );
      } else {
        this.description += `@${client.firstName}-${client.lastName} `;
      }
    },
    async submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      const client = await this._fetchClient(this.selectedClientId);
      const media = this.uploadedFilesGet[0];
      const method =
        media.resourceType === 'image'
          ? this.imageAdd
          : media.resourceType === 'video'
          ? this.videoAdd
          : null;

      if (!method) {
        console.log('Unknown media type.');
        return;
      }
      method({
        params: {
          tenantSlug: this.tenantSlug,
          body: {
            clientId: client.id,
            [media.resourceType]: media,
            description: this.description
          }
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
