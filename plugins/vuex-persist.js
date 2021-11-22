import VuexPersistence from "vuex-persist";

export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
      key: "vuex",
      storage: window.localStorage,
      reducer: state => ({
        auth: {
          user: state.auth.user
        },
      })
    }).plugin(store);
  });
};
