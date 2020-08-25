<template>
  <div class="relative" :class="[error ? 'markdown-error' : 'markdown-grey']">
    <MarkDownStyle>
      <vue-simplemde
        v-model="content"
        :key="key"
        :configs="configs"
        ref="markdownEditor"
      />
    </MarkDownStyle>
    <div class="flex items-center error absolute bottom-0 left-0">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import VueSimplemde from 'vue-simplemde';

export default {
  name: 'BaseEditor',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    error: {
      type: Boolean,
      default: false
    },
    value: {
      required: true
    },
    placeholder: {
      type: String
    },
    model: {
      type: Object
    }
  },
  data() {
    return {
      content: this.value || '',
      key: 1,
      configs: {
        status: [
          {
            className: 'max-length',
            onUpdate: el => {
              if (this.model) {
                if (
                  this.content.length > this.model.$params.maxLength.max &&
                  !el.classList.value.includes('text-error')
                ) {
                  el.classList.add('text-error');
                } else if (
                  this.content.length <= this.model.$params.maxLength.max
                ) {
                  el.classList.remove('text-error');
                }
                this.counter = this.content.length;
                el.innerHTML = `${this.counter} / ${this.model.$params.maxLength.max}`;
              }
            }
          }
        ],
        spellChecker: false,
        placeholder: this.placeholder,
        hideIcons: ['code', 'table', 'side-by-side', 'fullscreen', 'image']
      }
    };
  },
  components: {
    VueSimplemde
  },
  methods: {
    updateValue() {
      this.$emit('change', this.content);
    }
  },
  watch: {
    content() {
      this.updateValue();
    },
    value: {
      immediate: true,
      handler() {
        this.content = this.value || '';
      }
    },
    model: {
      immediate: true,
      handler() {
        this.key = Math.random()
          .toString(36)
          .substr(2, 9);
      }
    }
  }
};
</script>

<style scoped>
@import '~simplemde/dist/simplemde.min.css';

.error {
  bottom: 8px;
  height: 18px;
}
.markdown-grey /deep/ .CodeMirror {
  z-index: 0;
}
.markdown-error,
.markdown-error /deep/ .CodeMirror,
.markdown-error /deep/ .editor-toolbar {
  @apply border-red-600;
}

.markdown-grey,
.markdown-grey /deep/ .CodeMirror,
.markdown-grey /deep/ .editor-toolbar {
  @apply opacity-100 border-gray-600;
}

.markdown-error /deep/ .editor-toolbar a {
  @apply opacity-75;
}

.markdown-grey /deep/ .editor-toolbar a {
  @apply opacity-50;
}
</style>
