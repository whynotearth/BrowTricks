export default {
  mounted() {
    this.vhFixerListenResize();
    this.fixVhUnit();
  },
  methods: {
    // article: https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
    fixVhUnit() {
      // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
      let vh = window.innerHeight * 0.01;
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    },
    vhFixerListenResize() {
      const listener = () => {
        this.fixVhUnit();
      };
      // TODO: use debounce for performance
      window.addEventListener('resize', listener);

      this.$once('hook:destroyed', () => {
        document.removeEventListener('resize', listener);
      });
    }
  }
};
