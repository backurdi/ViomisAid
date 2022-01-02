<template>
  <div>
    <button class="start-btn" v-if="!buildStarted" @click="buildStarted = true">
      Start
    </button>
    <div v-else class="step-wrapper">
      <h3 v-if="sliderIndex < localBuildSteps.length">
        {{ localBuildSteps[sliderIndex].title }}
      </h3>
      <div class="navigation-btn" v-if="sliderIndex < localBuildSteps.length">
        <button
          class="prev"
          @click="sliderIndex--"
          :disabled="sliderIndex === 0"
        >
          Prev
        </button>
        <button class="next" @click="incrementSlider">Next</button>
      </div>
      <Slider
        v-if="sliderIndex < localBuildSteps.length"
        :autoplay="false"
        :control-btn="false"
        :height="`${
          localBuildSteps[sliderIndex]
            ? Math.ceil(localBuildSteps[sliderIndex].actions.length / 4) !== 1
              ? 273 * Math.ceil(localBuildSteps[sliderIndex].actions.length / 4)
              : 300
            : 300
        }px`"
        v-model="sliderIndex"
      >
        <div
          class="step-container"
          v-for="(buildStep, index) in localBuildSteps"
          :key="index"
        >
          <SliderItem>
            <div class="step-container__wrapper">
              <div
                v-for="(step, index) in buildStep.actions"
                :key="index"
                @click="chooseBox(step, sliderIndex, buildStep.type)"
                class="step-container__action"
                :class="{ chosen: step.chosen }"
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
          <template v-for="(result, index) in resultPageList">
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
            <p>{{ totalValue }}</p>
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
  props: ["buildSteps", "intend"],
  data() {
    return {
      buildStarted: false,
      totalValue: 0,
      sliderIndex: 0,
      resultPageList: [],
      resultArr: [],
      localBuildSteps: [],
    };
  },
  created() {
    this.localBuildSteps = this.buildSteps;
  },
  methods: {
    incrementSlider() {
      this.sliderIndex++;
      if (this.sliderIndex + 1 > this.localBuildSteps.length) {
        this.getResult();
      }
    },
    chooseBox(step, index, type) {
      const currentIndex = this.resultArr.find(
        (result) => result.index === index
      );
      const currentStep = this.resultArr[
        this.resultArr.indexOf(currentIndex)
      ]?.chosenFields.find((field) => field.title === step.title);
      if (currentIndex) {
        if (
          currentStep ||
          (type === "Single" && currentIndex.chosenFields.length)
        ) {
          if (!type) {
            const index = currentIndex.chosenFields.indexOf(currentStep);
            if (index > -1) {
              currentIndex.chosenFields.splice(index, 1);
            }
          }
          currentIndex.chosenFields[
            currentStep ? currentIndex.chosenFields.indexOf(currentStep) : 0
          ] = step;
          this.setChosenBox(index, step, type);
        } else {
          this.resultArr[
            this.resultArr.indexOf(currentIndex)
          ].chosenFields.push(step);
          this.setChosenBox(index, step, type);
        }
      } else {
        this.resultArr.push({ index, chosenFields: [step] });
        this.setChosenBox(index, step, type);
      }
    },
    setChosenBox(index, step, indexType) {
      const action = this.localBuildSteps[index].actions.find(
        (action) => action.title === step.title
      );
      const otherChosen = this.localBuildSteps[index].actions.find(
        (action) => action.chosen
      );
      if (indexType === "Single" && otherChosen) {
        otherChosen.chosen = false;
      }
      if (action.chosen) {
        this.localBuildSteps[index].actions.splice(
          this.localBuildSteps[index].actions.indexOf(action),
          1,
          { ...action, chosen: false }
        );
      } else {
        this.localBuildSteps[index].actions.splice(
          this.localBuildSteps[index].actions.indexOf(action),
          1,
          { ...action, chosen: true }
        );
      }
    },
    getResult() {
      const resultArr = this.resultArr.map((result) => {
        return result.chosenFields.flat(2);
      });
      if (this.totalValue > 0) this.totalValue = 0;
      resultArr.flat().forEach((result) => {
        this.totalValue += result.value;
      });
      this.resultPageList = resultArr.flat();
    },
    handleButtonclick() {
      this.createCheckoutSession(this.totalValue).then((data) => {
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
      const lineItems = this.createLineItems();
      return axios
        .post(
          "http://localhost:3000/v1/payment/getCheckout",
          { lineItems, intend: this.intend },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then(this.handleFetchResult);
    },
    createLineItems() {
      return this.resultArr
        .map((result) =>
          result.chosenFields.map((chosenField) => ({
            price: chosenField.priceId,
            quantity: 1,
          }))
        )
        .flat();
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
  cursor: pointer;
}

.step-wrapper {
  margin-top: 20px;

  .navigation-btn {
    button {
      border: none;
      border-radius: 5px;
      padding: 10px 20px;
      background-color: var(--body-color);
      margin: 20px 0;
      cursor: pointer;
    }

    .prev {
      margin-right: 10px;
    }
  }
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
    cursor: pointer;
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
    border: 3px solid var(--primary-color);
    font-weight: 600;
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
      cursor: pointer;
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
