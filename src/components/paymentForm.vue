<template>
  <div class="payment-form-container">
    <form netlify>
      <input type="text" placeholder="name">
      <input type="submit" placeholder="submit">
    </form>
    <!--<div ref="dropinContainer" id="dropin-container"></div>-->
  </div>
</template>

<script>
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
export default {
  name: "paymentForm",
  data: function () {
    return {
      plans: {},
      dropin: {},
      configuration: {
        paymentMethodsResponse: {},
        originKey:
          "pub.v2.8016011921003193.aHR0cDovL2xvY2FsaG9zdDo4MDgw.G0zQPFnIGQmWoO2h8D0RpDdLRZDABLB6uv4bH36Kzjo",
        locale: "da-DK",
        environment: "test",
        paymentMethodsConfiguration: {
          card: {
            showPayButton: true,
            hasHolderName: true,
            holderNameRequired: true,
            enableStoreDetails: true,
            name: "Credit or debit card",
            amount: {
              value: 1000,
              currency: "DKK",
            },
          },
        },
      },
      browserInfo: {
        acceptHeader: "*/*",
        colorDepth: screen.colorDepth,
        javaEnabled: true,
        language: navigator.language,
        screenHeight: screen.height,
        screenWidth: screen.width,
        timeZoneOffset: `${new Date().getTimezoneOffset()}`,
        userAgent: navigator.userAgent,
      },
    };
  },
  watch: {
    showPaymentForm: function () {
      if (!this.showPaymentForm) {
        return 1;
      }
    },
  },
  props: {
    showPaymentForm: Boolean,
    id: Number,
  },
  mounted: function () {
    this.fetchPaymentMethods()
      .then((paymentMethods) => {
        this.configuration.paymentMethodsResponse = paymentMethods.data.result;
        return this.initPaymentCheckout(this.configuration);
      })
      .then((adyenCheckout) => {
        this.dropin = adyenCheckout
          .create("dropin", {
            // Handles the onSubmit event from the payment form
            onSubmit: (state, dropin) => {
              this.makePayment(state.data);
            },
            //If any additional action from the user is needed, the flow for that goes here
            onAdditionalDetails: (state, dropin) => {
              console.log(state.data);
              // this.submitAdditionalPaymentData(state.data);
            },
          })
          .mount(this.$refs.dropinContainer);
      });
  },
  methods: {
    fetchPaymentMethods: function () {
      let shopperReference;
      if (window.localStorage.customerReference) {
        shopperReference = window.localStorage.customerReference;
      }
      return axios.get(
        `http://localhost:3001/payment/getPaymentMethods?shopperReference=${shopperReference}`
      );
    },
    initPaymentCheckout: function (configuration) {
      return new AdyenCheckout(configuration);
    },

    makePayment(paymentData) {
      this.dropin.setStatus("loading");
      const paymentObj = {
        returnUrl: window.location.href,
        origin: window.origin,
        browserInfo: this.browserInfo,
        paymentMethod: paymentData,
      };

      if (paymentData.storePaymentMethod) {
        paymentObj.storePaymentMethod = paymentData.storePaymentMethod;
      }

      if (window.localStorage.customerReference) {
        paymentObj.shopperReference = window.localStorage.customerReference;
      }

      return axios
        .post("http://localhost:3001/payment/makePayment", paymentObj)
        .then((res) => {
          debugger;
          if (paymentObj.storePaymentMethod) {
            window.localStorage.setItem(
              "customerReference",
              res.data.customerReference
            );
          }
          if (res.data.result === "Authorised") {
            this.dropin.setStatus("success");
          }
          if (res.data.action) {
            debugger;
            this.dropin.handleAction(res.data.action);
          }
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.adyen-checkout__loading-input__form {
  display: flex;
  flex-direction: column-reverse;
}
.adyen-checkout__payment-method__header {
  display: none;
}

.adyen-checkout__payment-method {
  background-color: transparent;
  border: none;
}

.adyen-checkout__payment-method__details {
  padding: 0;
}

.adyen-checkout__card__form {
  display: flex;

  .adyen-checkout__field--cardNumber {
    margin-right: 20px;
  }
}
.adyen-checkout__card__holderName {
  margin-bottom: 40px;
}

.adyen-checkout__input {
  height: 40px;
  caret-color: #cccccc;
  margin-bottom: 5px;

  &:focus,
  &:active {
    border: 1px solid #cccccc;
    box-shadow: none;
  }
}

.adyen-checkout__input--focus {
  border: 1px solid #cccccc;
  box-shadow: none;
  caret-color: #cccccc;
}

.adyen-checkout__label__text {
  font-size: 15px;
  font-weight: 600;
  padding-bottom: 8px;
}
</style>
