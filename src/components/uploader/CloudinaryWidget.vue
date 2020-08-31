<template>
  <div :id="id" @click="openWidget()">
    <slot />
  </div>
</template>

<script>
const scriptUrl = 'https://widget.cloudinary.com/v2.0/global/all.js';
const scriptId = 'cloudinary-widget-script';
const nothing = () => {};
export default {
  name: 'CloudinaryWidget',
  data: () => ({
    widget: null
  }),
  props: {
    uploadPreset: {
      type: String,
      required: true
    },
    uploaderOptions: {
      default: () => {}
    },
    id: {
      type: String
    }
  },
  mounted() {
    this.loadWidgetScript();
    this.initInterval();
  },
  computed: {
    shouldInit() {
      return !this.widget;
    }
  },
  methods: {
    initInterval() {
      const interval = setInterval(() => {
        this.init()
          .then(() => {
            clearInterval(interval);
          })
          .catch(nothing);
      }, 500);

      this.$on('hook:beforeDestroy', () => {
        clearInterval(interval);
      });
    },
    loadWidgetScript() {
      const isScriptExist = document.getElementById(scriptId);
      if (isScriptExist) {
        this.init().catch(nothing);
        return;
      }
      let theScript = document.createElement('script');
      theScript.setAttribute('src', scriptUrl);
      theScript.async = true;
      theScript.id = scriptId;
      theScript.onload = () => {
        this.init().catch(nothing);
      };
      document.head.appendChild(theScript);
    },
    init() {
      // unsigned upload doccument https://cloudinary.com/documentation/upload_widget#unsigned_uploads
      // available options https://cloudinary.com/documentation/upload_widget#upload_widget_options
      return new Promise((resolve, reject) => {
        if (!this.shouldInit) {
          reject('Already initilized');
          return;
        }
        if (!window.cloudinary) {
          reject('Script is not loaded');
          return;
        }
        this.widget = window.cloudinary.createUploadWidget(
          {
            cloudName: 'whynotearth',
            uploadPreset: this.uploadPreset,
            theme: 'minimal',
            autoMinimize: true,
            ...this.uploaderOptions
          },
          (error, result) => {
            if (error) {
              this.$emit('error', error);
              return;
            }
            if (result) {
              if (result.event === 'source-changed') {
                this.$emit('widget-ready');
                resolve();
              }
              if (result.event === 'success') {
                console.log('result', result);
                this.$emit('uploaded', result);
              }
            }
            if (result.event === 'queues-end') {
              this.widget.close();
              this.$emit('closed');
            }
          }
        );
      });
    },
    async openWidget() {
      if (this.shouldInit) {
        return;
      }
      this.widget.open();
      this.$emit('opened');
    }
  }
};
</script>
