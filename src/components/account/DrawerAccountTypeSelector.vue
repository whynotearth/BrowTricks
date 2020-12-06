<template>
  <BaseDrawerActions
    :isOpen="isOpen"
    @close="$emit('close')"
    title="Upgrade your plan now!"
  >
    <ul class="text-on-background text-opacity-high tg-body-mobile">
      <li>
        something here
      </li>
    </ul>
  </BaseDrawerActions>
</template>

<script>
import IconCheck from '@/assets/icons/check.svg';
import BaseDrawerActions from '@/components/BaseDrawerActions';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'DrawerAccountTypeSelector',
  components: { BaseDrawerActions, IconCheck },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters('formTemplate', ['currentFieldGet'])
  },
  methods: {}
};
</script>
