<template>
  <div>
    <nav class="flex w-full fixed bottom-0 bg-transparent z-30">
      <div class="flex flex-auto">
        <div class=" bg-primary flex-1"></div>
        <div class="container">
          <div class="flex relative">
            <ul
              class="wrapper flex-auto flex text-left justify-around items-center menu list-none bg-primary tg-caption-mobile"
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
              <li class="text-on-primary text-opacity-high link-item">
                <router-link
                  class="navigation--link block"
                  :to="{ name: 'ClientList' }"
                  exact
                >
                  <IconUser class="m-auto mb-2 w-5 h-5" />
                  <span>Clients</span>
                </router-link>
              </li>

              <li class="text-on-primary text-opacity-high">
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

              <li class="text-on-primary text-opacity-high link-item">
                <router-link
                  class="navigation--link block"
                  :to="{ name: 'TenantPmuSetup' }"
                  exact
                >
                  <IconDocument class="m-auto mb-2 w-5 h-5" />
                  <span>PMU Forms</span>
                </router-link>
              </li>

              <li class="text-on-primary text-opacity-high link-item">
                <router-link
                  class="navigation--link block"
                  :to="{ name: 'TenantHome' }"
                  exact
                >
                  <IconUserCircle class="m-auto mb-2 w-5 h-5" />
                  <span>Account</span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class=" bg-primary flex-1"></div>
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
  methods: {
    ...mapActions('uploader', ['isOpenDrawerUploadUpdate'])
  },
  computed: {
    ...mapGetters('uploader', ['isOpenDrawerUploadGet'])
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
</style>
