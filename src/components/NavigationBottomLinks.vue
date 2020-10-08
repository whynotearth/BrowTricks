<template>
  <ul
    class="link-items max-w-md mx-auto wrapper flex-auto flex text-left justify-around items-center menu list-none tg-caption-mobile select-none py-4"
  >
    <li class="text-brand3 text-opacity-high link-item">
      <router-link
        class="navigation--link block"
        :to="{ name: 'TenantHome' }"
        exact
      >
        <IconHome class="m-auto mb-2 w-5 h-5 text-brand3" />
        <span>Home</span>
      </router-link>
    </li>

    <li class="text-brand3 text-opacity-high link-item">
      <router-link class="navigation--link block" :to="{ name: 'ClientList' }">
        <IconUser class="m-auto mb-2 w-5 h-5 text-brand3" />
        <span>Clients</span>
      </router-link>
    </li>

    <li class="text-brand3 text-opacity-high">
      <a
        tabindex="0"
        class="main-button navigation--link flex flex-col justify-center relative text-center outline-none cursor-pointer"
        @click="openDrawerUploadUpdate(UploaderTypes.CLIENT)"
      >
        <div
          class="main-button--shape absolute rounded-full h-14 w-14 flex items-center justify-center bg-secondary mx-auto border-2 border-black"
        >
          <IconCamera class="w-6 h-6 m-auto fill-current text-black" />
        </div>

        <IconCamera class="invisible m-auto mb-2 w-5 h-5 text-brand3" />
        <span>Upload</span>
      </a>
    </li>

    <li class="text-brand3 text-opacity-high link-item">
      <!-- FIXME: when tenantSlug is not available yet, this makes / and active -->
      <router-link
        class="navigation--link block"
        :to="{ name: 'FormTemplates' }"
      >
        <IconDocument class="m-auto mb-2 w-5 h-5 text-brand3" />
        <span>Forms</span>
      </router-link>
    </li>

    <!-- MyAccount -->
    <li class="text-brand3 text-opacity-high link-item">
      <router-link class="navigation--link block" :to="{ name: 'MyAccount' }">
        <IconUserCircle class="m-auto mb-2 w-5 h-5 text-brand3" />
        <span>Account</span>
      </router-link>
    </li>
  </ul>
</template>

<script>
import IconCamera from '@/assets/icons/camera.svg';
import IconHome from '@/assets/icons/home.svg';
import IconUser from '@/assets/icons/person.svg';
import IconUserCircle from '@/assets/icons/person-circle.svg';
import IconDocument from '@/assets/icons/document.svg';
import { mapActions } from 'vuex';
import { UploaderTypes } from '@/services/uploader.js';

export default {
  name: 'NavigationBottomNormal',
  components: {
    IconHome,
    IconCamera,
    IconUser,
    IconUserCircle,
    IconDocument
  },
  methods: {
    ...mapActions('uploader', ['openDrawerUploadUpdate'])
  },
  computed: {
    UploaderTypes() {
      return UploaderTypes;
    }
  }
};
</script>

<style scoped>
.link-item {
  min-width: 64px;
  @apply text-center;
}
.main-button--shape {
  top: -32px;
  left: 0%;
  transform: translateX(-8px);
}
.main-button:focus .main-button--shape {
  border: 2px solid white;
}
.navigation--link {
  min-width: 40px;
}
.router-link-active {
  @apply font-bold;
}
.router-link-active svg path {
}
</style>
