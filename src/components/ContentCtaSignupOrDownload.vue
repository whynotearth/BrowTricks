<template>
  <div class="bg-primary">
    <div class="flex pt-16 max-w-6xl mx-auto">
      <div class="flex items-center justify-center text-center flex-grow">
        <div class="max-w-2xl">
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

          <!-- <a href="" title="download on Google Play">
            <img src="https://res.cloudinary.com/whynotearth/image/upload/v1604305045/BrowTricks/static_v2/google-play_gz9egz.png" alt="Google Play">
          </a> -->
          <Button
            background="bg-brand6"
            textColor="text-on-brand6"
            maxWidth="max-w-240"
            radius="rounded-md"
            title="Sign Up"
            class="mt-6"
            :to="{ name: 'AuthSignup' }"
          />
        </div>
      </div>

      <div class="app-image flex-shrink-0">
        <img
          class=""
          src="https://res.cloudinary.com/whynotearth/image/upload/v1605631504/BrowTricks/static_v2/home-app_mea1yu.png"
          alt="app"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentCtaSignupOrDownload',
  computed: {
    APPNAME() {
      return process.env.VUE_APP_NAME;
    }
  }
};
</script>

<style scoped>
.app-image {
  width: 240px;
}
</style>
