<template>
  <!-- TODO: move layout to route meta -->
  <ClassicLayout>
    <template #header>
      <BaseHeader
        @iconClicked="isDrawerOpenUpdate(true)"
        theme="light"
        hasNoise="has-noise"
      >
        <template #icon>
          <IconMenu class="h-6 w-6 fill-current" />
        </template>
        <template #menu-drawer>
          <MenuDrawerCustomer />
        </template>
        <template #end>
          <div class="flex w-full justify-end">
            <!-- <router-link v-if="isAuthenticated" :to="{ name: 'MyAccount' }">
              <BaseAvatar width="w-10" height="h-10" />
            </router-link> -->
            <router-link
              v-if="!isAuthenticated"
              :to="{ name: 'Login' }"
              class="uppercase text-on-background"
            >
              Log In
            </router-link>
          </div>
        </template>
      </BaseHeader>
    </template>
    <template #content>
      <div class="px-4 mx-auto max-h-sm lg:max-h-lg max-w-sm lg:max-w-lg">
        <IconLogo class="mx-auto h-full w-full block" alt="" />
        <header>
          <h1 class="tg-h1-mobile mb-4 text-primary">
            Brow Tricks Beauty
          </h1>
          <h2 class="tg-h2-mobile mb-4 text-on-background text-opacity-medium">
            PMU, Simplified.
          </h2>
        </header>

        <!-- <img
          src="https://res.cloudinary.com/whynotearth/image/upload/v1596140165/BrowTricks/static_v2/Rectangle_11_fr7lxx.png"
          alt=""
          class="mx-auto block mb-10"
        /> -->

        <Button
          :to="{ name: 'Welcome' }"
          :isRounded="true"
          title="Sign Up"
          class="mb-10"
          theme="btnsecondary"
        />

        <ArticleMini class="mb-10">
          <template #title>Custom PMU forms</template>
          <template #content>
            <p>
              Get PMU forms done faster. Send disclosures via text and get
              agreements in an instant!
            </p>
          </template>
        </ArticleMini>

        <ArticleMini class="mb-10">
          <template #title>Manage client video and photos</template>
          <template #content>
            <p>
              Brow Tricks Beauty lets you snap, store, and see client photos and
              vidoes easily. This is great for remembering every single detail
              with a visual history of client's styles and progress. We
              recommend using this feature to deepen relationships with clients
              and connect with them like never before.
            </p>
          </template>
        </ArticleMini>

        <ArticleMini class="mb-10">
          <template #title>Rock your relationships</template>
          <template #content>
            <p>
              We know your clients are everything to you. AND that you can’t
              always stay on top of them. Do they have a favorite product? Do
              they have a birthday coming up? Brow Tricks Beauty lets you save
              unlimited client notes giving you a way to keep relationships
              personal… and clients coming back.
            </p>
          </template>
        </ArticleMini>

        <Button
          :to="{ name: 'Welcome' }"
          :isRounded="true"
          title="Sign Up"
          class="mb-10"
          theme="btnsecondary"
        />
      </div>
    </template>
  </ClassicLayout>
</template>

<script>
import ClassicLayout from '@/layouts/ClassicLayout.vue';
import BaseHeader from '@/components/BaseHeader.vue';
import ArticleMini from '@/components/ArticleMini.vue';
import Button from '@/components/inputs/Button.vue';
import IconLogo from '@/assets/icons/browtricks-logo.svg';
import MenuDrawerCustomer from '@/components/MenuDrawerCustomer.vue';
// import BaseAvatar from '@/components/BaseAvatar.vue';
import IconMenu from '@/assets/icons/menu.svg';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Home',
  components: {
    ClassicLayout,
    BaseHeader,
    ArticleMini,
    Button,
    IconLogo,
    MenuDrawerCustomer,
    // BaseAvatar,
    IconMenu
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated'])
  },
  methods: {
    ...mapActions('global', ['isDrawerOpenUpdate'])
  }
};
</script>
