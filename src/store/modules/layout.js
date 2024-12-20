export const layout = {
    namespaced: true,
    state: {
      sidebarOpen: false,
    },
    getters: {
      isSidebarOpen(state) {
        return state.sidebarOpen;
      },
    },
    mutations: {
      toggleSidebar(state) {
        state.sidebarOpen = !state.sidebarOpen;
      },
      closeSidebar(state) {
        state.sidebarOpen = false;
      },
      openSidebar(state) {
        state.sidebarOpen = true;
      },
    },
    actions: {
      toggleSidebar({ commit }) {
        console.log("Toggling sidebar");
        commit("toggleSidebar");
      },
      closeSidebar({ commit }) {
        commit("closeSidebar");
      },
      openSidebar({ commit }) {
        commit("openSidebar");
      },
    },
  };
  


  