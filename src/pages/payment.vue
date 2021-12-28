<template>
  <div class="payment-page-container">
    <button class="payment-page-back-btn" @click="goBack">
      <ArrowLeftIcon></ArrowLeftIcon>
    </button>
    <div class="payment-page">
      <div class="payment-page__left">
        <h2>Jazakumu allahu khairan</h2>
        <h3>Some realy good Hadeeth about giving</h3>
      </div>
      <div class="payment-page__right">
        <form action="#" class="payment-page__right__form">
          <select name="paymentType" id="payment-type">
            <option value="monthly">Monthly</option>
            <option value="oneTime">One time</option>
          </select>
          <input type="text" name="amount" placeholder="Amount" />
          <select name="cause" id="cause">
            <option value="cause1">Cause 1</option>
            <option value="cause2">Cause 2</option>
          </select>
          <div class="payment-page__right__form__button">
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ArrowLeftIcon } from "@vue-hero-icons/solid";
export default {
  components: {
    ArrowLeftIcon,
  },
  methods: {
    goBack() {
      this.$router.go(-1);
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
  margin: 0 auto;
}

.payment-page-back-btn {
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

.payment-page {
  display: flex;
  background-color: var(--secondary-color);
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
