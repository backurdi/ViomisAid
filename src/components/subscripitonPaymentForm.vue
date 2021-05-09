<template>
  <div class="payment-form-container">
    <div class="user-form">
      <div>
        <label for="email">Email</label>
        <input type="text" v-model="email" id="email" />
        <input type="text" v-model="description" id="description" />
        <button @click="handleButtonclick()">Payment</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
export default {
  name: "subscriptionPaymentForm",
  data: function () {
    return {
      email:"",
      description:"",
      stripe: "",
      handler:"",
    };
  },
  props: {
    showPaymentForm: Boolean,
    price: String,
  },
  methods: {
    handleButtonclick: function () {
      // console.log(this.price);
      // @ts-ignore
      this.createCheckoutSession(this.price).then((data) => {
        this.stripe = Stripe(data.publicKey);
        
        // Call Stripe.js method to redirect to the new Checkout page
        this.stripe
          .redirectToCheckout({
            sessionId: data.sessionId,
          })
          .then(this.handleResult);

      });
    },
    handleFetchResult: (result) => {
      if (result.status !== 200) {
        return result
          .json()
          .then(function (json) {
            if (json.error && json.error.message) {
              throw new Error(
                result.url + " " + result.status + " " + json.error.message
              );
            }
          })
          .catch(function (err) {
            this.showErrorMessage(err);
            throw err;
          });
      }
      return result.data;
    },
    createCheckoutSession: function (price) {
        return axios
        .post(
          "http://localhost:3000/v1/payment/getCheckoutSubscription",
          {
            amount: price,
            // email: this.email,
            description: this.description
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        ).then(this.handleFetchResult);
    },
    handleResult: (result) => {
      if (result.error) {
        // @ts-ignore
        this.showErrorMessage(result.error.message);
      }
    },
    showErrorMessage: (message) => {
      var errorEl = document.getElementById("error-message");
      errorEl.textContent = message;
      errorEl.style.display = "block";
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

</style>
