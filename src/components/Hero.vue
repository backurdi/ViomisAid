<template>
  <div class="author">
    <div class="author__top-content">
      <div class="author__top-content__text">
        <h1 class="author__top-content__text__site-title">
          Vi har et ansvar for at hjælpe
        </h1>
        <p class="author__top-content__text__intro">
          Støt dine brødre og søstre som ikke har så meget
        </p>
      </div>
      <div class="author__top-content__img-container">
        <img
          class="author__top-content__image"
          src="@/../static/images/hero.png"
        />
      </div>
    </div>
    <div class="quick-donation">
      <h4>Quick donation</h4>
      <form action="#" class="quick-donation__form">
        <select
          name="paymentType"
          id="payment-type"
          v-model="quiclDonationFields.type"
        >
          <option value="monthly">Monthly</option>
          <option value="oneTime">One time</option>
        </select>
        <input
          type="text"
          name="amount"
          placeholder="Amount"
          v-model="quiclDonationFields.price"
        />
        <select name="cause" id="cause" v-model="quiclDonationFields.title">
          <option selected value="">Select cause</option>
          <option
            v-for="(cause, index) in causes"
            :key="index"
            :value="cause.title"
          >
            {{ cause.title }}
          </option>
        </select>
        <div class="submit">
          <button
            class="submit__btn"
            @click.prevent="quickDonate"
            :disabled="
              !quiclDonationFields.title.length || !quiclDonationFields.price
            "
          >
            Donate
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  props: ["showTitle"],
  data: () => ({
    quiclDonationFields: {
      type: "monthly",
      price: 0,
      title: "",
    },
  }),
  computed: {
    ...mapState(["causes"]),
  },
  methods: {
    ...mapMutations(["setChosenCharity"]),
    quickDonate() {
      this.setChosenCharity(this.quiclDonationFields);
      this.$router.push("/payment");
    },
  },
};
</script>

<style lang="scss">
.author {
  border-radius: 10px;
  margin-bottom: 40px;

  &__top-content {
    padding: 20px 100px;
    display: flex;
    justify-content: space-between;

    &__img-container {
      width: 50%;
    }

    &__image {
      width: 100%;
    }

    &__text {
      height: fit-content;
      align-self: center;

      &__site-title {
        max-width: 700px;
        font-size: 3rem;
        font-weight: 600;
        color: var(--primary-color);
      }

      &__intro {
        font-size: 1.5rem;
        color: var(--primary-color);
        max-width: 700px;
        font-weight: 600;
      }
    }
  }

  &__bottom-content {
    .help-words {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      .word {
        margin-right: 2px;
        font-size: 1.2rem;
        background-color: rgb(33, 100, 223);
        padding: 8px 20px;
        border-radius: 10px;
        margin-bottom: 2px;
        color: white;
        font-weight: 600;
      }
    }
  }

  &__links {
    margin-top: -0.5em;
    a {
      margin: 0 0.5em;
      color: #fff;
      border: 1px solid #fff;
      background-color: #bf861a;
      font-weight: 600;
      padding: 10px 25px;
      border-radius: 10px;
      transition: background-color 150ms, color 150ms;
      text-decoration: none;

      &:hover {
        background-color: #fff;
        color: #fff;
        color: rgb(114, 4, 124);
      }
    }
  }

  .quick-donation {
    width: 60%;
    padding: 10px 15px 20px 15px;
    border-radius: 5px;
    margin: 0 auto;
    background-color: var(--secondary-color);
    text-align: center;

    h4 {
      margin-bottom: 10px;
      color: var(--body-color);
    }

    &__form {
      display: grid;
      grid-template-columns: repeat(4, 1fr);

      select {
        padding: 5px 10px;
        border: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        text-indent: 1px;
        text-overflow: "";
        width: 90%;
        margin: 0 auto;
      }

      input {
        height: 100%;
        border: none;
      }

      .submit {
        display: flex;
        justify-content: flex-end;
        &__btn {
          width: 40%;
          border-radius: 5px;
          background-color: var(--primary-color);
          color: var(--body-color);

          &:disabled {
            background-color: var(--primary-light-color);
            color: gray;
          }
        }
      }
    }
  }
}
</style>
