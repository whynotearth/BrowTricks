<template>
  <BaseDrawerActions
    :isOpen="isOpen"
    @close="$emit('close')"
    :title="`Sign Up for ${appName}`"
    class="h-full"
  >
    <!-- signup screen -->
    <div
      v-if="activeMode === 'signup'"
      class="flex flex-col h-full justify-between flex-grow"
    >
      <div class="px-4">
        <p class="text-on-surface text-opacity-medium mb-4">
          Create a profile to start booking appointments on BrowTricks Beauty!
        </p>
        <AuthButtons :mode="activeMode" />
      </div>

      <Button
        title="Already have an account? Log in"
        @clicked="activeMode = 'login'"
        background="bg-secondary"
        textColor="text-on-secondary text-opacity-high"
        theme="btnsecondary"
      />
    </div>

    <!-- login screen -->
    <div
      v-if="activeMode === 'login'"
      class="flex flex-col h-full justify-between flex-grow"
    >
      <div class="px-4">
        <!-- TODO: new sentence for login! -->
        <p class="text-on-surface text-opacity-medium mb-4">
          Create a profile to start booking appointments on BrowTricks Beauty!
        </p>
        <AuthButtons :mode="activeMode" />
      </div>

      <Button
        title="Don’t have an account? Register Now"
        @clicked="activeMode = 'signup'"
        background="bg-secondary"
        textColor="text-on-secondary text-opacity-high"
        theme="btnsecondary"
      />
    </div>

    <div v-else></div>
  </BaseDrawerActions>
</template>

<script>
import BaseDrawerActions from '@/components/BaseDrawerActions';

import AuthButtons from '@/components/auth/AuthButtons';

export default {
  name: 'DrawerAuth',
  data: () => ({
    activeMode: 'signup',
    appName: process.env.VUE_APP_NAME
  }),
  components: { BaseDrawerActions, AuthButtons },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped></style>
