<template>
  <ClassicLayout class="bg-background">
    <template #header>
      <HeaderNavigation />
    </template>

    <template #content>
      <ContentHero />

      <div class="px-4">
        <p class="text-on-background mb-5">
          It’s easy & user friendly. No credit card or commitments. We promise
          you’ll love it!
        </p>
      </div>

      <div class="flex flex-col md:flex-row w-full">
        <div class="box box-1 md:w-1/2"></div>
        <div class="box box-2 md:w-1/2 bg-brand9">
          <ArticleMini :article="articles[0]"></ArticleMini>
        </div>
      </div>
      <div class="flex flex-col md:flex-row w-full">
        <div class="box box-4 md:w-1/2 md:order-2"></div>
        <div class="box box-3 md:w-1/2 bg-accent md:order-1">
          <ArticleMini :article="articles[1]"></ArticleMini>
        </div>
      </div>
      <div class="flex flex-col md:flex-row w-full">
        <div class="box box-5 md:w-1/2"></div>
        <div class="box box-6 md:w-1/2 bg-brand8">
          <ArticleMini :article="articles[2]"></ArticleMini>
        </div>
      </div>

      <ContentPricing />
    </template>
  </ClassicLayout>
</template>

<script>
import ArticleMini from '@/components/ArticleMini.vue';
import ContentHero from '@/components/ContentHero.vue';
import HeaderNavigation from '@/components/HeaderNavigation.vue';
import ContentPricing from '@/components/ContentPricing.vue';
export default {
  name: 'Home',
  components: { ArticleMini, HeaderNavigation, ContentHero, ContentPricing },
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
          title: 'Custom PMU forms<br/>with eSignatures',
          content:
            'Get PMU forms done faster with legally binding eSignatures. Send, sign and collect signatures in an instant. Compliant with all major eSignature laws including ESIGN Act, UETA, and European eIDAS.'
        },
        {
          id: 2,
          title: 'Manage client video<br/>and photos',
          content:
            /* eslint-disable-next-line */
            "Brow Tricks Beauty lets you snap, store, and see client photos and vidoes easily. This is great for remembering every single detail with a visual history of client's styles and progress. We recommend using this feature to deepen relationships with clients and connect with them like never before. "
        },
        {
          id: 3,
          title: 'Rock Your<br/>Relationships',
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
  background-image: url('https://res.cloudinary.com/whynotearth/image/upload/v1605607631/BrowTricks/static_v2/home-2_lqcbft.jpg');
  background-color: #ecbbb6;
}
.box-4 {
  background-image: url('https://res.cloudinary.com/whynotearth/image/upload/v1605610419/BrowTricks/static_v2/home-4_vyitmr.jpg');
  background-color: #cde9dd;
}
.box-5 {
  background-image: url('https://res.cloudinary.com/whynotearth/image/upload/v1605607630/BrowTricks/static_v2/home-3_hnahgj.jpg');
  background-color: #f0e2d7;
}

.box {
  @apply flex items-center justify-center p-4;
  height: 400px;
  background-position: bottom right;
  background-size: contain;
  background-repeat: no-repeat;
}
@screen md {
  .box {
    height: 512px;
  }
}
</style>
