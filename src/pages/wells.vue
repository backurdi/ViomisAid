<template>
  <Layout>
    <div class="build-container">
      <h1>Doner en brønd</h1>
      <div>
        <div v-if="!buildStarted" @click="buildStarted = true">Start</div>
        <div v-else class="step-wrapper">
          <h3 v-if="sliderIndex < buildSteps.length">
            {{ buildSteps[sliderIndex].title }}
          </h3>
          <Slider
            v-if="sliderIndex < buildSteps.length"
            :autoplay="false"
            :control-btn="false"
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
                    @click="chooseBox(step)"
                    class="step-container__action"
                  >
                    <h4>{{ step.title }}</h4>
                    <h5>{{ step.value }}</h5>
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
              <template v-for="(result, index) in resultArr">
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
    </div>
  </Layout>
</template>

<script>
import { Slider, SliderItem } from "vue-easy-slider";
import axios from "axios";
export default {
  components: {
    Slider,
    SliderItem,
  },
  data: function () {
    return {
      buildStarted: false,
      value: 0,
      sliderIndex: 0,
      resultArr: [],
      buildSteps: [
        {
          title: "Type brønd",
          actions: [
            { title: "Hånd pumpe", value: 15000 },
            { title: "Motor pumpe", value: 20000 },
          ],
        },
        {
          title: "Ekstra",
          actions: [
            { title: "Tank + Vandhane station", value: 5000 },
            { title: "Intet", value: 0 },
          ],
        },
      ],
    };
  },
  methods: {
    chooseBox(step) {
      if (this.sliderIndex + 1 < this.buildSteps.length + 1) {
        if (
          !this.resultArr.find((result) => result.step === this.sliderIndex)
        ) {
          this.resultArr.push({
            step: this.sliderIndex,
            title: step.title,
            value: step.value,
          });
        } else {
          this.resultArr[
            this.resultArr.indexOf(
              this.resultArr.find((result) => result.step === this.sliderIndex)
            )
          ].value = step.value;

          this.resultArr[
            this.resultArr.indexOf(
              this.resultArr.find((result) => result.step === this.sliderIndex)
            )
          ].title = step.title;
        }
      }
      this.value = 0;
      this.resultArr.forEach((result) => (this.value += result.value));
      this.sliderIndex++;
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
.build-container {
  width: 80%;
  margin: 0 auto;
  text-align: center;
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
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
  }

  &__action {
    background-color: var(--body-color);
    padding: 20px;
    height: 200px;
    width: 200px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
