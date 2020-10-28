<template>
  <div class="p-10">
    <div v-if="BRANCH">
      <p class="mb-8">Branch: {{ BRANCH }}</p>
      <p class="mb-8">Review ID: {{ REVIEW_ID }}</p>
      <p class="mb-8">Commit ref: {{ COMMIT_REF }}</p>
      <p class="mb-8">Deploy Prime URL: {{ DEPLOY_PRIME_URL }}</p>
    </div>
    <div v-else>
      <p class="mb-8">Not available in local</p>
    </div>

    <p><router-link :to="{ name: 'Home' }">Home</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'Version',
  data: () => ({
    BRANCH: process.env.BRANCH,
    COMMIT_REF: process.env.COMMIT_REF,
    REVIEW_ID: process.env.REVIEW_ID,
    DEPLOY_PRIME_URL: process.env.DEPLOY_PRIME_URL
  })
};
</script>

<style scoped></style>
