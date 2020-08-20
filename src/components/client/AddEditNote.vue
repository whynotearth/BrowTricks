<template>
  <div>
    <div class="py-6 px-2 bg-surface rounded-lg shadow-8dp">
      <TextArea
        class="text-on-surface"
        v-model="newNote"
        label="Note"
        labelBg="bg-surface"
      />
    </div>
    <div class="py-8">
      <Button class="rounded-full mb-4" title="Save" @clicked="save" />
      <Button
        class="mb-2"
        textColor="text-on-background text-opacity-medium"
        title="Cancel"
        @clicked="$emit('cancel', note)"
        theme="none"
      />
      <Button
        v-if="note && note.id"
        class="mb-2"
        textColor="text-error text-opacity-medium"
        title="Delete"
        theme="none"
        @clicked="$emit('delete', note)"
      />
    </div>
  </div>
</template>

<script>
import Button from '@/components/inputs/Button.vue';
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
      this.$emit('save', note);
    }
  }
};
</script>
