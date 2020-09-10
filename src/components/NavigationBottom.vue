<template>
  <div>
    <nav class="flex w-full fixed bottom-0 bg-transparent z-30">
      <div class="flex flex-auto">
        <div class="w-full">
          <div class="flex relative bg-primary">
            <ul
              class="link-items max-w-4xl mx-auto wrapper flex-auto flex text-left justify-around items-center menu list-none tg-caption-mobile select-none"
            >
              <li class="text-on-primary text-opacity-high link-item">
                <router-link
                  class="navigation--link block"
                  :to="{ name: 'TenantHome' }"
                  exact
                >
                  <IconHome class="m-auto mb-2 w-5 h-5" />
                  <span>Home</span>
                </router-link>
              </li>

              <li
                v-if="hasActiveTenant"
                class="text-on-primary text-opacity-high link-item"
              >
                <router-link
                  class="navigation--link block"
                  :to="{ name: 'ClientList' }"
                  exact
                >
                  <IconUser class="m-auto mb-2 w-5 h-5" />
                  <span>Clients</span>
                </router-link>
              </li>
              <li
                v-else
                disabled
                class="text-on-primary text-opacity-high link-item"
              >
                <a class="navigation--link block">
                  <IconUser class="m-auto mb-2 w-5 h-5" />
                  <span>Clients</span>
                </a>
              </li>

              <li
                v-if="hasActiveTenant"
                class="text-on-primary text-opacity-high"
              >
                <a
                  tabindex="0"
                  class="flex items-center cursor-pointer"
                  @click="isOpenDrawerUploadUpdate(true)"
                >
                  <div
                    class="rounded-xl h-10 w-14 flex items-center justify-center bg-secondary
                shadow-6dp mx-auto"
                  >
                    <IconCameraPlus
                      class="m-auto fill-current text-on-secondary"
                    />
                  </div>
                </a>
              </li>
              <li v-else disabled class="text-on-primary text-opacity-high">
                <div class="flex items-center">
                  <div
                    class="rounded-xl h-10 w-14 flex items-center justify-center bg-secondary
                shadow-6dp mx-auto"
                  >
                    <IconCameraPlus
                      class="m-auto fill-current text-on-secondary"
                    />
                  </div>
                </div>
              </li>

              <li
                v-if="hasActiveTenant"
                class="text-on-primary text-opacity-high link-item"
              >
                <router-link
                  class="navigation--link block"
                  :to="{ name: 'FormTemplates' }"
                >
                  <IconDocument class="m-auto mb-2 w-5 h-5" />
                  <span>Forms</span>
                </router-link>
              </li>
              <li
                v-else
                disabled
                class="text-on-primary text-opacity-high link-item"
              >
                <a class="navigation--link block">
                  <IconDocument class="m-auto mb-2 w-5 h-5" />
                  <span>Forms</span>
                </a>
              </li>

              <!-- MyAccount -->
              <li
                v-if="hasActiveTenant"
                class="text-on-primary text-opacity-high link-item"
              >
                <router-link
                  class="navigation--link block"
                  :to="{ name: 'MyAccount' }"
                  exact
                >
                  <IconUserCircle class="m-auto mb-2 w-5 h-5" />
                  <span>Account</span>
                </router-link>
              </li>
              <!-- MyAccountEmpty -->
              <li
                v-else
                disabled
                class="text-on-primary text-opacity-high link-item"
              >
                <router-link
                  class="navigation--link block"
                  :to="{ name: 'MyAccountEmpty' }"
                >
                  <IconUserCircle class="m-auto mb-2 w-5 h-5" />
                  <span>Account</span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    <DrawerUpload
      @close="isOpenDrawerUploadUpdate(false)"
      :isOpen="isOpenDrawerUploadGet"
    ></DrawerUpload>
  </div>
</template>

<script>
import IconCameraPlus from '@/assets/icons/camera-plus.svg';
import IconHome from '@/assets/icons/home.svg';
import IconUser from '@/assets/icons/person.svg';
import IconUserCircle from '@/assets/icons/person-circle.svg';
import IconDocument from '@/assets/icons/document.svg';
import DrawerUpload from '@/components/DrawerUpload';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'NavigationBottom',
  data: () => ({
    isOpenDrawerUpload: false
  }),
  components: {
    DrawerUpload,
    IconHome,
    IconCameraPlus,
    IconUser,
    IconUserCircle,
    IconDocument
  },
  beforeDestroy() {
    this.isOpenDrawerUploadUpdate(false);
  },
  methods: {
    ...mapActions('uploader', ['isOpenDrawerUploadUpdate'])
  },
  computed: {
    ...mapGetters('uploader', ['isOpenDrawerUploadGet']),
    hasActiveTenant() {
      return this.$route.params.tenantSlug;
    }
  }
};
</script>

<style scoped>
.wrapper {
  padding: 6px 0;
}

.navigation--link {
  @apply opacity-medium;
}

.navigation--link svg path {
  fill: #fff;
  fill-opacity: 0.54;
}

.router-link-active {
  @apply text-on-primary opacity-100;
}

.router-link-active svg path {
  @apply opacity-100;

  fill: #fff;
  fill-opacity: 1;
}
.link-item {
  min-width: 64px;
  @apply text-center;
}
.link-items > [disabled] {
  @apply cursor-not-allowed;
}
</style>
