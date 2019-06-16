const common = {
  namespaced: true,
  state: {
    activePageName: ''
  },
  mutations: {
    updateActivePageName(state, activePageName) {
      console.log(state, activePageName)
      console.log('updateActivePageName', activePageName)
      state.activePageName = activePageName
      console.log(state.activePageName)
    }
  },
  actions: {},
  getters: {
    activePageName: state => state.activePageName
  }
};

export default common;
