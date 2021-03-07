<template>
  <div class="bg-primary wrapper">
    <div class="flex flex-col md:flex-row pt-16 max-w-6xl mx-auto">
      <div class="flex items-center justify-center text-center flex-grow">
        <div class="max-w-2xl px-4 mb-12 md:mb-0">
          <h2 class="tg-h1-mobile text-on-background text-opacity-medium mb-8">
            {{ APPNAME }}
          </h2>
          <p class="tg-body-mobile text-on-background text-opacity-medium mb-8">
            Brow Tricks Beauty lets you snap, store, and see client photos and
            vidoes easily. This is great for remembering every single detail
            with a visual history of client's styles and progress. We recommend
            using this feature to deepen relationships with clients and connect
            with them like never before.
          </p>

          <div
            class="flex flex-col sm:flex-row mt-6 items-center justify-center"
          >
            <Button
              class="cta-button mb-4 sm:mb-0"
              margin="mx-4"
              :width="null"
              background="bg-brand6"
              textColor="text-on-brand6"
              radius="rounded-md"
              title="Sign Up"
              :to="{ name: 'AuthSignup' }"
            />

            <Button
              v-if="isMobileApp"
              class="cta-button mb-4 sm:mb-0"
              margin="mx-4"
              :width="null"
              background="bg-brand6"
              textColor="text-on-brand6"
              radius="rounded-md"
              title="Log in"
              :to="{ name: 'AuthLogin' }"
            />

            <ButtonGooglePlay v-else className="mx-4" />
          </div>
        </div>
      </div>

      <div class="app-image mx-auto flex-shrink-0">
        <img
          class="px-6"
          src="https://res.cloudinary.com/whynotearth/image/upload/v1605631504/BrowTricks/static_v2/home-app_mea1yu.png"
          alt="app"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ButtonGooglePlay from '@/components/inputs/ButtonGooglePlay';
export default {
  name: 'ContentCtaSignupOrDownload',
  components: { ButtonGooglePlay },
  computed: {
    APPNAME() {
      return process.env.VUE_APP_NAME;
    }
  }
};
</script>

<style scoped>
.app-image {
  width: 288px;
}
.wrapper {
  background: url('https://res.cloudinary.com/whynotearth/image/upload/v1606118230/BrowTricks/static_v2/circles-bg_ypvzz3.jpg')
    bottom center;
  background-size: cover;
}

.cta-button {
  width: 148px;
}
</style>
