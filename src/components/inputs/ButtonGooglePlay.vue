<template functional>
  <a
    :class="props.className"
    class="cta-button google-play block"
    href="https://play.google.com/store/apps/details?id=com.browtricksteauty&utm_campaign=home&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
    title="Get it on Google Play"
  >
    <span class="sr-only">Get it on Google Play</span>
  </a>
</template>

<script>
export default {
  name: 'ButtonGooglePlay',
  props: ['className']
};
</script>

<style scoped>
.cta-button {
  width: 148px;
}
.google-play {
  background: url('https://res.cloudinary.com/whynotearth/image/upload/v1606120342/BrowTricks/static_v2/google-play_afdw6e.png')
    center no-repeat;
  background-size: contain;
  height: 44px;
}
</style>
