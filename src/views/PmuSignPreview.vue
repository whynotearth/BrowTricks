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

        <div>
          <PmuPreSignPreview
            title="Here is your pre-set PMU form:"
            :clientId="clientId"
            :tenantSlug="tenantSlug"
          />
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
import Button from '@/components/inputs/Button.vue';
import PmuPreSignPreview from '@/components/pmu/PmuPreSignPreview.vue';
import { showOverlayAndRedirect } from '@/helpers';

export default {
  name: 'PmuSignPreview',
  components: {
    PmuPreSignPreview,
    Button
  },
  props: ['tenantSlug', 'clientId', 'templateId'],
  created() {
    this.init();
  },
  data: () => ({
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
    ...mapActions('formTemplate', ['templatesFetch']),
    async init() {
      this._fetchClient();
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
      if (!this.templateId) {
        alert('Something went wrong, No template has chosen');
        return;
      }
      this.$router.push({
        name: 'PmuSignFlow',
        params: { templateId: this.templateId }
      });
    }
  }
};
</script>
