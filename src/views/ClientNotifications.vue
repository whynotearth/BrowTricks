<template>
  <div class="max-w-md mx-auto">
    <div>
      <!-- loop over available notification types -->

      <div
        v-for="(notificationType, key) in notificationTypes"
        class="my-8"
        :key="key"
      >
        <CheckBox
          v-model="$v.selectedNotificationTypes.$model"
          :value="notificationType.id"
        >
          <template #label>
            <div class="tg-body-mobile flex flex-wrap">
              <span class="mx-1 text-on-newbackground text-opacity-high">{{
                notificationType.name
              }}</span>
              <span
                class="mx-1 text-on-newbackground text-opacity-medium break-all"
                >({{ clientDetail[notificationType.key] }})</span
              >
            </div>
          </template>
        </CheckBox>
      </div>
      <div
        v-if="$v.selectedNotificationTypes.$error"
        class="text-error tg-body-mobile"
      >
        You should provide at least one notification method.
      </div>
    </div>

    <div class="mt-4 pb-6">
      <Button
        class="rounded-full"
        title="Save"
        @clicked="updateClientNotification"
      />
    </div>
  </div>
</template>

<script>
import Button from '@/components/inputs/Button.vue';
import { mapGetters, mapActions } from 'vuex';
import CheckBox from '@/components/inputs/CheckBox';
import { required } from 'vuelidate/lib/validators';
import { showOverlayAndRedirect } from '@/helpers';

export default {
  name: 'ClientNotifications',
  props: {
    client: {
      type: Object,
      default: () => ({})
    },
    tenantSlug: {
      type: String,
      required: true
    },
    clientId: {
      type: [String, Number],
      required: true
    }
  },
  validations: {
    selectedNotificationTypes: {
      required
    }
  },
  components: {
    CheckBox,
    Button
  },
  data() {
    return { selectedNotificationTypes: [] };
  },
  computed: {
    ...mapGetters('client', ['clientInfo']),
    ...mapGetters('tenant', ['notificationTypes']),
    clientDetail() {
      return {
        email: this.client.email,
        phone: this.client.phoneNumber
      };
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions('client', ['updateClient']),
    init() {
      this.selectedNotificationTypes = this.client.notificationTypes;
    },
    updateClientNotification() {
      this.updateClient({
        tenantSlug: this.tenantSlug,
        clientId: this.clientId,
        body: {
          ...this.client,
          notificationTypes: this.selectedNotificationTypes
        }
      }).then(async () => {
        showOverlayAndRedirect({
          title: 'Success!',
          message: 'Client notifications changed successfully',
          route: { name: 'ClientEdit' }
        });
      });
    }
  }
};
</script>
