<template>
  <div>
    Phone number 510... <br />
    Email kasjdf@kjsdf<br />

    <!-- if user account -->
    <div>Switch to business account link <br /></div>

    <!-- if business account -->
    <div>
      Activate Site inactive <br />
      Business hours <br />
      Order Options <br />
      Services <br />
      Promotions <br />
      Switch to user account link <br />

      <router-link :to="{ name: 'AccountBilling' }"
        >Upgrade to pro account</router-link
      >
      <br />
    </div>

    Delete account link <br />
  </div>
</template>

<script>
export default {
  name: 'AccountManage'
};
</script>

<style scoped></style>
