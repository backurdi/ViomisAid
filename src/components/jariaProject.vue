<template>
  <div class="jaria-project">
    <div class="jaria-project__wrapper">
      <!-- <img src="../../static/images/hero.jpg" alt /> -->
      <div class="jaria-project__img" />
      <div class="jaria-project__info-container">
        <div class="jaria-project__info-container__text-container">
          <h3>{{ jariaTitle }}</h3>
          <p>{{ jariaText }}</p>
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
    jariaTitle: String,
    jariaText: String,
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
    }
    &__pay-button {
      text-align: right;
      font-size: 30px;
      opacity: 0;
      transition: opacity 150ms;
    }
  }
}
</style>
