<template>
  <div :id="id" @click="openWidget()">
    <slot />
  </div>
</template>

<script>
const scriptUrl = 'https://widget.cloudinary.com/v2.0/global/all.js';
const scriptId = 'cloudinary-widget-script';
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
  },
  methods: {
    loadWidgetScript() {
      const isScriptExist = document.getElementById(scriptId);
      if (isScriptExist) {
        this.init();
        return;
      }
      let theScript = document.createElement('script');
      theScript.setAttribute('src', scriptUrl);
      theScript.async = true;
      theScript.id = scriptId;
      theScript.onload = () => {
        this.init();
      };
      document.head.appendChild(theScript);
    },
    init() {
      if (!window.cloudinary) {
        console.log('Not loaded script yet');
        return;
      }
      // unsigned upload doccument https://cloudinary.com/documentation/upload_widget#unsigned_uploads
      // available options https://cloudinary.com/documentation/upload_widget#upload_widget_options
      return new Promise(resolve => {
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
                resolve('Widget Initialized');
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
      if (!this.widget) {
        await this.init();
      }
      this.widget.open();
      this.$emit('opened');
    }
  }
};
</script>
