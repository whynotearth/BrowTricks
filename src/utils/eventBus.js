import Vue from 'vue';
const EventBus = new Vue();
export default EventBus;

// https://medium.com/@andrejsabrickis/https-medium-com-andrejsabrickis-create-simple-eventbus-to-communicate-between-vue-js-components-cdc11cd59860

// Usage:

// import EventBus from eventBus.js
// EventBus.$emit('something')

// Somewhere else:
// EventBus.$on('something', doSomething...)
