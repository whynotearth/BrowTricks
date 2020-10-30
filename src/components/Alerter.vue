<template>
  <BaseDialog
    v-if="alerterGet.visible"
    @close="updateVisibility(false)"
    background="bg-surface"
    textColor="text-on-background"
    :padding="null"
  >
    <div class="flex flex-col justify-center items-center w-full py-4">
      <div class="mb-4">{{ alerterGet.text }}</div>

      <Button
        v-if="alerterGet.button.title"
        :title="alerterGet.button.title"
        @clicked="alerterGet.button.action()"
      />
    </div>
  </BaseDialog>
</template>

<script>
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
export default Vue.extend({
  name: 'Alerter',
  computed: {
    ...mapGetters('alerter', ['alerterGet'])
  },
  methods: {
    ...mapActions('alerter', ['updateVisibility'])
  }
});
</script>
