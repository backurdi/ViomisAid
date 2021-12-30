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
      donationValue: 0,
      paymentType: false,
      causes: [],
    },
    mutations: {
      donationValue(state, donationValue) {
        state.donationValue = donationValue;
      },
      paymentType(state, paymentType) {
        state.paymentType = paymentType;
      },
      setCauses(state, causes) {
        state.causes = causes;
      },
    },
    actions: {
      updatePaymentValueState({ commit }, paymentState) {
        commit("donationValue", paymentState);
      },
      updatePaymentTypeState({ commit }, paymentState) {
        commit("paymentType", paymentState);
      },
      async getCauses({ commit }) {
        await axios
          .get("http://localhost:3000/v1/payment/products")
          .then((causes) => {
            commit("setCauses", causes.data.data);
          });
      },
    },
  });
}
