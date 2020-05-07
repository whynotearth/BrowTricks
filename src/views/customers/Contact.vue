<template>
  <div id="customer-contact" class="min-h-screen flex flex-col">
    <MenuHeader :tenantName="tenantName" />
    <MenuDrawer />
    <div
      class="p-6 flex-grow flex flex-col items-center justify-center text-on-background-image"
    >
      <div class="tg-h1-mobile mb-8">Ask us a question</div>
      <div class="flex flex-col w-full tg-body-mobile">
        <TextInput idName="name" label="Name" class="w-full pb-8" />
        <TextInput
          idName="email"
          label="Email"
          type="email"
          class="w-full pb-8"
          :inputStyle="['border-opacity-medium']"
          :lineStyle="['border-opacity-medium']"
        />
        <TextAreaInput idName="message" label="Message" class="w-full pb-8" />
        <Button
          :icon="SendIcon"
          ctaText="Send"
          class="border mb-8 w-full"
          :iconStyle="['opacity-medium']"
          :textAreaStyle="['border-opacity-medium']"
          :lineStyle="['border-opacity-medium']"
        />
        <div class="tg-caption-mobile">
          {{ tenantName }} will receive an email and a text with your message.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuHeader from '@/components/MenuHeader.vue';
import MenuDrawer from '@/components/MenuDrawer.vue';
import TextInput from '@/components/inputs/Text.vue';
import TextAreaInput from '@/components/inputs/TextArea.vue';
import Button from '@/components/ui/Button.vue';
import SendIcon from '@/assets/icons/send.svg';

export default {
  name: 'CustomerHome',
  components: {
    MenuHeader,
    MenuDrawer,
    TextInput,
    TextAreaInput,
    Button
  },
  props: {
    tenantName: {
      type: String,
      default: 'Carissa Queen'
    }
  },
  data() {
    return {
      SendIcon
    };
  }
};
</script>

<style scoped>
/* temporary scoped css to simulate background until actual background is provided by product */

#customer-contact:before {
  content: '';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.75;
  background-image: url('https://i.pinimg.com/originals/80/29/6b/80296b1e27351233d5d82104b3e02a92.jpg');
  background-repeat: no-repeat;
  background-position: 50% 0;
  -ms-background-size: cover;
  -o-background-size: cover;
  -moz-background-size: cover;
  -webkit-background-size: cover;
  background-size: cover;
}
</style>
