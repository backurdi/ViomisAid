<template>
  <div class="jaria-project">
    <div class="jaria-project__wrapper" :class="{ reverse: index % 2 === 0 }">
      <g-image
        alt="Cover image"
        v-if="jariaData.jaria_image"
        class="jaria-project__img"
        :src="jariaData.jaria_image"
      />
      <div class="jaria-project__info-container">
        <div class="jaria-project__info-container__text-container">
          <div
            class="jaria-project__info-container__text-container__title-container"
          >
            <h3>{{ jariaData.title }}</h3>
            <h2 class="price" :class="{ 'price-reverse': index % 2 === 0 }">
              {{ jariaData.price + " DKK" }}
            </h2>
          </div>
          <p>{{ jariaData.description }}</p>
        </div>
        <button
          class="jaria-project__info-container__pay-button"
          @click="goToDonationPage"
        >
          Støt
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "jariaProject",
  props: {
    jariaData: {},
    index: 0,
  },
  data: function () {
    return {};
  },
  mounted: function () {
    console.log(this.jariaData);
  },
  methods: {
    goToDonationPage: function () {
      this.$store.dispatch("updatePaymentValueState", this.jariaData.price);
      this.$store.dispatch("updatePaymentTypeState", true);
      this.$router.push("/payment");
    },
  },
};
</script>

<style lang="scss">
.jaria-project {
  display: flex;
  justify-content: center;
  margin-bottom: 50px;

  &__wrapper {
    display: flex;
    width: 100%;
    align-items: center;
    border-radius: 5px;
    transition: all 150ms;
  }

  &__img {
    width: 200px;
    height: 200px;
    background-image: url(/assets/img/hero.jpg);
    background-size: cover;
    border-radius: 50%;
    background-position-x: -108px;
    margin-right: 10px;
  }

  &__info-container {
    display: flex;
    flex-direction: column;
    align-items: row-reverse;
    width: 100%;
    height: 100%;
    border: 1px solid var(--primary-color);
    padding: 15px;
    background-color: var(--body-color);
    border-radius: 5px;

    &__text-container {
      text-align: left;
      color: var(--primary-dark-color);

      &__title-container {
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;

        h3 {
          color: var(--primary-dark-color);
        }

        .price {
          width: fit-content;
          font-size: 20px;
          border: 1px solid var(--primary-dark-color);
          padding: 5px 10px;
          border-radius: 5px;
          color: var(--primary-dark-color);
          margin-top: 10px;
        }
        .price-reverse {
          align-self: flex-start;
        }
      }

      p {
        font-size: 14px;
        font-weight: 300;
      }
    }
    &__pay-button {
      font-size: 20px;
      color: var(--body-color);
      background-color: var(--primary-color);
      border: none;
      width: fit-content;
      align-self: flex-start;
      padding: 10px 30px;
      border-radius: 5px;
    }
  }
  .reverse {
    flex-direction: row-reverse;

    .jaria-project__info-container {
      &__text-container {
        text-align: right;
      }
      &__pay-button {
        align-self: flex-end;
      }
      &__text-container__title-container {
        .price-reverse {
          align-self: flex-end;
        }
      }
    }
    .jaria-project__img {
      margin-right: 0px;
      margin-left: 10px;
    }
  }
}
</style>
