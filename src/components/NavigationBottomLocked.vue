<template>
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

    <li disabled class="text-on-primary text-opacity-high link-item">
      <a class="navigation--link block">
        <IconUser class="m-auto mb-2 w-5 h-5" />
        <span>Clients</span>
      </a>
    </li>

    <li disabled class="text-on-primary text-opacity-high">
      <div class="flex items-center">
        <div
          class="rounded-xl h-10 w-14 flex items-center justify-center bg-secondary
                shadow-6dp mx-auto"
        >
          <IconCameraPlus class="m-auto fill-current text-on-secondary" />
        </div>
      </div>
    </li>

    <li disabled class="text-on-primary text-opacity-high link-item">
      <a class="navigation--link block">
        <IconDocument class="m-auto mb-2 w-5 h-5" />
        <span>Forms</span>
      </a>
    </li>

    <li disabled class="text-on-primary text-opacity-high link-item">
      <router-link
        class="navigation--link block"
        :to="{ name: 'MyAccountEmpty' }"
      >
        <IconUserCircle class="m-auto mb-2 w-5 h-5" />
        <span>Account</span>
      </router-link>
    </li>
  </ul>
</template>

<script>
import IconCameraPlus from '@/assets/icons/camera-plus.svg';
import IconHome from '@/assets/icons/home.svg';
import IconUser from '@/assets/icons/person.svg';
import IconUserCircle from '@/assets/icons/person-circle.svg';
import IconDocument from '@/assets/icons/document.svg';

export default {
  name: 'NavigationBottomLocked',
  components: {
    IconHome,
    IconCameraPlus,
    IconUser,
    IconUserCircle,
    IconDocument
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
