<template>
  <div class="max-w-xl mx-auto pt-4">
    <div class="mb-4 mx-4 pb-20">
      <Button
        class="rounded-full"
        background="bg-brand2"
        title="Tap For New Note"
        :isRipple="false"
        @clicked="addNote"
      />

      <div class="mt-4 " v-if="clientNotes.length > 0">
        <router-link
          v-for="noteItem in clientNotes"
          :key="noteItem.id"
          title="Edit Note"
          :to="{ name: 'EditClientNote', params: { id: noteItem.id } }"
          class="bg-surface rounded-lg shadow-8dp p-4 my-4 w-full block"
        >
          <div
            class="text-on-surface text-opacity-medium tg-caption-mobile mb-4"
          >
            <time>{{
              formatDateTime(noteItem.createdAt, { dateFormat: 'dd MMM, yyyy' })
            }}</time>
          </div>
          <div class="text-on-surface">
            {{ noteItem.note }}
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { formatDateTime } from '@/helpers';

export default {
  name: 'ClientNotes',
  props: ['tenantSlug', 'clientId'],
  data() {
    return {
      clientNotes: []
    };
  },
  async created() {
    this.loadingUpdate(true);
    await this.fetchNotes();
    this.loadingUpdate(false);
  },
  methods: {
    ...mapActions('client', ['notesFetch']),
    ...mapActions('loading', ['loadingUpdate']),
    async fetchNotes() {
      const notes = await this.notesFetch({
        clientId: this.clientId,
        tenantSlug: this.tenantSlug
      });

      this.clientNotes = notes ? notes.map(this.prepareForList) : [];
    },
    formatDateTime,
    prepareForList(noteItem) {
      const content = noteItem.note;
      const maxLength = 500;
      return {
        ...noteItem,
        note:
          content.substring(0, maxLength) +
          (content.length > maxLength ? '...' : '')
      };
    },
    addNote() {
      this.$router.push({ name: 'AddClientNote' });
    }
  }
};
</script>
