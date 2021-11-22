export const state = () => ({});
export const mutations = {};
export const actions = {
  async nuxtServerInit({
    commit,
    store,
    req,
    route,
    app,
    redirect,
    nuxt,
    dispatch,
    getters
  }) {
  }
};
export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn;
  },
  loggedInUser(state) {
    return state.auth.user;
  },
};
