<template>
  <div class="max-w-xl mx-auto pt-4 mb-20 px-4">
    <div class="py-6 px-2 bg-surface rounded-lg shadow-8dp">
      <TextAreaInput
        class="text-on-surface"
        v-model="$v.content.$model"
        label="Note"
        labelBg="bg-surface"
        rows="6"
        :validatorModel="$v.content"
      >
        <p v-if="!$v.content.required">
          Note is required
        </p>
      </TextAreaInput>
    </div>
    <div class="py-8">
      <p v-if="errorMessage" class="mb-4 text-error tg-body-mobile">
        {{ errorMessage }}
      </p>

      <Button
        class="rounded-full mb-4"
        background="bg-brand2"
        title="Save"
        @clicked="submit"
      />
      <Button
        class="mb-2"
        textColor="text-on-background text-opacity-medium"
        title="Cancel"
        @clicked="goBack"
        :background="null"
      />
      <Button
        v-if="noteId"
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
          @clicked="_noteDelete(noteId)"
          width="w-auto"
          :margin="null"
        />
      </BaseDialog>
    </div>
  </div>
</template>

<script>
import TextAreaInput from '@/components/inputs/TextAreaInput.vue';
import { showOverlayAndRedirect } from '@/helpers.js';
import { mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import formGeneralUtils from '@/mixins/formGeneralUtils.js';

export default {
  name: 'ClientNoteAddOrEdit',
  // NOTE: we use a mixin
  mixins: [formGeneralUtils],
  props: ['tenantSlug', 'clientId'],
  components: {
    TextAreaInput
  },
  validations: {
    content: {
      required
    }
  },
  data() {
    return {
      content: null,
      isDeleteModalOpen: false
    };
  },
  computed: {
    noteId() {
      return Number(this.$route.params.id) || undefined;
    }
  },
  created() {
    this._fetchNote();
  },
  methods: {
    ...mapActions('client', ['noteSave', 'noteDelete', 'notesFetch']),
    async _fetchNote() {
      if (this.noteId) {
        this.loadingUpdate(true);
        const notes = await this.notesFetch({
          clientId: this.clientId,
          tenantSlug: this.tenantSlug
        });
        this.content = notes.find(item => item.id === this.noteId).note;
        this.loadingUpdate(false);
      }
    },
    submit() {
      if (!this.beforeSubmit()) {
        return;
      }

      this.noteSave({
        clientId: this.$route.params.clientId,
        tenantSlug: this.$route.params.tenantSlug,
        body: {
          id: this.noteId,
          note: this.content
        }
      })
        .then(this.onSuccess)
        .catch(this.onSubmitCatch);
    },
    onSuccess() {
      showOverlayAndRedirect({
        title: 'Success!',
        route: {
          name: 'ClientNotes'
        }
      });
    },
    _noteDelete(noteId) {
      this.noteDelete({
        clientId: this.$route.params.clientId,
        tenantSlug: this.$route.params.tenantSlug,
        noteId: noteId
      })
        .then(async () => {
          showOverlayAndRedirect({
            title: 'Success!',
            message: 'Note deleted.',
            route: { name: 'ClientNotes' }
          });
        })
        .catch(() => {
          alert('Failed to delete.');
        });
    },
    goBack() {
      this.$router.push({ name: 'ClientNotes' });
    }
  }
};
</script>
