<template>
  <div class="max-w-md w-full mx-auto pt-6 px-4 text-left pb-32">
    <ExpansionPanel title="Phone Number" endText="123456789"></ExpansionPanel>
    <ExpansionPanel
      title="Email"
      endText="loremipsum@example.com"
    ></ExpansionPanel>

    <!-- if user account -->
    <div v-if="accountType === 'user'">
      <ExpansionPanel @click="switchType('business')">
        <h4
          class="title mr-4 text-error text-opacity-high min-w-expansion-panel text-left tg-body-bold-mobile"
        >
          Switch to Business Account
        </h4>
      </ExpansionPanel>
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

    <!-- todo: add "delete account" here -->

    <DrawerAccountTypeSelector
      @close="isDrawerOpenUpdate(false)"
      :isOpen="isDrawerOpen"
    ></DrawerAccountTypeSelector>
  </div>
</template>

<script>
import DrawerAccountTypeSelector from '@/components/account/DrawerAccountTypeSelector';
import { DrawerTypes } from '@/services/drawerTypes.js';
export default {
  name: 'AccountManage',
  components: { DrawerAccountTypeSelector },
  data: () => ({
    accountType: 'user',
    isDrawerOpen: false
  }),
  computed: {
    DrawerTypes() {
      return DrawerTypes;
    }
  },
  methods: {
    isDrawerOpenUpdate(value) {
      this.isDrawerOpen = value;
    },
    switchType(newType) {
      this.isDrawerOpenUpdate(true);
      console.log('newType', newType);
      // todo: open "upgrade drawer here"
    }
  }
};
</script>
