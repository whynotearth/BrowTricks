<template>
  <!-- TODO rename questions to disclosures (or something meaningful and more general) everywhere -->
  <div class="max-w-4xl mx-auto px-4">
    <div class="text-left p-2 text-on-background">
      <template v-if="isPmuIncomplete">
        <h2
          class="tg-body-mobile mb-2 py-2 text-on-background text-opacity-high"
        >
          Here is your pre-set PMU form:
        </h2>
        <div class="max-w-md mx-auto mb-6">
          <BaseSlider>
            <div class="slide keen-slider__slide">
              <img
                src="https://res.cloudinary.com/whynotearth/image/upload/v1596652148/BrowTricks/static_v2/pmu-default-form-p1_yuk6bh.jpg"
                alt=""
              />
            </div>
            <div class="slide keen-slider__slide">
              <img
                src="https://res.cloudinary.com/whynotearth/image/upload/v1596652147/BrowTricks/static_v2/pmu-default-form-p2_r8a4yj.jpg"
                alt=""
              />
            </div>
          </BaseSlider>
        </div>

        <hr class="border-white border-opacity-divider mb-6" />

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
import BaseSlider from '@/components/BaseSlider.vue';
import Button from '@/components/inputs/Button.vue';
import { showOverlayAndRedirect } from '@/helpers';

export default {
  name: 'PmuSign',
  components: {
    BaseSlider,
    Button
  },
  props: ['tenantSlug', 'clientId'],
  created() {
    this._fetchClient();
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
    ...mapActions('client', ['fetchClient', 'pmuSignNotify']),

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
  @apply bg-white;
}
</style>
