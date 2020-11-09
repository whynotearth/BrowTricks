<template>
  <div
    class="wrapper max-w-md mx-auto pt-2 text-on-background text-opacity-high tg-body-mobile"
  >
    <!-- form title -->
    <router-link
      :to="{ name: 'FormTemplateItemEditMeta' }"
      class="tg-body-mobile"
    >
      <div
        class="px-4 md:px-0 flex justify-between py-3 border-b border-divider border-opacity-divider mb-6"
      >
        <label
          for="formTemplateName"
          class="text-on-background text-opacity-high pr-2"
        >
          Name
        </label>
        <div class="flex items-center text-on-background text-opacity-medium">
          <span id="formTemplateName" class="mr-2 tg-body-mobile">{{
            currentTemplateGet.name
          }}</span>
          <IconArrowRight
            class="fill-current text-on-background text-opacity-medium"
          />
        </div>
      </div>
    </router-link>

    <div class="px-4 md:px-0" :class="{ 'is-dragging': isDragging }">
      <Button
        v-if="shouldShowPreviewButton"
        class="uppercase mb-6"
        @clicked="isPreviewModalOpen = true"
        title="Preview & Test"
      />

      <!-- current questions -->
      <SortableList
        @sort-start="isDragging = true"
        @sort-end="isDragging = false"
        :useDragHandle="true"
        :useWindowAsScrollContainer="true"
        :pressDelay="0"
        lockAxis="y"
        v-model="currentTemplateGet.items"
        @input="fieldsUpdate"
      >
        <SortableItem
          v-for="(field, index) in currentTemplateGet.items"
          :key="index"
          :item="field"
          :index="index"
        >
          <a @click.prevent="selectField(field, index)" class="cursor-pointer">
            <FormTemplateFieldTypeCard
              class="relative"
              :attrs="{ rounded: index === 0 ? 'rounded-t' : null }"
              :icon="field.icon"
              :name="field.title"
              :value="field.value"
              :type="field.type"
            >
              <div
                title="Drag to reorder"
                v-handle
                class="w-12 h-12 absolute top-0 right-0 flex items-center justify-center"
              >
                <IconReorder
                  class="fill-current text-on-surface text-opacity-medium"
                ></IconReorder>
              </div>
              <div class="content-preview">
                <p class="text-on-background text-opacity-high">
                  {{ field.value }}
                </p>
              </div>
              <img
                class="card-image-preview block mt-4"
                v-if="get(field, 'options[0].value')"
                :src="
                  changeCloudinaryExtension(
                    get(field, 'options[0].value'),
                    'jpg'
                  )
                "
                alt=""
              />
            </FormTemplateFieldTypeCard>
          </a>
        </SortableItem>
      </SortableList>

      <!-- add question -->
      <router-link
        class="z-10 relative"
        :to="{
          name: 'FormTemplateFieldSelection'
        }"
      >
        <BaseCard
          className="items-center flex-col select-none"
          padding="py-4 px-4"
          rounded="rounded-b"
        >
          <div class="mb-6">
            <IconAdd
              class="fill-current text-on-surface text-opacity-high w-4 h-4"
            />
          </div>

          <h2 class="text-on-surface text-opacity-high mb-6 tg-h3-mobile">
            Add Question
          </h2>

          <p class="tg-caption-mobile text-on-surface text-opacity-high">
            Tap to add a new question to your form.
          </p>
        </BaseCard>
      </router-link>
    </div>

    <div class="py-6">
      <Button
        textColor="text-error"
        title="Delete Form Template"
        :background="null"
        @clicked="isDeleteModalOpen = true"
      />
    </div>

    <BaseDialog
      v-if="isDeleteModalOpen"
      @close="isDeleteModalOpen = false"
      title="Delete Form Template?"
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
        @clicked="remove"
        width="w-auto"
        :margin="null"
      />
    </BaseDialog>

    <FormTemplatePreviewModal
      v-if="isPreviewModalOpen"
      @close="isPreviewModalOpen = false"
      :tenantSlug="tenantSlug"
      :templateId="templateId"
    />
  </div>
</template>

<script>
import FormTemplateFieldTypeCard from '@/components/formTemplate/FormTemplateFieldTypeCard';
import FormTemplatePreviewModal from '@/components/formTemplate/FormTemplatePreviewModal';
import IconArrowRight from '@/assets/icons/keyboard_arrow_right.svg';
import BaseCard from '@/components/BaseCard';
import BaseDialog from '@/components/BaseDialog';
import IconAdd from '@/assets/icons/add.svg';
import IconReorder from '@/assets/icons/reorder.svg';
import { showOverlayAndRedirect, changeCloudinaryExtension } from '@/helpers';
import { ContainerMixin, ElementMixin, HandleDirective } from 'vue-slicksort';
import { mapActions, mapGetters } from 'vuex';
import noPullToRefresh from '@/utils/noPullToRefreshMixin.js';
import { cloneDeep, get } from 'lodash-es';

const SortableList = {
  mixins: [ContainerMixin],
  /*
  same as: `<ul><slot /></ul>`
  */
  render: function(createElement) {
    return createElement('ul', this.$slots.default);
  }
};

const SortableItem = {
  mixins: [ElementMixin],
  props: ['item'],
  /*
  same as: `<li><slot /></li>`
  */
  render: function(createElement) {
    return createElement(
      'li',
      {
        attrs: {
          class: 'list-none tg-body-mobile'
        }
      },
      this.$slots.default
    );
  }
};

export default {
  name: 'FormTemplateItemEdit',
  mixins: [noPullToRefresh],
  directives: { handle: HandleDirective },
  props: ['tenantSlug'],
  components: {
    FormTemplatePreviewModal,
    BaseDialog,
    SortableList,
    SortableItem,
    FormTemplateFieldTypeCard,
    IconArrowRight,
    IconReorder,
    BaseCard,
    IconAdd
  },
  data: () => ({
    isDragging: false,
    isPreviewModalOpen: false,
    isDeleteModalOpen: false
  }),
  computed: {
    ...mapGetters('formTemplate', ['currentTemplateGet']),
    shouldShowPreviewButton() {
      return get(this.currentTemplateGet, 'items.length', 0) > 0;
    },
    templateId() {
      return this.$route.params.formId;
    }
  },
  async created() {
    this.loadingUpdate(true);
    await this.init();
    this.loadingUpdate(false);
  },
  methods: {
    ...mapActions('loading', ['loadingUpdate']),
    ...mapActions('formTemplate', [
      'templateSave',
      'templateFetch',
      'currentFieldUpdate',
      'templateDelete'
    ]),
    get,
    changeCloudinaryExtension,
    async init() {
      if (this.currentTemplateGet.draft && !this.$route.query.refresh) {
        return;
      }
      if (!this.templateId) {
        throw new Error('Something went wrong');
      }

      await this._templateFetch();
    },
    _templateFetch() {
      return this.templateFetch({
        params: {
          templateId: this.templateId,
          tenantSlug: this.tenantSlug
        }
      }).catch(() => {
        // This can happen after creating a template then using browser back (which leads browser to draft template again)
        console.log('Could not get form template');
      });
    },
    fieldsUpdate(updatedItems) {
      const updatedTemplate = {
        ...this.currentTemplateGet,
        items: cloneDeep(updatedItems)
      };

      // TODO: add a delay and throttle
      this.templateSave({
        template: updatedTemplate,
        tenantSlug: this.tenantSlug
      }).then(this._templateFetch);
    },
    remove() {
      this.templateDelete({
        isDraft: this.currentTemplateGet.draft,
        params: {
          templateId: this.templateId,
          tenantSlug: this.tenantSlug
        }
      })
        .then(async () => {
          this.isDeleteModalOpen = false;
          showOverlayAndRedirect({
            title: 'Success!',
            message: 'Form template deleted successfully!',
            route: { name: 'FormTemplatesList' }
          });
        })
        .catch(() => {
          alert('Something went wrong.');
        });
    },
    selectField(field) {
      this.currentFieldUpdate(field);
      this.$router.push({
        name: 'FormTemplateFieldEdit',
        params: { fieldId: field.id },
        query: { type: field.type }
      });
    }
  }
};
</script>

<style scoped>
.card-image-preview {
  max-height: 352px;
}
/* .is-dragging .content-preview {
  transform: scale(0.5);
} */
</style>
