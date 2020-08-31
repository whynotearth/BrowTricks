<template>
  <div class="flex flex-col text-on-background text-opacity-high" v-if="tenant">
    <EditProfileRow rowKey="Name" :rowValue="tenant.name" />
    <EditProfileRow rowKey="Username" />
    <EditProfileRow rowKey="Tags" />
    <EditProfileRow rowKey="Description" />
    <EditProfileRow rowKey="Loction" />
    <hr class="border-divider border-opacity-divider" />
    <EditProfileRow rowKey="Instagram" />
    <EditProfileRow rowKey="Facebook" />
    <EditProfileRow rowKey="WhatsApp" />
    <EditProfileRow rowKey="YouTube" />
  </div>
</template>

<script>
import EditProfileRow from '@/components/tenant/EditProfileRow.vue';

export default {
  name: 'MyAccountEdit',
  components: {
    EditProfileRow
  },
  props: {
    tenant: {
      type: Object,
      required: true
    }
  },
  methods: {}
};
</script>
