<template>
  <div class="range-wrapper">
    <div class="range">
      <div class="field">
        <div class="value left">0</div>
        <input
          type="range"
          min="1"
          max="10000"
          value="100"
          steps="1"
          v-model="sliderValue"
          @change="$emit('input-change', sliderValue)"
        />
        <div class="value right">10000</div>
      </div>
    </div>
    <h3>{{ sliderValue }}</h3>
  </div>
</template>

<script>
export default {
  name: "rangeSlider",
  data: function () {
    return {
      sliderValue: 0,
    };
  },
  mounted: function () {},
};
</script>

<style>
.range-wrapper {
  width: 100%;
  text-align: center;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.range {
  height: 80px;
  width: 90%;
  border-radius: 10px;
  padding: 0 65px 0 45px;
}
.sliderValue {
  position: relative;
  width: 100%;
}
.sliderValue span {
  position: absolute;
  height: 45px;
  width: 45px;
  transform: translateX(-70%) scale(0);
  font-weight: 500;
  top: -40px;
  line-height: 55px;
  z-index: 2;
  color: var(--primary-color);
  transform-origin: bottom;
  transition: transform 0.3s ease-in-out;
}
.sliderValue span:after {
  position: absolute;
  content: "";
  height: 100%;
  width: 100%;
  background: var(--primary-color);
  border: 3px solid var(--primary-color);
  z-index: -1;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  border-bottom-left-radius: 50%;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
}
.field {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: relative;
}
.field .value {
  position: absolute;
  font-size: 18px;
  color: var(--primary-color);
  font-weight: 600;
}
.field .value.left {
  left: -22px;
}
.field .value.right {
  right: -63px;
}
.range input {
  -webkit-appearance: none;
  width: 100%;
  height: 5px;
  background: #ddd;
  border-radius: 5px;
  outline: none;
  border: none;
  z-index: 2222;
}
.range input::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--primary-color);
  border: 1px solid var(--body-color);
  cursor: pointer;
}
.range input::-moz-range-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  background: red;
  border-radius: 50%;
  background: #664aff;
  border: 1px solid #664aff;
  cursor: pointer;
}
.range input::-moz-range-progress {
  background: #664aff;
}
</style>
