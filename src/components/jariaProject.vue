<template>
  <div class="jaria-project" @click="goToDonationPage" >
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
            <h2 v-if="index % 2 !== 0" class="price">
              {{ jariaData.price + " DKK" }}
            </h2>
            <h3>{{ jariaData.title }}</h3>
            <h2 v-if="index % 2 === 0" class="price">
              {{ jariaData.price + " DKK" }}
            </h2>
          </div>
          <p>{{ jariaData.description }}</p>
        </div>
        <div class="jaria-project__info-container__pay-button">Støt</div>
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
  methods:{
    goToDonationPage:function(){
      this.$store.dispatch("updatePaymentValueState", this.jariaData.price);
      this.$store.dispatch("updatePaymentTypeState", true);
      this.$router.push('/payment');
    }
  }
};
</script>

<style lang="scss">
.jaria-project {
  display: flex;
  justify-content: center;

  &__wrapper {
    display: flex;
    width: 800px;
    height: 250px;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    border: 1px solid #BF861A;
    border-radius: 5px;
    padding: 40px;
    transition: all 150ms;
    margin-bottom: 80px;

    &:hover {
      background-color: #fdfdfd;
      transform: scale(1.02);
      cursor: pointer;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

      .jaria-project__info-container__pay-button {
        color: #BF861A;
        opacity: 1;
      }

      &:active {
        transform: translateY(-5px);
        box-shadow: 0px 10px 5px 1px #697c8b;
      }
    }
  }

  &__img {
    width: 200px;
    height: 200px;
    background-image: url(/assets/img/hero.jpg);
    background-size: cover;
    border-radius: 50%;
    background-position-x: -108px;
  }

  &__info-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 60%;
    height: 100%;
    color: #fff;
    &__text-container {
      text-align: right;

      &__title-container {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;

        .price {
          font-size: 20px;
          border: 1px solid;
          padding: 5px 10px;
          border-radius: 5px;
        }
      }

      p {
        font-size: 14px;
        font-weight: 300;
        color: #839eb4;
      }
    }
    &__pay-button {
      text-align: right;
      font-size: 30px;
      opacity: 0;
      transition: opacity 150ms;
    }
  }
  .reverse {
    flex-direction: row-reverse;

    .jaria-project__info-container {
      &__text-container {
        text-align: left;
      }
      &__pay-button {
        text-align: left;
      }
    }
  }
}
</style>
