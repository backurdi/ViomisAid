<template>
  <div class="payment-form-container">
    <div class="user-form">
      <div>
        <label for="email">Email</label>
        <input type="text" v-model="email" id="email" />
      </div>
    </div>
    <div ref="dropinContainer" id="dropin-container"></div>
  </div>
</template>

<script>
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
export default {
  name: "subscriptionPaymentForm",
  data: function () {
    return {
      email: "",
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
              this.submitAdditionalPaymentData(state.data);
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
      return axios.get(`http://localhost:3001/payment/getPaymentMethods`);
    },
    initPaymentCheckout: function (configuration) {
      return new AdyenCheckout(configuration);
    },

    makePayment(paymentData) {
      this.dropin.setStatus("loading");
      const paymentObj = {
        subscriber: {
          name: paymentData.paymentMethod.holderName,
          email: this.email,
        },
        paymentData: {
          returnUrl: window.location.href,
          origin: window.origin,
          browserInfo: this.browserInfo,
          paymentMethod: paymentData,
        },
      };

      if (paymentData.storePaymentMethod) {
        paymentObj.storePaymentMethod = paymentData.storePaymentMethod;
      }

      if (window.localStorage.customerReference) {
        paymentObj.shopperReference = window.localStorage.customerReference;
      }

      return axios
        .post("http://localhost:3001/payment/startSubscription", paymentObj)
        .then((res) => {
          debugger;
          if (paymentObj.storePaymentMethod) {
            window.localStorage.setItem(
              "customerReference",
              res.data.customerReference
            );
          }
          this.dropin.setStatus("success");
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.user-form {
  display: flex;

  div {
    flex: 1 0;
    display: flex;
    flex-direction: column;

    label {
      color: #00112c;
      font-size: 15px;
      font-weight: 600;
      padding-bottom: 8px;
    }

    input {
      height: 40px;
      border: 1px solid #b9c4c9;
      caret-color: #cccccc;
      margin-bottom: 20px;
      border-radius: 6px;

      &:focus,
      &:active {
        border: 1px solid #cccccc;
        box-shadow: none;
      }
    }

    &:not(:last-child) {
      margin-right: 20px;
    }
  }
}

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
  margin-bottom: 20px;

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

.adyen-checkout__store-details {
  display: none;
}

.adyen-checkout__label__text {
  font-size: 15px;
  font-weight: 600;
  padding-bottom: 8px;
}
</style>
