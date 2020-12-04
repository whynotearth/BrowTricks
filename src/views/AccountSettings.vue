<template>
  <PageContentBoard>
    <div class="max-w-md w-full mx-auto pt-6 px-4">
      <div class="pb-4">
        <h3 class="tg-caption-mobile text-on-surface mb-6">Account</h3>
        <!-- <ExpansionPanel
          title="Profile Information"
          @click="
            $router.push({
              name: 'AccountEdit'
            })
          "
        >
        </ExpansionPanel> -->

        <ExpansionPanel
          title="Manage Account"
          @click="
            $router.push({
              name: 'AccountManage'
            })
          "
        >
        </ExpansionPanel>

        <ExpansionPanel
          title="Billing"
          @click="
            $router.push({
              name: 'AccountBilling'
            })
          "
        >
        </ExpansionPanel>

        <!-- <ExpansionPanel
        title="Share Profile"
        @click="
          $router.push({
            name: ''
          })
        "
      >
      </ExpansionPanel> -->

        <!-- <ExpansionPanel
        title="Analytics"
        @click="
          $router.push({
            name: 'AccountAnalytics'
          })
        "
      >
      </ExpansionPanel> -->

        <ExpansionPanel
          title="Add Account"
          @click="
            $router.push({
              name: 'TenantSignup'
            })
          "
        >
        </ExpansionPanel>

        <ExpansionPanel
          title="Log Out"
          @click="
            $router.push({
              name: 'AuthLogout'
            })
          "
        >
          <h4
            class="title mr-4 text-error text-opacity-high min-w-expansion-panel text-left tg-body-bold-mobile"
          >
            Log Out
          </h4>
        </ExpansionPanel>
      </div>

      <!-- <div class="pb-4">
        <h3 class="tg-caption-mobile text-on-surface mb-6">Support</h3>
        <ExpansionPanel
          title="Help Center"
          href="https://browtricksproductsorg.zendesk.com/"
        >
        </ExpansionPanel>
      </div> -->

      <div class="pb-4">
        <h3 class="tg-caption-mobile text-on-surface mb-6">About</h3>

        <!-- <ExpansionPanel
        title="Terms Of Use"
        @click="
          $router.push({
            name: 'TermsOfUse'
          })
        "
      >
      </ExpansionPanel> -->

        <ExpansionPanel
          title="Privacy Policy"
          @click="
            $router.push({
              name: 'PrivacyPolicy',
              query: { backPath: currentPath }
            })
          "
        >
        </ExpansionPanel>
      </div>
    </div>
  </PageContentBoard>
</template>

<script>
import ExpansionPanel from '@/components/ExpansionPanel.vue';
export default {
  name: 'AccountSettings',
  components: {
    ExpansionPanel
  },
  computed: {
    currentPath() {
      return this.$route.fullPath;
    }
  }
};
</script>

<style scoped></style>
