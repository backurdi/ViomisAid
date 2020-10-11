// Import main css
import "~/assets/style/index.scss";
import Vuex from "vuex";

// Import default layout so we don't need to import it to every page
import DefaultLayout from "~/layouts/Default.vue";

// The Client API can be used here. Learn more: gridsome.org/docs/client-api
export default function(Vue, { router, head, isClient, appOptions }) {
  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);

  Vue.use(Vuex);
  appOptions.store = new Vuex.Store({
    state: {
      title: "",
    },
    mutations: {
      paymentState({ state }, title) {
        console.log(this.state);
        this.state.title = title;
      },
    },
    actions: {
      updateState({ commit }, paymentState) {
        commit("paymentState", paymentState);
      },
    },
  });
}
