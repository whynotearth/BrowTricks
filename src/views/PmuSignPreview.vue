<template>
  <!-- TODO rename questions to disclosures (or something meaningful and more general) everywhere -->
  <div class="max-w-4xl mx-auto px-4 pt-4">
    <div class="text-left p-2 text-on-background" v-if="client">
      <template v-if="!pdfUrl">
        <!-- send sms -->
        <Button
          v-if="hasPhoneNumber"
          class="rounded-full mb-6 "
          @clicked="sendSms"
          :title="`Text to ${client.phoneNumber}`"
          :disabled="!client.phoneNumber"
        ></Button>

        <!-- disabled send sms -->
        <Button
          v-else
          class="rounded-full mb-6 "
          title="No phone number provided to send text"
          :disabled="!client.phoneNumber"
          theme="none"
        ></Button>

        <Button
          class="rounded-full mb-6 "
          @clicked="submit"
          title="Get Started"
        ></Button>

        <hr class="border-divider border-opacity-divider mb-6" />

        <div>
          <PmuFormEmptyPreview
            title="Here is your pre-set PMU form:"
            :clientId="clientId"
            :tenantSlug="tenantSlug"
            :templateId="templateId"
          />
        </div>
      </template>

      <template v-else>
        <h2 class="tg-body-mobile py-2 text-center my-6 text-on-background">
          You have already signed the PMU
        </h2>
        <Button
          :href="pdfUrl"
          class="rounded-full mb-6 "
          title="Download Signed PMU"
        ></Button>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Button from '@/components/inputs/Button.vue';
import PmuFormEmptyPreview from '@/components/pmu/PmuFormEmptyPreview.vue';
import { showOverlayAndRedirect } from '@/helpers';

export default {
  name: 'PmuSignPreview',
  components: {
    PmuFormEmptyPreview,
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
    hasPhoneNumber() {
      return this.client.phoneNumber;
    },
    pdfUrl() {
      if (!this.client) {
        return undefined;
      }
      const signature = this.client.signatures.find(
        sig => sig.formTemplateId === Number(this.templateId)
      );
      return signature && signature.pdfUrl;
    }
  },
  methods: {
    ...mapActions('loading', ['loadingUpdate']),
    ...mapActions('client', [
      'fetchClient',
      'pmuSendFormLink',
      'pmuEmptyPreview'
    ]),
    ...mapActions('formTemplate', ['templatesFetch']),
    init() {
      this._fetchClient();
    },
    async _fetchClient() {
      this.loadingUpdate(true);

      this.client = await this.fetchClient({
        params: {
          clientId: this.clientId,
          tenantSlug: this.tenantSlug
        }
      }).catch(() => {
        alert('Error in getting client');
      });

      this.loadingUpdate(false);
    },
    sendSms() {
      const path = this.$router.resolve({
        name: 'PmuSignFromNotify'
      }).href;
      const callbackUrl = `${window.location.origin}${path}`;
      console.log('callbackUrl', callbackUrl);
      this.pmuSendFormLink({
        params: {
          clientId: this.clientId,
          tenantSlug: this.tenantSlug,
          templateId: this.templateId,
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
