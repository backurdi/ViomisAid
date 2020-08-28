<template>
  <div class="subscriptionPaymentForm">
    <div id="sq-ccbox">
      <form id="nonce-form" novalidate>
        <div class="errorbox">
          <div class="error" v-for="error in errors" :key="error.message">
            {{ error }}
          </div>
        </div>
        <div id="card-tainer">
          <div
            class="cardfields card-number"
            :id="id + '-sq-card-number'"
            ref="card_number"
          >
            o
          </div>
          <div
            class="cardfields expiration-date"
            :id="id + '-sq-expiration-date'"
            ref="expire_date"
          >
            e
          </div>
          <div class="cardfields cvv" :id="id + '-sq-cvv'" ref="cvv">e</div>
          <div
            class="cardfields postal-code"
            :id="id + '-sq-postal-code'"
            ref="card_number"
          >
            e
          </div>
        </div>

        <input type="hidden" id="card-nonce" name="nonce" />
      </form>
    </div>
    <button @click="requestCardNonce($event)" class="productPurchase payButton">
      Pay
    </button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "subscripitonPaymentForm",
  data: function() {
    return {
      errors: [],
      masterpass: false,
      applePay: false,
    };
  },
  watch: {
    showPaymentForm: function() {
      if (!this.showPaymentForm) {
        return 1;
      }
    },
  },
  props: {
    showPaymentForm: Boolean,
    id: Number,
  },
  mounted: function() {
    let locationId = "LXY88438XK8HM";
    let applicationId = "sandbox-sq0idb-1w812CcRQqIlsLK-BTxyGQ";
    let that = this;
    this.paymentForm = new SqPaymentForm({
      autoBuild: false,
      applicationId: applicationId,
      locationId: locationId,
      inputClass: "sq-input",
      // Initialize the payment form elements
      // Customize the CSS for SqPaymentForm iframe elements
      inputStyles: [
        {
          fontSize: "1.5em",
        },
      ],
      // // Initialize Apple Pay placeholder ID
      // applePay: {
      //   elementId: that.id + "-sq-apple-pay",
      // },
      // // Initialize Masterpass placeholder ID
      // masterpass: {
      //   elementId: that.id + "-sq-masterpass",
      // },
      // Initialize the credit card placeholders
      cardNumber: {
        elementId: that.id + "-sq-card-number",
        elementClass: "test",
        placeholder: "Card number",
      },
      cvv: {
        elementId: that.id + "-sq-cvv",
        placeholder: "CVV",
      },
      expirationDate: {
        elementId: that.id + "-sq-expiration-date",
        placeholder: "MM / YY",
      },
      postalCode: {
        elementId: that.id + "-sq-postal-code",
        placeholder: "Zip Code",
      },
      // SqPaymentForm callback functions
      callbacks: {
        /*
         * callback function: methodsSupported
         * Triggered when: the page is loaded.
         */
        methodsSupported: function(methods) {
          // Only show the button if Apple Pay for Web is enabled
          // Otherwise, display the wallet not enabled message.
          that.applePay = methods.applePay;
          that.masterpass = methods.masterpass;
        },
        /*
         * Digital Wallet related functions
         */
        createPaymentRequest: function() {
          var paymentRequestJson;
          console.log(paymentRequestJson);
          /* ADD CODE TO SET/CREATE paymentRequestJson */
          return paymentRequestJson;
        },
        validateShippingContact: function(contact) {
          var validationErrorObj;
          /* ADD CODE TO SET validationErrorObj IF ERRORS ARE FOUND */
          return validationErrorObj;
        },
        /*
         * callback function: cardNonceResponseReceived
         * Triggered when: SqPaymentForm completes a card nonce request
         */
        cardNonceResponseReceived: function(errors, nonce, cardData) {
          if (errors) {
            errors.forEach(function(error) {
              that.errors.push(error.message);
            });
            return;
          }
          // Assign the nonce value to the hidden form field
          document.getElementById("card-nonce").value = nonce;

          axios
            .post("http://localhost:3001/process-payment", {
              nonce: nonce,
              amount_money: { amount: 200000, currency: "USD" },
              location_id: locationId,
            })
            .then((res) => {
              console.log(res);
            });
        },
        /*
         * callback function: paymentFormLoaded
         * Triggered when: SqPaymentForm is fully loaded
         */
        paymentFormLoaded: function() {
          console.log("paymentFormLoaded");
          /* HANDLE AS DESIRED */
        },
      },
    });
    this.paymentForm.build();
  },
  methods: {
    requestCardNonce: function(event) {
      event.preventDefault();
      // Request a nonce from the SqPaymentForm object
      return this.paymentForm.requestCardNonce();
    },

    // paymentButtonClicked(event) {
    //   this.requestCardNonce(event);
    //   axios
    //     .post("http://localhost:3001/process-payment")
    //     .then((re) => console.log(res));
    // },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.subscriptionPaymentForm {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.sq-input {
  border: 1px solid rgb(223, 223, 223);
  outline-offset: -2px;
  margin-bottom: 5px;
  display: inline-block;
  border: none;
  color: #32325d;
  line-height: 18px;
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-size: 16px;
  height: 18px;
  -webkit-font-smoothing: antialiased;
}
.sq-input ::placeholder {
  color: #aab7c4;
  opacity: 0.5;
}
/* Define how SqPaymentForm iframes should look when they have focus */
/* Define how SqPaymentForm iframes should look when they contain invalid values */
.sq-input--error {
  outline: 3px auto rgb(255, 97, 97);
}
.errorbox {
  line-height: 14px;
  text-align: left;
}
.error {
  font-size: 10px;
  color: rgb(164, 0, 30);
  width: 45%;
  display: inline-block;
  margin-top: -10px;
  font-weight: 400;
}
/* Customize the "Pay with Credit Card" button */
.button-credit-card {
  min-width: 200px;
  min-height: 20px;
  padding: 0;
  margin: 5px;
  line-height: 20px;
  box-shadow: 2px 2px 1px rgb(200, 200, 200);
  background: rgb(255, 255, 255);
  border-radius: 5px;
  border: 1px solid rgb(200, 200, 200);
  font-weight: bold;
  cursor: pointer;
}
.cardfields {
  height: 40px;
  padding: 5px;
}
.card-number {
  width: 100%;
}
.payButton {
  width: 40%;
  height: 40px;
  border-radius: 100px;
  background-color: #4ec3cd;
  font-size: 17px;
  font-weight: 600;
  color: white;
  border: 1px solid white;
}
/* Customize the "{{Wallet}} not enabled" message */
.wallet-not-enabled {
  min-width: 200px;
  min-height: 40px;
  max-height: 64px;
  padding: 0;
  margin: 10px;
  line-height: 40px;
  background: #eee;
  border-radius: 5px;
  font-weight: lighter;
  font-style: italic;
  font-family: inherit;
  display: block;
}
/* Customize the Apple Pay on the Web button */
.button-apple-pay {
  min-width: 200px;
  min-height: 40px;
  max-height: 64px;
  padding: 0;
  margin: 10px;
  background-image: -webkit-named-image(apple-pay-logo-white);
  background-color: black;
  background-size: 100% 60%;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  border-radius: 5px;
  cursor: pointer;
  display: none;
}
/* Customize the Masterpass button */
.button-masterpass {
  min-width: 200px;
  min-height: 40px;
  max-height: 40px;
  padding: 0;
  margin: 10px;
  background-image: url(https://static.masterpass.com/dyn/img/btn/global/mp_chk_btn_147x034px.svg);
  background-color: black;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  border-radius: 5px;
  border-color: rgb(255, 255, 255);
  cursor: pointer;
}
#sq-walletbox {
  text-align: center;
  vertical-align: top;
  font-weight: bold;
}
#sq-ccbox {
  margin: 5px;
  padding: 0px 10px;
  text-align: center;
  vertical-align: top;
  font-weight: bold;
}
.expiration-date,
.cvv,
.postal-code {
  width: 30%;
  display: inline-block;
}
#card-tainer {
  text-align: left;
  margin-top: 8px;
  background-color: white;
  padding: 10px 12px;
  border-radius: 4px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  border: 1px solid transparent;
  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
  box-sizing: border-box;
}
</style>
