<template>
  <div>
    <div class="py-6 px-2 bg-surface rounded-lg shadow-8dp">
      <TextAreaInput
        class="text-on-surface"
        v-model="newNote"
        label="Note"
        labelBg="bg-surface"
        rows="6"
      />
    </div>
    <div class="py-8">
      <Button
        class="rounded-full mb-4"
        background="bg-brand2"
        title="Save"
        @clicked="save"
      />
      <Button
        class="mb-2"
        textColor="text-on-background text-opacity-medium"
        title="Cancel"
        @clicked="$emit('cancel', note)"
        :background="null"
      />
      <Button
        v-if="note && note.id"
        class="mb-2"
        textColor="text-error text-opacity-medium"
        title="Delete"
        :background="null"
        @clicked="isDeleteModalOpen = true"
      />
      <BaseDialog
        v-if="isDeleteModalOpen"
        @close="isDeleteModalOpen = false"
        title="Delete Note?"
      >
        <Button
          textColor="text-on-primary text-opacity-medium"
          title="Cancel"
          :background="null"
          @clicked="isDeleteModalOpen = false"
          width="w-auto"
          :margin="null"
        />
        <Button
          textColor="text-error"
          title="Delete"
          :background="null"
          @clicked="$emit('delete', note)"
          width="w-auto"
          :margin="null"
        />
      </BaseDialog>
    </div>
  </div>
</template>

<script>
import TextAreaInput from '@/components/inputs/TextAreaInput.vue';
import BaseDialog from '@/components/BaseDialog.vue';

export default {
  components: {
    TextAreaInput,
    BaseDialog
  },
  props: {
    note: {
      type: [Object, null],
      default: null
    }
  },
  data() {
    return {
      newNote: this.note ? this.note.note : null,
      isDeleteModalOpen: false
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
