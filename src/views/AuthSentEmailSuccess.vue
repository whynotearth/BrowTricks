<template>
  <div class="flex flex-col items-center justify-around h-screen">
    <p>
      An email has been sent to
      <span class="font-bold">{{ $route.params.email }} </span>. Please check
      your email and follow the password recovery instructions to continue.
    </p>
    <img
      src="https://res.cloudinary.com/whynotearth/image/upload/v1601899012/BrowTricks/static_v2/auth-forgot-step2_md5jqb.png"
    />
    <Button
      title="Back To Login"
      class="mb-6"
      :to="{ name: 'AuthLogin' }"
      href
    />
  </div>
</template>

<script>
import Button from '@/components/inputs/Button.vue';

export default {
  components: {
    Button
  }
};
</script>
