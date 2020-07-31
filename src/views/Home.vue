<template>
  <ClassicLayout class="bg-newbackground">
    <template #header>
      <BaseHeader>
        <template #end>
          <div class="flex w-full justify-end">
            <router-link
              :to="{ name: 'Login' }"
              class="uppercase text-newsecondary"
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
          class="mx-auto block"
          src="https://res.cloudinary.com/whynotearth/image/upload/v1596130890/BrowTricks/static_v2/logo-light_yioxuj.png"
          alt=""
        />

        <header>
          <h1 class="tg-h1-mobile mb-4 text-newsecondary">
            Brow Tricks Beauty
          </h1>
          <h2 class="tg-h2-mobile mb-4 text-white text-opacity-medium">
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
          textColor="text-on-newsecondary"
          background="bg-newsecondary"
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
          textColor="text-on-newsecondary"
          background="bg-newsecondary"
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
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Home',
  components: {
    ClassicLayout,
    BaseHeader,
    ArticleMini,
    Button
  },
  computed: {
    ...mapGetters({
      tenantName: 'getTenantName'
    })
  },
  methods: {
    ...mapMutations(['toggleMenuDrawer'])
  }
};
</script>
