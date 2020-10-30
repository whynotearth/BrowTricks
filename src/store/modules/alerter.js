const defaultItem = {
  visible: false,
  text: '',
  class: ''
};

export default {
  namespaced: true,
  state: {
    item: { ...defaultItem }
  },
  mutations: {
    update(state, payload) {
      state.item = payload;
    },
    updateVisibility(state, payload) {
      state.item.visible = payload;
    }
  },
  actions: {
    show(context, payload) {
      const item = {
        ...defaultItem,
        ...payload,
        visible: true
      };
      context.commit('update', item);
    },
    updateVisibility(context, payload) {
      context.commit('updateVisibility', payload);
    }
  },
  getters: {
    alerterGet(state) {
      return state.item;
    }
  }
};
