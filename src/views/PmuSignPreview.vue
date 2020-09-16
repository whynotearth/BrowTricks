<template>
  <!-- TODO rename questions to disclosures (or something meaningful and more general) everywhere -->
  <div class="max-w-4xl mx-auto px-4 pt-4">
    <div class="text-left p-2 text-on-background" v-if="client">
      <template v-if="!pmuPdfUrl">
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
      // FIXME: find signed pmu with this.$route.params.templateId in client.signatures
      return this.client.signatures[0];
    }
  },
  methods: {
    ...mapActions('client', [
      'fetchClient',
      'pmuSendFormLink',
      'pmuEmptyPreview'
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
