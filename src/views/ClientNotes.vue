<template>
  <div class="max-w-xl mx-auto pt-4">
    <div class="mb-4 mx-4 " v-if="isAddEditActive">
      <AddEditNote
        :note="selectedNote"
        @save="createOrUpdateNote"
        @delete="deleteNote"
        @cancel="goBack"
      />
    </div>
    <div class="mb-4 mx-4 " v-else>
      <Button
        class="rounded-full"
        background="bg-brand2"
        title="Tap For New Note"
        :isRipple="false"
        @clicked="isAddEditActive = true"
      />

      <div class="mt-4 " v-if="clientNotes.length > 0">
        <div
          @click="selectNote(note)"
          class="bg-surface rounded-lg shadow-8dp p-4 my-4"
          v-for="note in clientNotes"
          :key="note.id"
        >
          <div
            class="text-on-surface text-opacity-medium tg-caption-mobile mb-4"
          >
            {{ format(new Date(note.createdAt), 'dd MMM, yyyy') }}
          </div>
          <div class="text-on-surface">
            {{ note.note }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddEditNote from '@/components/client/AddEditNote.vue';
import { format } from 'date-fns';
import { mapActions } from 'vuex';
import { sleep, showOverlayAndRedirect } from '@/helpers.js';

export default {
  name: 'ClientNotifications',
  props: ['tenantSlug', 'clientId'],
  components: {
    AddEditNote
  },
  data() {
    return {
      newNote: null,
      isAddEditActive: false,
      clientNotes: [],
      selectedNote: null
    };
  },
  created() {
    this.fetchNotes();
  },
  methods: {
    ...mapActions('client', [
      'createClientNote',
      'deleteClientNote',
      'fetchClientNotes'
    ]),
    goBack() {
      if (this.isAddEditActive) {
        if (this.selectedNote) {
          this.selectedNote = null;
        }
        this.isAddEditActive = false;
      } else {
        this.$router.go(-1);
      }
    },
    async fetchNotes() {
      const notes = await this.fetchClientNotes({
        clientId: this.clientId,
        tenantSlug: this.tenantSlug
      });

      this.clientNotes = notes ? notes : [];
    },
    createOrUpdateNote(note) {
      if (note) {
        this.createClientNote({
          clientId: this.clientId,
          tenantSlug: this.tenantSlug,
          body: {
            ...note
          }
        }).then(async () => {
          this.$store.commit('overlay/updateModel', {
            title: 'Success!',
            message: 'Client note added!'
          });
          await sleep(1500);
          this.$store.commit('overlay/updateModel', {
            title: '',
            message: ''
          });
          this.fetchNotes();
          this.isAddEditActive = false;
        });
      }
    },
    deleteNote(note) {
      this.deleteClientNote({
        clientId: this.clientId,
        tenantSlug: this.tenantSlug,
        noteId: note.id
      }).then(async () => {
        showOverlayAndRedirect({
          title: 'Success!',
          message: 'Client note deleted!'
        });
        this.fetchNotes();
        this.isAddEditActive = false;
        this.selectedNote = null;
      });
    },
    selectNote(note) {
      this.selectedNote = note;
      this.isAddEditActive = true;
    },
    format
  }
};
</script>
