<template>
  <ul
    class="link-items max-w-md mx-auto wrapper flex-auto flex text-left justify-around items-center menu list-none tg-caption-mobile select-none py-4"
  >
    <li disabled class="text-brand1 text-opacity-high link-item">
      <div class="navigation--link block">
        <IconHome class="m-auto mb-2 w-5 h-5 text-brand1" />
        <span>Home</span>
      </div>
    </li>

    <li disabled class="text-brand1 text-opacity-high link-item">
      <div class="navigation--link block">
        <IconUser class="m-auto mb-2 w-5 h-5 text-brand1" />
        <span>Clients</span>
      </div>
    </li>

    <li disabled class="text-brand1 text-opacity-high">
      <div
        class="main-button navigation--link flex flex-col justify-center relative text-center outline-none"
      >
        <div
          class="main-button--shape absolute rounded-full h-14 w-14 flex items-center justify-center bg-brand2 mx-auto"
        >
          <IconCamera class="w-6 h-6 m-auto fill-current text-white" />
        </div>

        <IconCamera class="invisible m-auto mb-2 w-5 h-5 text-brand1" />
        <span>Upload</span>
      </div>
    </li>

    <li disabled class="text-brand1 text-opacity-high link-item">
      <div class="navigation--link block">
        <IconDocument class="m-auto mb-2 w-5 h-5 text-brand1" />
        <span>Forms</span>
      </div>
    </li>

    <!-- MyAccount -->
    <li disabled class="text-brand1 text-opacity-high link-item">
      <div class="navigation--link block">
        <IconUserCircle class="m-auto mb-2 w-5 h-5 text-brand1" />
        <span>Account</span>
      </div>
    </li>
  </ul>
</template>

<script>
import IconCamera from '@/assets/icons/camera.svg';
import IconHome from '@/assets/icons/home.svg';
import IconUser from '@/assets/icons/person.svg';
import IconUserCircle from '@/assets/icons/person-circle.svg';
import IconDocument from '@/assets/icons/document.svg';

export default {
  name: 'NavigationBottomLocked',
  components: {
    IconHome,
    IconCamera,
    IconUser,
    IconUserCircle,
    IconDocument
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

.link-items > [disabled] {
  @apply cursor-not-allowed;
  @apply opacity-medium;
}
</style>
