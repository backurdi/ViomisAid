// Import main css
import "~/assets/style/index.scss";
import Vuex from "vuex";

// Import default layout so we don't need to import it to every page
import DefaultLayout from "~/layouts/Default.vue";
import axios from "axios";

// The Client API can be used here. Learn more: gridsome.org/docs/client-api
export default function (Vue, { router, head, isClient, appOptions }) {
  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);

  Vue.use(Vuex);
  appOptions.store = new Vuex.Store({
    state: {
      charity: {},
      causes: [],
    },
    mutations: {
      setCauses(state, causes) {
        state.causes = causes;
      },
      setChosenCharity(state, charity) {
        state.charity = charity;
      },
    },
    actions: {
      fetchZipCode({ commit }, zipCode) {
        return axios
          .get(`https://api.dataforsyningen.dk/postnumre?nr=${zipCode}`)
          .then((zipCodeInfo) => {
            return zipCodeInfo.data;
          });
      },
    },
  });
}
