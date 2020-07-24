<template>
  <div>
    <div class="py-6 px-2 bg-white rounded-lg shadow-8dp">
      <text-area v-model="newNote" label="Note" labelBg="bg-white" />
    </div>
    <div class="py-8">
      <Button
        class="rounded-full"
        title="Save"
        :isRipple="false"
        @clicked="save"
      />
      <Button
        v-if="note && note.id"
        class="mt-2 tg-body-mobile text-error text-opacity-medium pb-4"
        title="Delete"
        background="bg-transparent"
        :isRipple="false"
        @clicked="$emit('onDelete', note)"
      />
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';
import TextArea from '@/components/inputs/TextArea.vue';

export default {
  components: {
    Button,
    TextArea
  },
  props: {
    note: {
      type: [Object, null],
      default: null
    }
  },
  data() {
    return {
      newNote: this.note ? this.note.note : null
    };
  },
  methods: {
    save() {
      const note = {
        note: this.newNote
      };
      if (this.note) {
        note.id = this.note.id;
      }
      this.$emit('onSave', note);
    }
  }
};
</script>
