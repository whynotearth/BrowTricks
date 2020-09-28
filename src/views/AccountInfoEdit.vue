<template>
  <div class="max-w-md mx-auto">
    <div
      class="flex flex-col text-on-background text-opacity-high"
      v-if="tenant"
    >
      <AccountEditRow rowKey="Name" :rowValue="tenant.name" />
      <AccountEditRow rowKey="Username" />
      <AccountEditRow rowKey="Tags" />
      <AccountEditRow rowKey="Description" />
      <AccountEditRow rowKey="Loction" />
      <hr class="border-divider border-opacity-divider" />
      <AccountEditRow rowKey="Instagram" />
      <AccountEditRow rowKey="Facebook" />
      <AccountEditRow rowKey="WhatsApp" />
      <AccountEditRow rowKey="YouTube" />
    </div>
  </div>
</template>

<script>
import AccountEditRow from '@/components/tenant/AccountEditRow.vue';
import { mapActions } from 'vuex';

export default {
  name: 'MyAccountEdit',
  components: {
    AccountEditRow
  },
  data: () => ({
    tenant: null
  }),
  props: ['tenantSlug'],
  created() {
    this.init();
  },
  methods: {
    ...mapActions('tenant', ['fetchTenant']),
    async init() {
      this.fetchTenant({
        params: { tenantSlug: this.tenantSlug }
      }).then(response => {
        this.tenant = response.tenant;
      });
    }
  }
};
</script>
