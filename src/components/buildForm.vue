<template>
  <div>
    <button class="start-btn" v-if="!buildStarted" @click="buildStarted = true">
      Start
    </button>
    <div v-else class="step-wrapper">
      <h3 v-if="sliderIndex < buildSteps.length">
        {{ buildSteps[sliderIndex].title }}
      </h3>
      <div class="navigation-btn">
        <button @click="sliderIndex--">Prev</button>
        <button @click="sliderIndex++">Next</button>
      </div>
      <Slider
        v-if="sliderIndex < buildSteps.length"
        :autoplay="false"
        :control-btn="false"
        :height="`${
          buildSteps[sliderIndex]
            ? Math.ceil(buildSteps[sliderIndex].actions.length / 4) !== 1
              ? 273 * Math.ceil(buildSteps[sliderIndex].actions.length / 4)
              : 300
            : 300
        }px`"
        v-model="sliderIndex"
      >
        <div
          class="step-container"
          v-for="(buildStep, index) in buildSteps"
          :key="index"
        >
          <SliderItem>
            <div class="step-container__wrapper">
              <div
                v-for="(step, index) in buildStep.actions"
                :key="index"
                @click="chooseBox($event, step, sliderIndex, buildStep.type)"
                class="step-container__action"
              >
                <p>{{ step.title }}</p>
                <p>{{ step.value }}</p>
              </div>
            </div>
          </SliderItem>
        </div>
      </Slider>
      <div v-else>
        <div class="result-container">
          <h5>
            Så er din brønd klar, sikre at alt er som det skal være og tryk
            gokend
          </h5>
          <template v-for="(result, index) in getResult()">
            <div
              v-if="result.value"
              :key="index"
              class="result-container__field"
            >
              <p>{{ result.title }}</p>
              <p>{{ result.value }}</p>
            </div>
          </template>
          <div class="result-container__field-total">
            <p>Total</p>
            <p>{{ value }}</p>
          </div>
          <div class="result-container__button-container">
            <button
              class="result-container__button-container__back"
              @click="sliderIndex = 0"
            >
              Gå tilbage
            </button>
            <button
              class="result-container__button-container__accept"
              @click="handleButtonclick()"
            >
              Godkend
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Slider, SliderItem } from "vue-easy-slider";
import axios from "axios";
export default {
  components: {
    Slider,
    SliderItem,
  },
  props: ["buildSteps"],
  data: function () {
    return {
      buildStarted: false,
      value: 0,
      sliderIndex: 0,
      resultArr: [],
    };
  },
  methods: {
    // TODO: Fix UI show chosen box
    chooseBox(event, step, index, type) {
      console.log(event);
      const currentIndex = this.resultArr.find(
        (result) => result.index === index
      );
      const currentStep = this.resultArr[
        this.resultArr.indexOf(currentIndex)
      ]?.chosenFields.find((field) => field.title === step.title);
      if (currentIndex) {
        debugger;
        if (
          currentStep ||
          (type === "Single" && currentIndex.chosenFields.length)
        ) {
          currentIndex.chosenFields[
            currentStep ? currentIndex.chosenFields.indexOf(currentStep) : 0
          ] = step;
          event.target.classList.toggle("chosen");
        } else {
          this.resultArr[
            this.resultArr.indexOf(currentIndex)
          ].chosenFields.push(step);
          event.target.classList.toggle("chosen");
        }
      } else {
        event.target.classList.toggle("chosen");
        this.resultArr.push({ index, chosenFields: [step] });
      }
    },
    isChosen(step, index) {
      debugger;
      return;
    },
    getResult() {
      return this.resultArr.map((result) => result.chosenFields).flat();
    },
    handleButtonclick() {
      // console.log(this.price);
      // @ts-ignore
      this.createCheckoutSession(this.value).then((data) => {
        this.stripe = Stripe(data.publicKey);

        // Call Stripe.js method to redirect to the new Checkout page
        this.stripe
          .redirectToCheckout({
            sessionId: data.sessionId,
          })
          .then(this.handleResult);
      });
    },
    createCheckoutSession(price) {
      return axios
        .post(
          "http://localhost:3000/v1/payment/getCheckout",
          {
            amount: price,
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
.start-btn {
  background-color: var(--body-color);
  color: var(--primary-dark-color);
  border: none;
  padding: 10px 35px;
  border-radius: 5px;
  margin-top: 20px;
}

.step-wrapper {
  margin-top: 20px;
}
.step-container {
  margin-top: 20px;
  position: relative;

  h3 {
    margin-bottom: 5px;
  }

  &__wrapper {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  &__action {
    background-color: var(--body-color);
    padding: 20px;
    height: 200px;
    width: 200px;
    border-radius: 20px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: var(--primary-dark-color);
  }
  .chosen {
    background-color: black;
  }
}
.result-container {
  background-color: var(--body-color);
  color: var(--primary-dark-color);
  padding: 20px;
  border-radius: 20px;
  text-align: center;

  h5 {
    margin: 0 auto;
    margin-bottom: 20px;
    max-width: 450px;
  }

  &__field,
  &__field-total {
    display: flex;
    justify-content: space-between;
  }

  &__field-total {
    border-top: 1px solid var(--primary-dark-color);
    padding-top: 10px;
  }

  &__button-container {
    :first-child {
      margin-right: 20px;
    }

    button {
      border: none;
      padding: 15px 25px;
      border-radius: 5px;
      color: var(--body-color);
    }

    &__back {
      background-color: red;
    }
    &__accept {
      background-color: green;
    }
  }
}
</style>
