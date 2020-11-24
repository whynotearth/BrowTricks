<template>
  <ClassicLayout class="bg-background">
    <template #header>
      <HeaderNavigation />
    </template>

    <template #content>
      <ContentHero />

      <!-- row 1 -->
      <div class="flex flex-col md:flex-row w-full">
        <div class="box box-1 box-video md:w-1/2">
          <VideoSimple
            class="video-content"
            url="https://res.cloudinary.com/whynotearth/video/upload/v1606202008/BrowTricks/static_v2/home-feature-pink_yvz5tb.mp4"
          />
        </div>
        <div class="box box-2 box-article md:w-1/2">
          <ArticleMini
            class="flex flex-col justify-center"
            :article="articles[0]"
          ></ArticleMini>
        </div>
      </div>

      <!-- row 2 -->
      <div class="flex flex-col md:flex-row w-full">
        <div class="box box-4 box-video md:w-1/2 md:order-2">
          <VideoSimple
            class="video-content"
            url="https://res.cloudinary.com/whynotearth/video/upload/v1606202007/BrowTricks/static_v2/home-feature-green_inuipz.mp4"
          />
        </div>
        <div class="box box-3 box-article md:w-1/2 md:order-1">
          <ArticleMini
            class="flex flex-col justify-center"
            :article="articles[1]"
          ></ArticleMini>
        </div>
      </div>
      <div class="flex flex-col md:flex-row w-full">
        <div class="box box-5 box-video md:w-1/2">
          <VideoSimple
            class="video-content"
            url="https://res.cloudinary.com/whynotearth/video/upload/v1606201991/BrowTricks/static_v2/home-feature-blue_yvoqzy.mp4"
          />
        </div>
        <div class="box box-6 box-article md:w-1/2">
          <ArticleMini
            class="flex flex-col justify-center"
            :article="articles[2]"
          ></ArticleMini>
        </div>
      </div>

      <div id="section-pricing">
        <FrameFullWidth>
          <div class="max-w-3xl mx-auto py-10">
            <h2
              class="tg-h1-mobile text-on-background text-opacity-medium text-center mb-6"
            >
              Pricing
            </h2>
            <ContentPricing />
          </div>
        </FrameFullWidth>
      </div>

      <ContentCtaSignupOrDownload />

      <NavigationFooter />
    </template>
  </ClassicLayout>
</template>

<script>
import ArticleMini from '@/components/ArticleMini.vue';
import ContentHero from '@/components/ContentHero.vue';
import HeaderNavigation from '@/components/HeaderNavigation.vue';
import ContentPricing from '@/components/ContentPricing.vue';
import ContentCtaSignupOrDownload from '@/components/ContentCtaSignupOrDownload.vue';
import NavigationFooter from '@/components/NavigationFooter.vue';
import FrameFullWidth from '@/components/FrameFullWidth';
import VideoSimple from '@/components/player/VideoSimple';

export default {
  name: 'Home',
  components: {
    VideoSimple,
    FrameFullWidth,
    ArticleMini,
    HeaderNavigation,
    ContentHero,
    ContentPricing,
    ContentCtaSignupOrDownload,
    NavigationFooter
  },
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
    },
    articles() {
      return [
        {
          id: 1,
          title: 'Custom PMU forms with eSignatures',
          content:
            'Get PMU forms done faster with legally binding eSignatures. Send, sign and collect signatures in an instant. Compliant with all major eSignature laws including ESIGN Act, UETA, and European eIDAS.'
        },
        {
          id: 2,
          title: 'Manage client video and photos',
          content:
            /* eslint-disable-next-line */
            "Brow Tricks Beauty lets you snap, store, and see client photos and vidoes easily. This is great for remembering every single detail with a visual history of client's styles and progress. We recommend using this feature to deepen relationships with clients and connect with them like never before. "
        },
        {
          id: 3,
          title: 'Rock Your Relationships',
          content:
            'We know your clients are everything to you AND that you can’t always stay on top of them. Do they have a favorite product? Do they have a birthday coming up? Brow Tricks Beauty lets you save unlimited client notes giving you a way to keep relationships personal…and clients coming back.'
        }
      ];
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

.box-1 {
  background-color: #ebd3cd;
}
.box-2 {
  background-color: #ebd3cd;
}
.box-4 {
  background-color: #d2e9e0;
}
.box-3 {
  background-color: #d2e9e0;
}
.box-5 {
  background-color: #eaf0fa;
}
.box-6 {
  background-color: #eaf0fa;
}

.box {
  @apply flex items-center justify-center;
  background-position: bottom right;
  background-size: contain;
  background-repeat: no-repeat;
}
.box-article {
  @apply py-16;
}
.video-content {
  pointer-events: none;
}
</style>
