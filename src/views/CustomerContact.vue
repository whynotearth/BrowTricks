<template>
  <div class="customer-view">
    <LayoutFixedScrollable>
      <BaseHeader
        slot="header"
        class="text-on-background-image"
        @iconClicked="toggleMenuDrawer"
      >
        <MenuIcon slot="icon" class="h-6 w-6 fill-current" />
        <span slot="content" class="pl-5">{{ tenantName }}</span>
        <CustomerMenuDrawer slot="menu-drawer" />
      </BaseHeader>
      <div slot="content" class="p-6 my-auto text-on-background-image">
        <div class="tg-h1-mobile mb-8">Ask us a question</div>
        <div class="flex flex-col w-full tg-body-mobile">
          <BaseInputText label="Name" class="pb-8">
            Name
          </BaseInputText>
          <BaseInputText
            type="email"
            class="pb-8"
            :inputStyle="['border-opacity-medium']"
            :lineStyle="['border-opacity-medium']"
          >
            Email
          </BaseInputText>
          <BaseInputTextArea class="pb-8">
            Message
          </BaseInputTextArea>
          <BaseButton class="border mb-8 w-full">
            <SendIcon slot="icon" class="fill-current opacity-medium" />
            <span slot="cta-text">Send</span>
          </BaseButton>
          <div class="tg-caption-mobile">
            {{ tenantName }} will receive an email and a text with your message.
          </div>
        </div>
      </div>
    </LayoutFixedScrollable>
  </div>
</template>

<script>
import LayoutFixedScrollable from '@/components/LayoutFixedScrollable.vue';
import BaseHeader from '@/components/BaseHeader.vue';
import MenuIcon from '@/assets/icons/menu.svg';
import CustomerMenuDrawer from '@/components/CustomerMenuDrawer.vue';
import BaseInputText from '@/components/BaseInputText.vue';
import BaseInputTextArea from '@/components/BaseInputTextArea.vue';
import BaseButton from '@/components/BaseButton.vue';
import SendIcon from '@/assets/icons/send.svg';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'CustomerContact',
  components: {
    LayoutFixedScrollable,
    BaseHeader,
    MenuIcon,
    CustomerMenuDrawer,
    BaseInputText,
    BaseInputTextArea,
    BaseButton,
    SendIcon
  },
  computed: {
    ...mapGetters({
      tenantName: 'getTenantName'
    })
  },
  methods: {
    ...mapMutations(['toggleMenuDrawer'])
  }
};
</script>
