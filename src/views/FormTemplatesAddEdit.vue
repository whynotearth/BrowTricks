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
        class="px-4 flex justify-between py-3 border-b border-divider border-opacity-divider mb-6"
      >
        <label
          for="formTemplateName"
          class="text-on-background text-opacity-high"
        >
          Name
        </label>
        <div class="flex items-center text-on-background text-opacity-medium">
          <span id="formTemplateName" class="mr-2">Untitled</span>
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
        v-model="currentFields"
        @input="fieldsUpdate"
      >
        <SortableItem
          v-for="(field, index) in currentFields"
          :key="index"
          :item="field"
          :index="index"
        >
          <FormTemplateFieldTypeCard
            :attrs="{ rounded: index === 0 ? 'rounded-t' : null }"
            :icon="field.icon"
            :title="field.title"
            :fieldtype="field.fieldtype"
          >
            <p class="text-on-background text-opacity-high">
              {{ field.textContent }}
            </p>
          </FormTemplateFieldTypeCard>
        </SortableItem>
      </SortableList>

      <!-- add question -->
      <router-link
        :to="{
          name: 'FormTemplateFieldSelection',
          query: { formId: $route.params.formId }
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

    <div class="py-6" v-if="isEdit">
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
import { mapActions } from 'vuex';
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
  name: 'FormTemplatesAddEdit',
  mixins: [noPullToRefresh],
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
  computed: {
    isEdit() {
      return this.$route.params.formId;
    }
  },
  data: () => ({
    isDeleteModalOpen: false,
    currentFields: [
      {
        title: 'Upload 1',
        icon: 'IconImages',
        fieldtype: 'upload',
        textContent: 'content of question here.....'
      },
      {
        title: 'Upload 2',
        icon: 'IconImages',
        fieldtype: 'upload',
        textContent: 'content of question here.....'
      },
      {
        title: 'Upload 3',
        icon: 'IconImages',
        fieldtype: 'upload',
        textContent: 'content of question here.....'
      }
    ]
  }),
  methods: {
    ...mapActions('tenant', ['deleteFormTemplate']),
    fieldsUpdate(list) {
      console.log('updated list', list);
    },
    remove() {
      console.log('TODO: delete');

      this.deleteFormTemplate({
        params: {
          hi: 1
        }
      }).then(async () => {
        this.isDeleteModalOpen = false;
        showOverlayAndRedirect({
          title: 'Success!',
          message: 'Form template deleted successfully!',
          route: { name: 'FormTemplatesList' }
        });
      });
    }
  }
};
</script>
