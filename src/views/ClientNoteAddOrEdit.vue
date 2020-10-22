<template>
  <div class="max-w-xl mx-auto pt-4 mb-20 px-4">
    <div class="py-6 px-2 bg-surface rounded-lg shadow-8dp">
      <TextAreaInput
        class="text-on-surface"
        v-model="$v.newNote.$model"
        label="Note"
        labelBg="bg-surface"
        rows="6"
        :validatorModel="$v.newNote"
      >
        <p v-if="!$v.newNote.required">
          Note is required
        </p>
      </TextAreaInput>
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
        @clicked="goBack"
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
          @clicked="_noteDelete(note)"
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
import { sleep, showOverlayAndRedirect } from '@/helpers.js';
import { mapActions, mapMutations, mapState } from 'vuex';
import { required } from 'vuelidate/lib/validators';

export default {
  components: {
    TextAreaInput,
    BaseDialog
  },
  validations: {
    newNote: {
      required
    }
  },
  data() {
    return {
      newNote: null,
      isDeleteModalOpen: false,
      note: null
    };
  },
  computed: {
    ...mapState('client', ['selectedNote'])
  },
  methods: {
    ...mapMutations('client', ['setSelectedNote']),
    ...mapActions('client', ['noteSave', 'noteDelete']),
    save() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      const note = {
        note: this.newNote
      };
      if (this.note) {
        note.id = this.note.id;
      }
      this.createOrUpdateNote(note);
    },
    createOrUpdateNote(note) {
      if (note) {
        this.noteSave({
          clientId: this.$route.params.clientId,
          tenantSlug: this.$route.params.tenantSlug,
          body: {
            ...note
          }
        })
          .then(async () => {
            this.$store.commit('overlay/updateModel', {
              title: 'Success!',
              message: 'Note added.'
            });
            await sleep(1500);
            this.$store.commit('overlay/updateModel', {
              title: '',
              message: ''
            });
            this.goBack();
          })
          .catch(() => {
            alert('Failed to save.');
          });
      }
    },
    _noteDelete() {
      this.noteDelete({
        clientId: this.$route.params.clientId,
        tenantSlug: this.$route.params.tenantSlug,
        noteId: this.note.id
      })
        .then(async () => {
          showOverlayAndRedirect({
            title: 'Success!',
            message: 'Note deleted.'
          });
          this.goBack();
        })
        .catch(() => {
          alert('Failed to delete.');
        });
    },
    goBack() {
      this.$router.push({ name: 'ClientNotes' });
    }
  },

  watch: {
    selectedNote(val) {
      this.note = val;
    }
  },

  beforeMount() {
    if (this.selectedNote && this.selectedNote.id !== this.$route.params.id) {
      this.goBack();
    }
  },

  mounted() {
    this.note = this.selectedNote;
    this.newNote = this.selectedNote.note;
  },

  beforeDestroy() {
    this.setSelectedNote(null);
  }
};
</script>
