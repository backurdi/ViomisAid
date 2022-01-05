<template>
  <div class="payment-page-container">
    <div class="payment-page-back-btn">
      <button @click="goBack">
        <ArrowLeftIcon></ArrowLeftIcon>
      </button>
    </div>
    <div class="payment-page-wrapper">
      <div class="payment-page">
        <div class="payment-page__left">
          <h2>Jazakumu allahu khairan</h2>
          <h3>Some realy good Hadeeth about giving</h3>
        </div>
        <div class="payment-page__right">
          <form action="#" class="payment-page__right__form">
            <select
              name="paymentType"
              id="payment-type"
              v-model="charityToPay.type"
            >
              <option value="monthly">Monthly</option>
              <option value="oneTime">One time</option>
            </select>
            <input
              type="text"
              name="amount"
              placeholder="Amount"
              :value="charityToPay ? charityToPay.price : ''"
            />
            <select name="cause" id="cause" v-model="charityToPay.title">
              <option
                v-for="(cause, index) in causes"
                :value="cause.title"
                :key="index"
              >
                {{ cause.title }}
              </option>
            </select>
            <div class="payment-page__right__form__button">
              <button @click.prevent="handleButtonclick">Donate</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ArrowLeftIcon } from "@vue-hero-icons/solid";
import { mapState } from "vuex";
import axios from "axios";
export default {
  components: {
    ArrowLeftIcon,
  },
  computed: {
    ...mapState(["causes", "charity"]),
  },
  data: function () {
    return {
      charityToPay: { type: "monthly", price: 0, cause: "" },
    };
  },
  mounted() {
    this.charityToPay = this.charity;
    if (!this.charity.type) {
      this.charityToPay.type = "monthly";
    }
    console.log(this.charityToPay);
    console.log(this.causes);
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    handleButtonclick() {
      this.createCheckoutSession().then((data) => {
        this.stripe = Stripe(data.publicKey);

        // Call Stripe.js method to redirect to the new Checkout page
        this.stripe
          .redirectToCheckout({
            sessionId: data.sessionId,
          })
          .then(this.handleResult);
      });
    },
    createCheckoutSession() {
      return axios
        .post(
          "http://localhost:3000/v1/payment/getCheckout",
          {
            lineItems: [
              {
                price: this.charityToPay.price_id,
                quantity: 1,
              },
            ],
            intend: this.charityToPay.title,
            mode: "subscription",
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then(this.handleFetchResult);
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
      return window.location.replace(result.data.url);
    },
  },
};
</script>

<style lang="scss">
.payment-page-container {
  background-color: var(--primary-color);
  padding: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
}

.payment-page-back-btn {
  width: 100%;
  max-width: 700px;

  button {
    margin-bottom: 10px;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    border: 1px solid var(--body-color);
    background-color: var(--primary-color);
    cursor: pointer;

    svg {
      width: 20px;
      height: 20px;
      fill: var(--body-color);
    }

    &:hover {
      background-color: var(--body-color);

      svg {
        fill: var(--primary-color);
      }
    }
  }
}

.payment-page-wrapper {
  display: flex;
  justify-content: center;
}

.payment-page {
  display: flex;
  background-color: var(--secondary-color);
  max-width: 700px;
  justify-content: center;
  border-radius: 20px;

  &__left {
    width: 100%;
    padding: 40px 30px;
    background-image: linear-gradient(
        rgba(240, 221, 203, 0.45),
        rgba(240, 221, 203, 0.45)
      ),
      url("../../static/images/payment-bg.png");
    background-size: cover;
    border-radius: 20px 0 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h2 {
      font-size: 2.3rem;
      color: var(--primary-color);
    }
  }

  &__right {
    width: 100%;
    padding: 120px 30px;
  }

  &__right__form {
    display: grid;
    grid-template-rows: repeat(4, minmax(50px, 1fr));
    grid-row-gap: 40px;

    select,
    input {
      border: 1px solid var(--primary-dark-color);
      border-radius: 5px;
      padding: 0 10px;
    }

    &__button {
      display: flex;
      justify-content: flex-end;
      input {
        padding: 10px 20px;
        background-color: var(--primary-color);
        color: var(--body-color);
        border: none;
      }
    }
  }
}
</style>
