<template>
  <div class="max-w-xl mx-auto pt-4">
    <div class="mb-4 mx-4 ">
      <Button
        class="rounded-full"
        background="bg-brand2"
        title="Tap For New Note"
        :isRipple="false"
        @clicked="addNote"
      />

      <div class="mt-4 " v-if="clientNotes.length > 0">
        <div
          @click="editNote(note)"
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
import { format } from 'date-fns';
import { mapActions, mapMutations } from 'vuex';

export default {
  name: 'ClientNotifications',
  props: ['tenantSlug', 'clientId'],
  data() {
    return {
      clientNotes: []
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
    ...mapMutations('client', ['setSelectedNote']),
    async fetchNotes() {
      const notes = await this.fetchClientNotes({
        clientId: this.clientId,
        tenantSlug: this.tenantSlug
      });

      this.clientNotes = notes ? notes : [];
    },
    format,
    addNote() {
      this.$router.push({ name: 'AddClientNote' });
    },
    editNote(note) {
      this.setSelectedNote(note);
      this.$router.push({ name: 'EditClientNote', params: { id: note.id } });
    }
  }
};
</script>
