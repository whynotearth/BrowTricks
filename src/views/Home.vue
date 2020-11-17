<template>
  <ClassicLayout class="bg-background">
    <template #header>
      <HeaderNavigation />
    </template>

    <template #content>
      <HomeHero />

      <div class="px-4">
        <p class="text-on-background mb-5">
          It’s easy & user friendly. No credit card or commitments. We promise
          you’ll love it!
        </p>
      </div>
    </template>
  </ClassicLayout>
</template>

<script>
import ArticleMini from '@/components/ArticleMini.vue';
import HomeHero from '@/components/PageHomeHero.vue';
import HeaderNavigation from '@/components/HeaderNavigation.vue';
export default {
  name: 'Home',
  components: { ArticleMini, HeaderNavigation, HomeHero },
  // metaInfo() {
  //   return {
  //     script: [
  //       {
  //         vmid: 'jsonld',
  //         type: 'application/ld+json',
  //         json: {}
  //       }
  //     ]
  //   };
  // },
  computed: {
    reviewVideoUrl() {
      return 'https://res.cloudinary.com/whynotearth/video/upload/v1604388928/BrowTricks/static_v2/home-review-1.mp4';
    },
    APPSLOGAN() {
      return process.env.VUE_APP_SLOGAN;
    },
    SHORTNAME() {
      return process.env.VUE_APP_SHORTNAME;
    },
    LOGO() {
      return process.env.VUE_APP_LOGO_URL;
    }
  }
};
</script>

<style scoped>
.logo {
  width: 100px;
}
.store-link {
  width: 180px;
}
</style>
