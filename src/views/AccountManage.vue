<template>
  <div>
    Phone number 510... <br />
    Email kasjdf@kjsdf<br />

    <!-- if user account -->
    <div v-if="accountType === 'user'">
      <a @click="switchType('business')">Switch to business account link</a>
    </div>

    <!-- if business account -->
    <div v-if="accountType === 'business'">
      Activate Site inactive <br />
      Business hours <br />
      Order Options <br />
      Services <br />
      Promotions <br />
      <a @click="switchType('user')">Switch to user account link</a>

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
  name: 'AccountManage',
  data: () => ({
    accountType: 'user'
  }),
  methods: {
    switchType(newType) {
      console.log('newType', newType);
    }
  }
};
</script>

<style scoped></style>
