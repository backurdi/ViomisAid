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
          <h3>{{ jariaData.title }}</h3>
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
  mounted: function() {
    console.log(this.jariaData);
  },
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
    background-color: #102b41;
    border-radius: 5px;
    padding: 40px;
    transition: background-color 150ms, scale 150ms;
    margin-bottom: 80px;

    &:hover {
      background-color: #2a5d87;
      transform: scale(1.02);

      .jaria-project__info-container__pay-button {
        opacity: 1;
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

    .jaria-project__info-container__text-container {
      text-align: left;
    }
  }
}
</style>
