<template>
  <a
    tabindex="0"
    class="cursor-pointer px-4 mb-4 flex items-center justify-between"
    @click="$emit('select', client)"
  >
    <div class="flex items-center">
      <div>
        <img
          class="w-10 h-10 rounded-full"
          :src="
            client.avatarUrl ||
              'https://res.cloudinary.com/whynotearth/image/upload/v1595228411/BrowTricks/avatar-placeholder_dphhvx.png'
          "
          alt="User picture"
        />
      </div>
      <div class="ml-2">
        <h3 class="tg-body-mobile text-on-background text-opacity-high">
          {{ client.firstName }} {{ client.lastName }}
        </h3>
        <h4 class="tg-caption-mobile text-on-background text-opacity-medium">
          {{ client.phoneNumber }}
        </h4>
        <h4 class="tg-caption-mobile text-on-background text-opacity-medium">
          {{ client.email }}
        </h4>
      </div>
    </div>

    <slot name="end" />
  </a>
</template>

<script>
export default {
  name: 'ClientListItem',
  props: {
    client: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped></style>
