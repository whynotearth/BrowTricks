<template>
  <!-- TODO: move layout to route meta -->
  <ClassicLayout class="bg-background">
    <template #header>
      <BaseHeader @iconClicked="isDrawerOpenUpdate(true)">
        <template #icon>
          <IconMenu class="h-6 w-6 fill-current" />
        </template>
        <template #menu-drawer>
          <MenuDrawerCustomer />
        </template>
        <template #end>
          <div class="flex w-full justify-end">
            <router-link v-if="isAuthenticated" :to="{ name: 'MyAccount' }">
              <BaseAvatar width="w-10" height="h-10" />
            </router-link>
            <router-link
              v-if="!isAuthenticated"
              :to="{ name: 'Login' }"
              class="uppercase text-secondary"
            >
              Log In
            </router-link>
          </div>
        </template>
      </BaseHeader>
    </template>
    <template #content>
      <div class="mx-auto max-w-sm lg:max-w-lg">
        <img
          class="mx-auto block mt-6 mb-14"
          src="https://res.cloudinary.com/whynotearth/image/upload/v1597844859/BrowTricks/static_v2/logo-round_hpkxxz.png"
          alt=""
        />

        <header>
          <h1 class="tg-h1-mobile mb-4 text-primary">
            Brow Tricks Beauty
          </h1>
          <h2 class="tg-h2-mobile mb-4 text-on-background text-opacity-medium">
            PMU, Simplified.
          </h2>
        </header>

        <img
          src="https://res.cloudinary.com/whynotearth/image/upload/v1596140165/BrowTricks/static_v2/Rectangle_11_fr7lxx.png"
          alt=""
          class="mx-auto block mb-10"
        />

        <Button
          :to="{ name: 'Welcome' }"
          :isRounded="true"
          textColor="text-on-secondary"
          background="bg-secondary"
          title="Sign Up"
          class="mb-10"
        />

        <ArticleMini class="mb-10">
          <template #title>Custom PMU forms with eSignatures</template>
          <template #content>
            <p>
              Get PMU forms done faster with legally binding eSignatures. Send,
              sign and collect signatures in an instant. Compliant with all
              major eSignature laws including ESIGN Act, UETA, and European
              eIDAS.
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
          textColor="text-on-secondary"
          background="bg-secondary"
          title="Sign Up"
          class="mb-10"
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
import MenuDrawerCustomer from '@/components/MenuDrawerCustomer.vue';
import BaseAvatar from '@/components/BaseAvatar.vue';
import IconMenu from '@/assets/icons/menu.svg';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Home',
  components: {
    ClassicLayout,
    BaseHeader,
    ArticleMini,
    Button,
    MenuDrawerCustomer,
    BaseAvatar,
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
