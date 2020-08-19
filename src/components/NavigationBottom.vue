<template>
  <nav class="flex w-full fixed bottom-0 bg-transparent z-30">
    <div class="flex flex-auto">
      <div class=" bg-primary flex-1"></div>
      <div class="container container--border px-0">
        <div class="flex relative">
          <ul
            class="flex-auto flex text-left menu list-none bg-primary px-2 md:px-0"
          >
            <li class="text-white inline-block m-2 mb-1 tg-caption-mobile">
              <router-link
                class="navigation--link"
                :to="{ name: 'TenantHome' }"
                exact
              >
                <HomeIcon class="m-auto" />
                Home
              </router-link>
            </li>
            <li class="text-white inline-block m-2 mb-1 tg-caption-mobile">
              <router-link
                class="navigation--link"
                :to="{ name: 'ClientList' }"
              >
                <UserIcon class="m-auto" />
                Clients
              </router-link>
            </li>
          </ul>
          <img
            class="h-14 m-auto"
            src="https://res.cloudinary.com/whynotearth/image/upload/v1597842033/BrowTricks/static_v2/bottom-nav-frame_atpsau.png"
          />
          <ul
            :class="{ opened: isOpen }"
            class="absolute fab-menu list-none z-50"
          >
            <li
              class="absolute top-0 right-0 flex whitespace-no-wrap text-white text-opacity-84 tg-caption-mobile justify-end my-3"
            >
              <router-link
                :to="{ name: 'AddClient', params: { step: 'basic-info' } }"
                class="flex items-center"
              >
                Add Client
                <div
                  class="rounded-full h-10 w-10 flex items-center justify-center bg-secondary ml-2
                shadow-6dp"
                >
                  <UserIcon class="m-auto fill-current" />
                </div>
              </router-link>
            </li>
          </ul>
          <div
            class="absolute flex content-center w-14 h-14 opacity-100 rounded-full cursor-pointer navigation--fab-button bg-secondary shadow-6dp z-50"
            @click="toggleMenu()"
          >
            <AddIcon
              class="m-auto ease-in-out text-on-secondary text-opacity-high fill-current"
              :class="{ 'transform rotate-45': isOpen }"
            />
          </div>
          <div
            v-if="isOpen"
            class="fixed w-full h-full top-0 left-0 -z-1 bg-opacity-50 bg-black"
          ></div>
        </div>
      </div>
      <div class=" bg-primary flex-1"></div>
    </div>
  </nav>
</template>

<script>
import AddIcon from '@/assets/icons/add.svg';
import HomeIcon from '@/assets/icons/home.svg';
import UserIcon from '@/assets/icons/person.svg';

export default {
  name: 'NavigationBottom',
  components: {
    AddIcon,
    HomeIcon,
    UserIcon
  },
  data() {
    return {
      isOpen: false,
      showNavbar: true,
      lastScrollPosition: 0,
      scrollValue: 0,
      activeClass: {
        home: 'opacity-100',
        stats: 'opacity-100',
        blue: 'opacity-100',
        archive: 'opacity-100'
      }
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>

<style scoped>
.navigation--fab-button {
  top: -30px;
  right: 16px;
}

.navigation--fab-button:hover {
  @apply bg-secondary transition ease-in delay-75;
}

.navigation--fab-button:active {
  @apply bg-secondary transition ease-in delay-75;
}

.fab-menu {
  top: -37px;
  right: 23px;
}

.ease-in-out {
  @apply transition-all ease-in delay-75;
}

ul.fab-menu > li {
  @apply text-transparent transition-all ease-linear;

  transition: 0.2s;
}

ul.fab-menu.opened > li:nth-child(1) {
  @apply text-white;

  transition-duration: 450ms;
  top: -70px;
}

ul.fab-menu.opened > li:nth-child(2) {
  @apply text-white;

  transition-duration: 450ms;
  top: -130px;
}

.navigation--link {
  @apply opacity-medium;
}

.navigation--link svg path {
  fill: #fff;
  fill-opacity: 0.54;
}

.router-link-active {
  @apply text-white opacity-100;
}

.router-link-active svg path {
  @apply opacity-100;

  fill: #fff;
  fill-opacity: 1;
}

@screen md {
  .container--border {
    border-left: 24px solid;
    border-right: 24px solid;

    @apply border-primary;
  }
}
</style>
