<template>
  <a @click="goToDonationPage()" class="action-button">{{ buttonText }}</a>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  props: {
    donationValue: Number,
    paymentType: String,
    buttonText: { type: String, default: "Doner" },
  },
  computed: {
    ...mapState(["causes"]),
  },
  methods: {
    ...mapMutations(["setChosenCharity"]),
    goToDonationPage: function () {
      const donation = this.causes.find(
        (cause) => cause.title === "Valgfri donation"
      );
      this.setChosenCharity({
        price: this.donationValue,
        type: this.paymentType,
        title: donation.title,
        priceId: donation.priceId,
      });
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
