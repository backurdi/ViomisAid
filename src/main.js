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
      donationValue: 0,
      paymentType: false
    },
    mutations: {
      donationValue({ state }, donationValue) {
        this.state.donationValue = donationValue;
      },
      paymentType({ state }, paymentType) {
        this.state.paymentType = paymentType;
      },
    },
    actions: {
      updatePaymentValueState({ commit }, paymentState) {
        commit("donationValue", paymentState);
      },
      updatePaymentTypeState({ commit }, paymentState) {
        commit("paymentType", paymentState);
      },
    },
  });
}
