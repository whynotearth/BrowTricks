<template>
  <div class="max-w-md mx-auto">
    <div class="mt-4 py-6">
      <Button
        class="rounded-full mb-4"
        :title="`Text to ${client.phoneNumber}`"
        @clicked="sendSms"
      />

      <!-- <Button class="rounded-full" title="Text" @clicked="sendEmail" /> -->

      <Button
        class="rounded-full"
        title="Complete In Person"
        :to="{ name: 'PmuSign' }"
      />
    </div>
  </div>
</template>

<script>
import Button from '@/components/inputs/Button.vue';
import { mapActions } from 'vuex';
import { showOverlayAndRedirect } from '@/helpers.js';

export default {
  name: 'PmuSignMethods',
  props: ['client', 'clientId', 'tenantSlug'],
  components: { Button },
  methods: {
    ...mapActions('PMU', ['notify']),
    sendSms() {
      const path = this.$router.resolve({
        name: 'PmuSignFromNotify'
      }).href;
      const callbackUrl = `${window.location.origin}${path}`;
      console.log('callbackUrl', callbackUrl);
      this.notify({
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
    sendEmail() {
      console.log('TODO: send email');
    }
  }
};
</script>
