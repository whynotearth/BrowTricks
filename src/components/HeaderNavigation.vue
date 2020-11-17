<template>
  <header class="sticky top-0 z-20">
    <div class="flex justify-between items-center bg-brand6 px-4 py-3 h-16">
      <div class="flex items-center">
        <!-- hamburger menu -->
        <a
          @click.stop="isMenuVisible = !isMenuVisible"
          class="cursor-pointer relative md:hidden menu-hamburger"
        >
          <IconHamburger class="text-on-brand6 mr-4" />

          <transition name="menu-fade" mode="out-in">
            <nav
              @click.stop
              v-click-outside="() => (isMenuVisible = false)"
              v-if="isMenuVisible"
              class="menu-content"
            >
              <ul class="flex flex-col bg-background shadow-md py-2 rounded-md">
                <li class="w-full">
                  <router-link
                    class="text-on-background block px-4 py-2 hover:bg-primary"
                    :to="{ name: 'Home' }"
                    exact
                    >Home</router-link
                  >
                </li>
                <li class="w-full">
                  <router-link
                    class="block px-4 py-2 hover:bg-primary text-on-background"
                    :to="{ name: 'Pricing' }"
                    >Pricing</router-link
                  >
                </li>
                <li class="w-full">
                  <router-link
                    class="block px-4 py-2 hover:bg-primary text-on-background"
                    :to="{ name: 'Help' }"
                    >Help</router-link
                  >
                </li>
                <li class="w-full">
                  <router-link
                    class="block px-4 py-2 hover:bg-primary text-on-background"
                    :to="{ name: 'AuthLogin' }"
                    >Log in</router-link
                  >
                </li>
              </ul>
            </nav>
          </transition>
        </a>
        <h1
          class="text-left tg-h3-mobile md:tg-h2-mobile text-on-brand6 select-none"
        >
          {{ APPNAME }}
        </h1>
      </div>

      <!-- horizontal menu -->
      <nav class="flex menu-horizontal">
        <ul class="hidden md:flex items-center tg-h3-mobile select-none">
          <li class="h-full flex items-center">
            <router-link
              class="text-on-brand6 mx-1 p-2 rounded-md"
              :to="{ name: 'Home' }"
              exact
              >Home</router-link
            >
          </li>
          <li class="h-full flex items-center">
            <router-link
              class="text-on-brand6 mx-1 p-2 rounded-md"
              :to="{ name: 'Pricing' }"
              >Pricing</router-link
            >
          </li>
          <li class="h-full flex items-center">
            <router-link
              class="text-on-brand6 mx-1 p-2 rounded-md"
              :to="{ name: 'Help' }"
              >Help</router-link
            >
          </li>
          <li class="h-full flex items-center">
            <router-link
              class="text-on-brand6 mx-1 p-2 rounded-md"
              :to="{ name: 'AuthLogin' }"
              >Log in</router-link
            >
          </li>
        </ul>

        <Button
          padding="py-1 px-3 md:px-4 ml-3"
          radius="rounded-md"
          :width="null"
          title="Try it now"
        />
      </nav>
    </div>
  </header>
</template>

<script>
import IconHamburger from '@/assets/icons/hamburger.svg';
export default {
  name: 'HeaderNavigation',
  components: { IconHamburger },
  data: () => ({
    isMenuVisible: false
  }),
  computed: {
    APPNAME() {
      return process.env.VUE_APP_NAME;
    }
  }
};
</script>

<style scoped>
.menu-hamburger .router-link-active {
  @apply bg-primary bg-opacity-disabled;
}
.menu-horizontal .router-link-active {
  @apply bg-on-background-image bg-opacity-disabled;
}
.menu-content {
  @apply absolute text-left select-none;
  top: 20px;
  left: 20px;
  width: 180px;
}
</style>
