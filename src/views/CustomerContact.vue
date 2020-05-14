<template>
  <div class="customer-view">
    <LayoutFixedScrollable>
      <BaseMenuHeader slot="header" :tenantName="tenantName" />
      <div slot="content" class="p-6 my-auto text-on-background-image">
        <div class="tg-h1-mobile mb-8">Ask us a question</div>
        <div class="flex flex-col w-full tg-body-mobile">
          <BaseTextInput label="Name" class="pb-8">
            Name
          </BaseTextInput>
          <BaseTextInput
            type="email"
            class="pb-8"
            :inputStyle="['border-opacity-medium']"
            :lineStyle="['border-opacity-medium']"
          >
            Email
          </BaseTextInput>
          <BaseTextAreaInput class="pb-8">
            Message
          </BaseTextAreaInput>
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
import BaseMenuHeader from '@/components/BaseMenuHeader.vue';
import BaseTextInput from '@/components/BaseInputText.vue';
import BaseTextAreaInput from '@/components/BaseInputTextArea.vue';
import BaseButton from '@/components/BaseButton.vue';
import SendIcon from '@/assets/icons/send.svg';
import { mapState } from 'vuex';

export default {
  name: 'CustomerContact',
  components: {
    LayoutFixedScrollable,
    BaseMenuHeader,
    BaseTextInput,
    BaseTextAreaInput,
    BaseButton,
    SendIcon
  },
  computed: {
    ...mapState(['tenantName'])
  }
};
</script>
