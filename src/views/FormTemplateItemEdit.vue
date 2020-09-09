<template>
  <div
    class="wrapper max-w-md mx-auto pt-2 text-on-background text-opacity-high"
  >
    <!-- form title -->
    <router-link
      :to="{ name: 'FormTemplateFieldSelection' }"
      class="tg-body-mobile"
    >
      <div
        class="px-4 md:px-0 flex justify-between py-3 border-b border-divider border-opacity-divider mb-6"
      >
        <label
          for="formTemplateName"
          class="text-on-background text-opacity-high"
        >
          Name
        </label>
        <div class="flex items-center text-on-background text-opacity-medium">
          <span id="formTemplateName" class="mr-2">{{
            currentTemplateGet.name
          }}</span>
          <IconArrowRight
            class="fill-current text-on-background text-opacity-medium"
          />
        </div>
      </div>
    </router-link>

    <div class="px-4 md:px-0">
      <!-- current questions -->
      <SortableList
        :useWindowAsScrollContainer="true"
        :pressDelay="300"
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
              :attrs="{ rounded: index === 0 ? 'rounded-t' : null }"
              :icon="field.icon"
              :name="field.title"
              :value="field.value"
              :type="field.type"
            >
              <p class="text-on-background text-opacity-high">
                {{ field.textContent }}
              </p>
            </FormTemplateFieldTypeCard>
          </a>
        </SortableItem>
      </SortableList>

      <!-- add question -->
      <router-link
        :to="{
          name: 'FormTemplateFieldSelection'
        }"
      >
        <BaseCard
          className="items-center flex-col select-none"
          rounded="rounded-b"
        >
          <div class="mb-6">
            <IconAdd
              class="fill-current text-on-surface text-opacity-high w-4 h-4"
            />
          </div>

          <h2 class="text-on-surface text-opacity-high mb-6">
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
        theme="none"
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
        theme="none"
        @clicked="isDeleteModalOpen = false"
        width="w-auto"
        :margin="null"
      />
      <Button
        textColor="text-error"
        title="Delete"
        theme="none"
        @clicked="remove"
        width="w-auto"
        :margin="null"
      />
    </BaseDialog>
  </div>
</template>

<script>
import FormTemplateFieldTypeCard from '@/components/pmu/FormTemplateFieldTypeCard';
import IconArrowRight from '@/assets/icons/keyboard_arrow_right.svg';
import BaseCard from '@/components/BaseCard';
import BaseDialog from '@/components/BaseDialog';
import Button from '@/components/inputs/Button';
import IconAdd from '@/assets/icons/add.svg';
import { showOverlayAndRedirect } from '@/helpers';
import { ContainerMixin, ElementMixin } from 'vue-slicksort';
import { mapActions, mapGetters } from 'vuex';
import noPullToRefresh from '@/utils/noPullToRefreshMixin.js';

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
          class: 'list-none'
        }
      },
      this.$slots.default
    );
  }
};

export default {
  name: 'FormTemplateItemEdit',
  mixins: [noPullToRefresh],
  props: ['tenantSlug'],
  components: {
    BaseDialog,
    Button,
    SortableList,
    SortableItem,
    FormTemplateFieldTypeCard,
    IconArrowRight,
    BaseCard,
    IconAdd
  },
  data: () => ({
    isDeleteModalOpen: false
  }),
  computed: {
    ...mapGetters('formTemplate', ['currentTemplateGet'])
  },
  created() {
    this.init();
  },
  methods: {
    ...mapActions('formTemplate', [
      'templateFetch',
      'currentTemplateUpdate',
      'currentFieldUpdate',
      'templateDelete'
    ]),
    async init() {
      if (!this.currentTemplateGet.draft) {
        // TODO: handle errors
        await this.templateFetch({
          params: {
            templateId: this.$route.params.formId,
            tenantSlug: this.tenantSlug
          }
        });
      }
    },
    fieldsUpdate(list) {
      console.log('updated list', list);
    },
    remove() {
      this.templateDelete({
        isDraft: this.currentTemplateGet.draft,
        params: {
          tenantSlug: this.tenantSlug,
          templateId: this.$route.params.formId
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
      console.log('field', field);
      this.currentFieldUpdate(field);
      this.$router.push({
        name: 'FormTemplateFieldEdit',
        params: { fieldId: field.id }
      });
    }
  }
};
</script>
