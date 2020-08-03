<template>
  <div :id="id">
    <slot />
  </div>
</template>

<script>
const scriptUrl = 'https://widget.cloudinary.com/v2.0/global/all.js';
const scriptId = 'cloudinary-widget-script';
export default {
  name: 'CloudinaryWidget',
  props: {
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
      // unsigned upload doccument https://cloudinary.com/documentation/upload_widget#unsigned_uploads
      // available options https://cloudinary.com/documentation/upload_widget#upload_widget_options
      var myWidget = window.cloudinary.createUploadWidget(
        {
          cloudName: 'whynotearth',
          uploadPreset: 'browtricks_tenant_CMS',
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
            if (result.event === 'success') {
              console.log('result', result);
              this.$emit('uploaded', result);
            }
          }
        }
      );

      document.getElementById(this.id).addEventListener(
        'click',
        () => {
          this.$emit('opened');
          myWidget.open();
        },
        false
      );
    }
  }
};
</script>
