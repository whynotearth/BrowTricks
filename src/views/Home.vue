<template>
  <ClassicLayout class="bg-brand7">
    <template #content>
      <div class="max-w-sm mx-auto px-4">
        <div class="flex justify-center items-center mb-8 pt-16">
          <img :src="LOGO" class="logo" alt="" />
        </div>

        <h1 class="tg-h1-mobile mb-2">
          {{ APPNAME }}
        </h1>
        <p class="tg-h2-mobile mb-2">{{ APPSLOGAN }}</p>

        <div class="flex justify-center items-center mb-8">
          <VideoPlayerEmbeded :videoUrl="reviewVideoUrl"></VideoPlayerEmbeded>
        </div>

        <div class="mb-8">
          <Button
            background="bg-brand6"
            textColor="text-on-brand6"
            maxWidth="max-w-240"
            title="Create Account"
            class="normal-case mb-4"
            :to="{ name: 'AuthSignup' }"
          />

          <p class="text-on-background mb-5">
            Already have an account?
            <router-link class="underline font-bold" :to="{ name: 'AuthLogin' }"
              >Log In</router-link
            >
          </p>
        </div>

        <div>
          <ArticleMini
            class="mb-6"
            v-for="article in articles"
            :key="article.id"
            :article="article"
          />
        </div>

        <Button
          background="bg-brand6"
          textColor="text-on-brand6"
          maxWidth="max-w-240"
          title="Create Account"
          class="normal-case mb-6"
          :to="{ name: 'AuthSignup' }"
        />

        <article
          class="text-center tg-body-mobile text-on-background text-opacity-medium mb-6"
        >
          <div class="mb-6">
            <h2 class="tg-body-bold-mobile text-on-background">
              Client organization &amp; management FREE!
            </h2>
            <p>- Unlimited notes</p>
            <p>- Photo management</p>
          </div>

          <div class="mb-6">
            <h2 class="tg-body-bold-mobile text-on-background">
              $10 monthly after 30 days:
            </h2>
            <p>- PMU form building AND digital signing</p>
            <p>- Client video cloud storage</p>
          </div>

          <p class="mb-6">
            If you have any questions, please feel free to<br />contact us at
            ANY time!
          </p>

          <p>TEXT us at <a href="tel:510-319-3040">510-319-3040</a></p>
        </article>

        <a
          class="store-link block mx-auto"
          href="https://play.google.com/store/apps/details?id=com.browtricksteauty&utm_campaign=home&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
        >
          <img
            src="https://res.cloudinary.com/whynotearth/image/upload/v1604305045/BrowTricks/static_v2/google-play_gz9egz.png"
            alt="Get it on Google Play"
          />
        </a>
      </div>
    </template>
  </ClassicLayout>
</template>

<script>
import ClassicLayout from '@/layouts/ClassicLayout.vue';
import ArticleMini from '@/components/ArticleMini.vue';
import VideoPlayerEmbeded from '@/components/player/VideoPlayerEmbeded.vue';
export default {
  name: 'Home',
  components: { ClassicLayout, ArticleMini, VideoPlayerEmbeded },
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
    articles() {
      return [
        {
          id: 1,
          image:
            'https://res.cloudinary.com/whynotearth/image/upload/v1604302881/BrowTricks/static_v2/home-img1_epbt7t.png',
          title: 'Custom PMU forms<br />with eSignatures',
          content:
            'Get PMU forms done faster with legally binding eSignatures. Send, sign and collect signatures in an instant. Compliant with all major eSignature laws including ESIGN Act, UETA, and European eIDAS.'
        },
        {
          id: 2,
          image:
            'https://res.cloudinary.com/whynotearth/image/upload/v1604302881/BrowTricks/static_v2/home-img2_semgxv.png',
          title: 'Manage client<br />video and photos',
          content:
            'Brow Tricks Beauty lets you snap, store, and see client photos and vidoes easily. This is great for remembering every single detail with a visual history of client&apos;s styles and progress. We recommend using this feature to deepen relationships with clients and connect with them like never before.'
        },
        {
          id: 3,
          image:
            'https://res.cloudinary.com/whynotearth/image/upload/v1604302881/BrowTricks/static_v2/home-img3_gpushf.png',
          title: 'Rock your<br />relationships',
          content:
            'We know your clients are everything to you AND that you can’t always stay on top of them. Do they have a favorite product? Do they have a birthday coming up? Brow Tricks Beauty lets you save unlimited client notes giving you a way to keep relationships personal…and clients coming back.'
        }
      ];
    },
    APPNAME() {
      return process.env.VUE_APP_NAME;
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
