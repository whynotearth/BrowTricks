<template>
  <div class="customer-view">
    <LayoutFixedScrollable>
      <BaseMenuHeader slot="header" :tenantName="tenantName" />
      <div slot="content" class="p-6 my-auto text-on-background-image">
        <div class="tg-h1-mobile mb-8">Ask us a question</div>
        <div class="flex flex-col w-full tg-body-mobile">
          <TextInput label="Name" class="pb-8">
            Name
          </TextInput>
          <TextInput
            type="email"
            class="pb-8"
            :inputStyle="['border-opacity-medium']"
            :lineStyle="['border-opacity-medium']"
          >
            Email
          </TextInput>
          <TextAreaInput class="pb-8">
            Message
          </TextAreaInput>
          <Button class="border mb-8 w-full">
            <SendIcon slot="icon" class="fill-current opacity-medium" />
            <span slot="cta-text">Send</span>
          </Button>
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
import TextInput from '@/components/BaseInputText.vue';
import TextAreaInput from '@/components/BaseInputTextArea.vue';
import Button from '@/components/BaseButton.vue';
import SendIcon from '@/assets/icons/send.svg';
import { mapState } from 'vuex';

export default {
  name: 'CustomerContact',
  components: {
    LayoutFixedScrollable,
    BaseMenuHeader,
    TextInput,
    TextAreaInput,
    Button,
    SendIcon
  },
  computed: {
    ...mapState(['tenantName'])
  }
};
</script>
