<template>
  <a @click="goToDonationPage()" class="action-button">{{ buttonText }}</a>
</template>

<script>
export default {
  props: {
    donationValue: Number,
    paymentType: String,
    buttonText: { type: String, default: "Doner" },
  },
  methods: {
    goToDonationPage: function () {
      this.$store.dispatch("updatePaymentValueState", this.donationValue);
      this.$store.dispatch("updatePaymentTypeState", this.paymentType);
      this.$router.push("/payment");
    },
  },
};
</script>

<style lang="scss">
.action-button {
  border: 1px solid var(--body-color);
  padding: 5px 15px;
  border-radius: 10px;
  color: var(--body-color);

  &:hover {
    cursor: pointer;
    background-color: var(--body-color);
    color: var(--bg-color);
  }
}
</style>
