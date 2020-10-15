<template>
  <div class="min-h-vh100--without-header px-4">
    <div
      class="flex flex-col items-center justify-around py-4 min-h-vh100--without-header"
    >
      <p class="">
        An email has been sent to
        <span class="font-bold">{{ $route.params.email }} </span>. Please check
        your email and follow the password recovery instructions to continue.
      </p>
      <div class="max-w-sm">
        <img
          class="my-6 select-none"
          src="https://res.cloudinary.com/whynotearth/image/upload/v1601899012/BrowTricks/static_v2/auth-forgot-step2_md5jqb.png"
        />
      </div>
      <Button
        title="Back To Login"
        class="mb-6"
        :to="{ name: 'AuthLogin' }"
        href
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthSentEmailSuccess'
};
</script>
