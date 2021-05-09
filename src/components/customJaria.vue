<template>
  <div class="jaria-project">
    <div class="custom-jaria">
      <h3>Vælg selv hvor meget du vil give</h3>
      <rangeSlider @input-change="inputChange" />
      <DonerButton :donationValue="inputData" :paymentType="true"/>
    </div>
  </div>
</template>

<script>
import rangeSlider from "./primitives/rangeslider";
import DonerButton from "../components/primitives/donerButton";

export default {
  name: "customJaria",
  components: {
    rangeSlider,
    DonerButton
  },
  data: function () {
    return {
      inputData: 0,
    };
  },
  methods: {
    inputChange: function(value) {
      this.inputData = value;
    },
  },
};
</script>

<style lang="scss">
.custom-jaria {
  flex-direction: column;
  display: flex;
  width: 800px;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border: 1px solid #BF861A;
  border-radius: 5px;
  padding: 40px;
  transition: all 150ms;
  margin-bottom: 80px;

  &:hover {
    .jaria-project__info-container__pay-button {
      opacity: 1;
    }
  }

  .donate-button {
    background: none;
    border: 1px solid var(--body-color);
    padding: 15px 45px;
    color: var(--body-color);
    transition: all 150ms;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background: var(--body-color);
      color: var(--bg-color);
    }
  }
}
</style>