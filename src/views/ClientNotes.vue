<template>
  <div class="bg-background text-left min-h-screen">
    <BaseHeader
      slot="header"
      class="bg-footer text-white"
      @iconClicked="goBack"
    >
      <ArrowBack slot="icon" class="h-6 w-6 fill-current" />
      <span slot="content" class="pl-5">Notes</span>
    </BaseHeader>
    <div class="mt-4 mx-4 px-2" v-if="isAddEditActive">
      <AddEditNote :note="selectedNote" @onSave="createOrUpdateNote" @onCancel="cancel" @onDelete="deleteNote" />
    </div>
    <div class="mt-4 mx-4 px-2" v-else>
      <Button
        class="rounded-full"
        title="Tap For New Note"
        :isRipple="false"
        @clicked="isAddEditActive = true"
      />

      <div class="mt-8 px-6" v-if="clientNotes.length > 0">
        <div @click="selectNote(note)" class="bg-white rounded-lg shadow-8dp p-4 my-4" v-for="note in clientNotes" :key="note.id">
          {{note.note}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseHeader from '@/components/BaseHeader.vue';
import ArrowBack from '@/assets/icons/arrow-back.svg';
import Button from '@/components/Button.vue';
import TextArea from '@/components/inputs/TextArea.vue';
import AddEditNote from '@/components/client/AddEditNote.vue';

import { mapGetters, mapActions } from 'vuex';
import { sleep } from '@/helpers.js';

export default {
  name: 'ClientNotifications',
  props: {
    tenantSlug: {
      type: String,
      required: true
    },
    clientId: {
      type: [String, Number],
      required: true
    }
  },
  components: {
    BaseHeader,
    ArrowBack,
    Button,
    TextArea,
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
  computed: {
    ...mapGetters('client', ['getClientById']),
    client() {
      return this.getClientById(this.clientId)
    }
  },
  created() {
    this.fetchNotes();
  },
  methods: {
    ...mapActions('client', ['createClientNote', 'deleteClientNote', 'fetchClientNotes']),
    goBack() {
      this.$router.go(-1);
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
        this.$store.commit('overlay/updateModel', {
          title: 'Success!',
          message: 'Client note deleted!'
        });
        await sleep(1500);
        this.$store.commit('overlay/updateModel', {
          title: '',
          message: ''
        });
        this.fetchNotes();
        this.isAddEditActive = false;
      })
    },
    selectNote(note) {
      this.selectedNote = note;
      this.isAddEditActive = true;
    },
    cancel() {
      if (this.selectedNote) {
        this.selectedNote = null;
      }
      this.isAddEditActive = false;
    }
  },
};
</script>
