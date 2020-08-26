<template>
  <nav class="flex w-full fixed bottom-0 bg-transparent z-30">
    <div class="flex flex-auto">
      <div class=" bg-primary flex-1"></div>
      <div class="container">
        <div class="flex relative">
          <ul
            class="wrapper flex-auto flex text-left justify-around items-center menu list-none bg-primary tg-caption-mobile"
          >
            <li class="text-on-primary text-opacity-high">
              <router-link
                class="navigation--link block"
                :to="{ name: 'TenantHome' }"
                exact
              >
                <IconHome class="m-auto mb-2 w-5 h-5" />
                <span>Home</span>
              </router-link>
            </li>
            <li class="text-on-primary text-opacity-high">
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
              <router-link
                :to="{ name: 'AddClient', params: { step: 'basic-info' } }"
                exact
                class="flex items-center"
              >
                <div
                  class="rounded-xl h-10 w-14 flex items-center justify-center bg-secondary
                shadow-6dp"
                >
                  <IconAdd class="m-auto fill-current text-on-secondary" />
                </div>
              </router-link>
            </li>

            <!-- TODO: add real link -->
            <li class="w-8"></li>
            <li class="w-8"></li>
            <!-- <li class="text-on-primary text-opacity-high">
              <router-link
                class="navigation--link block"
                :to="{ name: 'TenantHome' }"
                exact
              >
                <IconDocument class="m-auto mb-2 w-5 h-5" />
                <span>PMU Forms</span>
              </router-link>
            </li> -->

            <!-- <li class="text-on-primary text-opacity-high">
              <router-link
                class="navigation--link block"
                :to="{ name: 'TenantHome' }"
                exact
              >
                <IconUserCircle class="m-auto mb-2 w-5 h-5" />
                <span>Account</span>
              </router-link>
            </li> -->
          </ul>
        </div>
      </div>
      <div class=" bg-primary flex-1"></div>
    </div>
  </nav>
</template>

<script>
import IconAdd from '@/assets/icons/add.svg';
import IconHome from '@/assets/icons/home.svg';
import IconUser from '@/assets/icons/person.svg';
// import IconUserCircle from '@/assets/icons/person-circle.svg';
// import IconDocument from '@/assets/icons/document.svg';

export default {
  name: 'NavigationBottom',
  components: {
    IconHome,
    IconAdd,
    IconUser
    // IconUserCircle,
    // IconDocument
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
</style>
