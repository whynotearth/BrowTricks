<template>
  <canvas :width="`${width}px`" :height="`${height}px`" ref="canvas"></canvas>
</template>

<script>
import SignaturePad from 'signature_pad';
export default {
  name: 'SignaturePad',
  props: {
    value: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 280
    },
    height: {
      type: Number,
      default: 240
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    instance: null
  }),
  computed: {
    defaultOptions() {
      // https://github.com/szimek/signature_pad#options
      return {
        // dotSize: (0.5 + 2.5) / 2,
        // minWidth: 0.5,
        // maxWidth: 2.5,
        // throttle: 16,
        // minDistance: 5,
        // backgroundColor: 'rgba(0,0,0,0)',
        // penColor: 'black',
        // velocityFilterWeight: 0.7,
        onEnd: this.onEnd
      };
    }
  },
  mounted() {
    const canvas = this.$refs.canvas;
    this.instance = new SignaturePad(canvas, {
      ...this.defaultOptions,
      ...this.options
    });
  },
  methods: {
    undo() {
      let data = this.instance.toData();
      if (data) {
        data.pop();
        this.instance.fromData(data);
      }
      this.emitData();
    },
    onEnd() {
      console.log('onEnd');
      this.emitData();
    },
    emitData() {
      this.$emit('input', this.instance.toDataURL());
    }
  }
};
</script>
