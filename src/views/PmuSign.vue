<template>
  <!-- TODO rename questions to disclosures (or something meaningful and more general) everywhere -->
  <div class="max-w-4xl mx-auto px-4 pt-4">
    <div class="text-left p-2 text-on-background">
      <template v-if="isPmuIncomplete">
        <Button
          v-if="shouldShowSms"
          class="rounded-full mb-6 "
          @clicked="sendSms"
          :title="`Text to ${client.phoneNumber}`"
        ></Button>

        <Button
          class="rounded-full mb-6 "
          @clicked="submit"
          title="Get Started"
        ></Button>

        <hr class="border-divider border-opacity-divider mb-6" />

        <div v-if="imagePreview">
          <h2
            class="tg-body-mobile mb-2 py-2 text-on-background text-opacity-high"
          >
            Here is your pre-set PMU form:
          </h2>
          <div class="max-w-4xl mx-auto mb-6">
            <img :src="imagePreview" alt="" />
          </div>
        </div>
        <div v-else>
          <p class="tg-body-mobile text-on-background text-opacity-medium">
            Generating preview...
          </p>
        </div>
      </template>

      <template v-else-if="pmuPdfUrl">
        <h2 class="tg-body-mobile py-2 text-center my-6 text-on-background">
          You have already signed the PMU
        </h2>
        <Button
          :href="pmuPdfUrl"
          class="rounded-full mb-6 "
          @clicked="submit"
          title="Download Signed PMU"
        ></Button>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
// // import BaseSlider from '@/components/BaseSlider.vue';
import Button from '@/components/inputs/Button.vue';
import { showOverlayAndRedirect } from '@/helpers';

export default {
  name: 'PmuSign',
  components: {
    // BaseSlider,
    Button
  },
  props: ['tenantSlug', 'clientId'],
  created() {
    this.init();
  },
  data: () => ({
    imagePreview: '',
    client: null
  }),
  computed: {
    shouldShowSms() {
      if (this.$route.name === 'PmuSignFromNotify') {
        return false;
      }
      return !!this.client.phoneNumber;
    },
    pmuPdfUrl() {
      if (!this.client) {
        return null;
      }
      return this.client.pmuPdfUrl;
    },
    isPmuIncomplete() {
      if (!this.client) {
        return false;
      }
      return this.client.pmuStatus === 'incomplete';
    }
  },
  methods: {
    ...mapActions('client', [
      'fetchClient',
      'pmuSignNotify',
      'pmuPreSignPreview'
    ]),
    async init() {
      await this._fetchClient();
      this._pmuPreSignPreview();
    },

    async _pmuPreSignPreview() {
      this.imagePreview = await this.pmuPreSignPreview({
        params: {
          clientId: this.clientId,
          tenantSlug: this.tenantSlug
        }
      });
    },
    async _fetchClient() {
      this.client = await this.fetchClient({
        params: {
          clientId: this.clientId,
          tenantSlug: this.tenantSlug
        }
      }).catch(() => {
        alert('Error in getting client');
      });
    },
    sendSms() {
      const path = this.$router.resolve({
        name: 'PmuSignFromNotify'
      }).href;
      const callbackUrl = `${window.location.origin}${path}`;
      console.log('callbackUrl', callbackUrl);
      this.pmuSignNotify({
        params: {
          clientId: this.clientId,
          tenantSlug: this.tenantSlug,
          callbackUrl
        }
      }).then(() => {
        showOverlayAndRedirect({
          title: 'Message Sent Successfully!',
          route: { name: 'ClientEdit' }
        });
      });
    },
    async submit() {
      this.$router.push({ name: 'PmuSignFlow' });
    }
  }
};
</script>

<style scoped>
.slide {
  align-items: flex-start;
  @apply bg-white;
}
</style>
