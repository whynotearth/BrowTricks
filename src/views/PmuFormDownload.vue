<template>
  <div class="max-w-4xl mx-auto px-4 pt-4">
    <div class="text-left p-2 text-on-background" v-if="client">
      <h2 class="tg-body-mobile py-2 text-center my-6 text-on-background">
        Signed PMU form for {{ client.firstName + ' ' + client.lastName }}
      </h2>
      <Button
        :href="pdfUrl"
        class="rounded-full mb-6 "
        title="Download Signed PMU"
      ></Button>

      <div class="text-center">
        <Button :to="{ name: 'Home' }" title="Go Home Page" theme="none" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'PmuFormDownload',
  props: ['tenantSlug', 'clientId', 'templateId'],
  created() {
    this.init();
  },
  data: () => ({
    client: null
  }),
  computed: {
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
    }
  }
};
</script>
