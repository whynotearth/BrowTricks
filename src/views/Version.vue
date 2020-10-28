<template>
  <div class="p-10">
    <p class="mb-1">Node environment: {{ NODE_ENV }}</p>
    <div class="mb-8" v-if="CONTEXT">
      <p class="mb-1">Review ID: {{ REVIEW_ID }}</p>
      <p class="mb-1">Commit ref: {{ COMMIT_REF }}</p>
      <p class="mb-1">Deploy Prime URL: {{ DEPLOY_PRIME_URL }}</p>
    </div>
    <div class="mb-8" v-else>
      <p>Not available in local</p>
    </div>

    <p><router-link :to="{ name: 'Home' }">Home</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'Version',
  data: () => ({
    CONTEXT: process.env.CONTEXT,
    NODE_ENV: process.env.NODE_ENV,
    COMMIT_REF: process.env.COMMIT_REF,
    REVIEW_ID: process.env.REVIEW_ID,
    DEPLOY_PRIME_URL: process.env.DEPLOY_PRIME_URL
  })
};
</script>

<style scoped></style>
