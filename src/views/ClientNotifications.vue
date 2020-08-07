<template>
  <div class="bg-background text-left min-h-screen">
    <BaseHeader
      slot="header"
      class="bg-footer text-white"
      @iconClicked="goToDetailPage"
    >
      <ArrowBack slot="icon" class="h-6 w-6 fill-current" />
      <span slot="content" class="pl-5">Notifications</span>
    </BaseHeader>
    <div>
      <Notifications />
      <div class="mt-4 mx-4 py-6 px-2">
        <Button
          class="rounded-full"
          title="Save"
          :isRipple="false"
          @clicked="updateClientNotification"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BaseHeader from '@/components/BaseHeader.vue';
import ArrowBack from '@/assets/icons/arrow-back.svg';
import Button from '@/components/Button.vue';
import Notifications from '@/components/client/Notifications.vue';
import { mapMutations, mapState, mapActions } from 'vuex';
import { sleep } from '@/helpers.js';

export default {
  name: 'ClientNotifications',
  props: {
    tenantSlug: {
      type: String,
      required: true
    },
    clientId: {
      type: [String, Number],
      required: true
    }
  },
  components: {
    BaseHeader,
    ArrowBack,
    Notifications,
    Button
  },
  data() {
    return {};
  },
  created() {
    this._fetchClient();
  },
  computed: {
    ...mapState('client', ['clientInfo'])
  },
  methods: {
    ...mapMutations('client', ['setClientInfo', 'resetClientInfo']),
    ...mapActions('client', ['updateClient']),
    ...mapActions('client', ['updateClient', 'fetchClient']),
    async _fetchClient() {
      this.fetchClient({
        params: {
          clientId: this.clientId,
          tenantSlug: this.tenantSlug
        }
      })
        .then(client => {
          this.setClientInfo(client);
        })
        .catch(() => {
          console.log('error in getting client');
          this.goToDetailPage();
        });
    },
    goToDetailPage() {
      this.$router.push({ name: 'ClientDetail' });
    },
    updateClientNotification() {
      this.updateClient({
        tenantSlug: this.tenantSlug,
        clientId: this.clientId,
        body: this.clientInfo
      }).then(async () => {
        this.$store.commit('overlay/updateModel', {
          title: 'Success!',
          message: 'Client notifications changed successfully!'
        });
        await sleep(1500);
        this.$store.commit('overlay/updateModel', {
          title: '',
          message: ''
        });
      });
    }
  },
  destroyed() {
    this.resetClientInfo();
  }
};
</script>
