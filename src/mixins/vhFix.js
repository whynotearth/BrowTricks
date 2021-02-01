import { isIE } from '@/helpers';

// TODO: move to utils folder
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
      const eventConfig = isIE ? false : { passive: true };
      window.addEventListener('resize', listener, eventConfig);

      this.$once('hook:destroyed', () => {
        document.removeEventListener('resize', listener, eventConfig);
      });
    }
  }
};
