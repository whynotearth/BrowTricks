<template>
  <ul
    class="flex items-center justify-around flex-auto max-w-md py-4 mx-auto text-left list-none select-none link-items wrapper menu tg-caption-mobile"
  >
    <li class="text-brand3 text-opacity-high link-item">
      <router-link
        class="block navigation--link"
        :to="{ name: 'TenantHome' }"
        exact
      >
        <IconHome class="w-5 h-5 m-auto mb-2 text-brand3" />
        <span>Home</span>
      </router-link>
    </li>

    <li class="text-brand3 text-opacity-high link-item">
      <router-link class="block navigation--link" :to="{ name: 'ClientList' }">
        <IconUser class="w-5 h-5 m-auto mb-2 text-brand3" />
        <span>Clients</span>
      </router-link>
    </li>

    <li class="text-brand3 text-opacity-high">
      <a
        tabindex="0"
        class="relative flex flex-col justify-center text-center outline-none cursor-pointer main-button navigation--link"
        @click="openDrawerUploadUpdate(UploaderTypes.CLIENT)"
      >
        <div
          class="absolute flex items-center justify-center mx-auto border-2 border-black rounded-full main-button--shape h-14 w-14 bg-accent"
        >
          <IconCamera class="w-6 h-6 m-auto text-black fill-current" />
        </div>

        <IconCamera class="invisible w-5 h-5 m-auto mb-2 text-brand3" />
        <span>Upload</span>
      </a>
    </li>

    <li class="text-brand3 text-opacity-high link-item">
      <!-- FIXME: when tenantSlug is not available yet, this makes / and active -->
      <router-link
        class="block navigation--link"
        :to="{ name: 'FormTemplates' }"
      >
        <IconDocument class="w-5 h-5 m-auto mb-2 text-brand3" />
        <span>Forms</span>
      </router-link>
    </li>

    <!-- Account -->
    <li class="text-brand3 text-opacity-high link-item">
      <router-link class="block navigation--link" :to="{ name: 'Account' }">
        <IconUserCircle class="w-5 h-5 m-auto mb-2 text-brand3" />
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
