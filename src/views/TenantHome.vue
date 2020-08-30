<template>
  <!-- TODO: move layout to route meta -->
  <ClassicLayout>
    <template #header />

    <!-- content -->
    <template #content>
      <BaseHeroSection>
        <img class="w-12 rounded-full mb-6" :src="logo" alt="user-logo" />
        <h1 class="tg-h1-mobile text-opacity-high text-on-background uppercase">
          {{ appShortName }}
        </h1>
      </BaseHeroSection>
      <!-- content -->
      <div class="max-w-md mx-auto px-4 -mt-16 w-full">
        <ExpansionPanel
          title="Clients"
          @click="
            $router.push({
              name: 'ClientList'
            })
          "
        >
          <template #preIcon>
            <IconUser class="h-4 w-4 fill-current" />
          </template>
        </ExpansionPanel>

        <!-- TODO: update link -->
        <ExpansionPanel @click="() => {}" title="PMU Forms">
          <template #preIcon>
            <IconDocument slot="preIcon" class="h-6 w-6 fill-current" />
          </template>
        </ExpansionPanel>

        <ExpansionPanel title="Tutorials" @click="isTutorialsModalOpen = true">
          <template #preIcon>
            <IconTutorial class="h-4 w-4 fill-current" />
          </template>
          <template #afterIcon>
            <IconExit class="h-6 w-6 fill-current" />
          </template>
        </ExpansionPanel>

        <ExpansionPanel
          title="Shops"
          href="http://www.browtricksproducts.com/"
          :attrs="{ target: '_blank' }"
        >
          <template #preIcon>
            <IconShop class="h-4 w-4 fill-current" />
          </template>
          <template #afterIcon>
            <IconExit class="h-6 w-6 fill-current" />
          </template>
        </ExpansionPanel>

        <ExpansionPanel
          title="FB Community"
          href="http://www.facebook.com/groups/browtrickstribe"
          :attrs="{ target: '_blank' }"
        >
          <template #preIcon>
            <IconFacebook class="h-4 w-4 fill-current" />
          </template>
          <template #afterIcon>
            <IconExit class="h-6 w-6 fill-current" />
          </template>
        </ExpansionPanel>
      </div>
    </template>
    <template #footer>
      <NavigationBottom />

      <!-- Tutorials dialog -->
      <BaseDialog
        v-if="isTutorialsModalOpen"
        @close="isTutorialsModalOpen = false"
        title="Tutorials"
      >
        <template #content>
          <p>
            Make sure to use code BROWTRICKSTRIBE to get my $199 course bundle
            FREE!
          </p>
        </template>

        <Button
          title="Enroll Now"
          href="http://www.browtricks.com/"
          :attrs="{ target: '_blank' }"
          textColor="text-brand1"
          theme="none"
          width="w-auto"
          :margin="null"
        />
        <Button
          title="Courses Login"
          href="http://www.browtricksmembers.com/"
          :attrs="{ target: '_blank' }"
          textColor="text-brand1"
          theme="none"
          width="w-auto"
          :margin="null"
        />
      </BaseDialog>
    </template>
  </ClassicLayout>
</template>

<script>
import ClassicLayout from '@/layouts/ClassicLayout.vue';
import BaseHeroSection from '@/components/BaseHeroSection.vue';
import Button from '@/components/inputs/Button.vue';
import ExpansionPanel from '@/components/ExpansionPanel.vue';
import BaseDialog from '@/components/BaseDialog.vue';
import NavigationBottom from '@/components/NavigationBottom.vue';
import IconUser from '@/assets/icons/user-nocircle.svg';
import IconDocument from '@/assets/icons/document.svg';
import IconFacebook from '@/assets/icons/facebook.svg';
import IconShop from '@/assets/icons/shop.svg';
import IconTutorial from '@/assets/icons/tutorial.svg';
import IconExit from '@/assets/icons/exit.svg';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'TenantHome',
  props: ['tenantSlug'],
  data: () => ({
    isTutorialsModalOpen: false,
    logo: process.env.VUE_APP_LOGO2_URL,
    appShortName: process.env.VUE_APP_SHORTNAME
  }),
  components: {
    ClassicLayout,
    Button,
    BaseHeroSection,
    ExpansionPanel,
    NavigationBottom,
    BaseDialog,
    IconUser,
    IconFacebook,
    IconShop,
    IconTutorial,
    IconDocument,
    IconExit
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated'])
  },
  methods: {
    ...mapActions('global', ['isDrawerOpenUpdate']),
    onClickTutorials() {
      console.log('onClickTutorials...');
    }
  }
};
</script>
