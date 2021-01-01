<template>
  <div class="payment">
    <h1 class="page-title">Mange tak for jeres støtte</h1>
    <form class="payment-form"
          name="payment-form"
          method="post"
          @submit.prevent="handleSubmit"
          action="/success/"
          data-netlify="true"
          data-netlify-honeypot="bot-field">
  <p>
    <label>Name <input type="text" name="name" /></label>
  </p>
  <p>
    <label>Email <input type="email" name="email" /></label>
  </p>
  <p>
    <button type="submit">Send</button>
  </p>
</form>
    <div class="payment-container">
      <div class="payment-form-wrapper">
        <div v-if="!value" class="value-step">
          <div class="product-select-container">
            <b :class="{active: !checked}">en-gang</b>
            <label class="switch">
              <input type="checkbox" v-model="checked"/>
              <span class="slider round"></span>
            </label>
            <b :class="{active: checked}">subscription</b>
          </div>
          <div class="input-value-container">
          <div class="placeholder" :data-placeholder="!checked ? 'DKK' : 'DKK/mdr'">
          <input type="text" v-model="inputValue" />
          </div>
          <button @click="value = inputValue" :disabled="inputValue < 1">
            Betal
          </button>
          </div>
        </div>
        <div v-if="value" class="payment-step">
          <button @click="value = 0">Tilbage</button>
          <payment v-if="!checked"/>
          <subscriptionPayment v-if="checked"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import subscriptionPayment from "../components/subscripitonPaymentForm";
import payment from "../components/paymentForm";
import axios from "axios";
export default {
  components: {
    subscriptionPayment,
    payment,
  },
  data: function () {
    return {
      value: 0,
      inputValue: 0,
      checked: false,
    };
  },
  methods: {},
  mounted: function () {
    this.inputValue = this.$store.state.donationValue;
    this.checked = this.$store.state.paymentType;
  },
  methods: {
    paymentStatusChange:function (e){
      console.log(e.target);
    }
  },
};
</script>

<style lang="scss">
.payment {
  margin-top: 40px;
  background-image: linear-gradient(
      45deg,
      rgba(78, 195, 205, 0.4),
      rgba(78, 195, 205, 0.4),
      rgba(255, 0, 150, 0.3)
    ),
    url("../../static/images/payment-background.jpg");
  background-size: cover;
  margin: 0;
  height: 100vh;
}
.value-step {
  .product-select-container {
    display: flex;

    b {
      color: #000;
      margin-top: -7px;
    }

    .active{
      color: #4ec3cd;
      border-bottom: 1px solid #4ec3cd;
    }
  }

  .input-value-container{
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    input{
      margin-bottom: 20px;
      padding: 10px 10px;
    border: 1px solid #e4e1e1;
    border-radius: 5px;
    width: 258px;
    font-weight: 500;
    font-size: 20px;
    }

    button{
      background: none;
      border: 1px solid #4ec3cd;
      padding: 10px 35px;
      border-radius: 5px;
      color: #000;
    }
  }

  .placeholder {
    position: relative;
    display: inline-block;
}

.placeholder::after {
    position: absolute;
    right: 10px;
    top: 7px;
    content: attr(data-placeholder);
    pointer-events: none;
    opacity: 0.6;
    color: #000;
}
}

.payment-step{

}
.payment-container {
  display: flex;
  justify-content: flex-end;
}
.payment-form-wrapper {
  margin-right: 100px;
  padding: 50px;
  display: flex;
  background-color: #fff;
  border-radius: 5px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 35px;
  height: 20px;
  margin: 0 20px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 15px;
  width: 15px;
  left: 2px;
  bottom: 3px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

// input:checked + .slider {
//   background-color: #4ec3cd;
// }

input:focus + .slider {
  box-shadow: 0 0 1px #4ec3cd;
}

input:checked + .slider:before {
  -webkit-transform: translateX(15px);
  -ms-transform: translateX(15px);
  transform: translateX(15px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 15px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
