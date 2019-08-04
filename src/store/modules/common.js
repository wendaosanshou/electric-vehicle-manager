const common = {
  state: {
    activePageName: '',
    defaultActiveMenu: '1'
  },
  mutations: {
    updateActivePageName(state, activePageName) {
      state.activePageName = activePageName
    },
    updateDefaultActiveMenu(state, defaultActiveMenu) {
      state.defaultActiveMenu = defaultActiveMenu
    }
  },
  actions: {},
  getters: {
    activePageName: state => state.activePageName,
    defaultActiveMenu: state => state.defaultActiveMenu
  }
};

export default common;
