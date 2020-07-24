<template>
  <div class="px-6">
    <div class="my-4">
      <h6 class="tg-body-mobile text-on-background text-opacity-high">
        Select client's preferred notification method:
      </h6>
    </div>
    <div>
      <div
        class="my-8"
        v-for="(notificationType, key) in notificationTypes"
        :key="key"
      >
        <CheckBox
          v-model="selectedNotificationTypes"
          :value="notificationType.id"
        >
          <template #label>
            <div class="tg-body-mobile flex flex-wrap">
              <span class="mx-1 text-on-background text-opacity-high">{{
                notificationType.name
              }}</span>
              <span
                class="mx-1 text-on-background text-opacity-medium break-all"
                >({{ clientDetail[notificationType.key] }})</span
              >
            </div>
          </template>
        </CheckBox>
      </div>
      <div
        v-if="
          $v.selectedNotificationTypes.$dirty &&
            $v.selectedNotificationTypes.$invalid
        "
        class="text-red-600 text-xs"
      >
        You should provide at least one notification method.
      </div>
    </div>
  </div>
</template>

<script>
import CheckBox from '@/components/inputs/CheckBox';
import { mapState, mapMutations } from 'vuex';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'Notifications',
  components: { CheckBox },
  data() {
    return {};
  },
  validations: {
    selectedNotificationTypes: {
      required
    }
  },
  computed: {
    ...mapState('tenant', ['notificationTypes']),
    ...mapState('client', ['clientInfo']),
    selectedNotificationTypes: {
      get() {
        return this.clientInfo.notificationTypes;
      },
      set(value) {
        this.updateSelectedNotificationTypes(value);
      }
    },
    clientDetail() {
      return {
        email: this.clientInfo.email,
        phone: this.clientInfo.phoneNumber
      };
    }
  },
  methods: {
    ...mapMutations('client', ['updateSelectedNotificationTypes'])
  }
};
</script>
