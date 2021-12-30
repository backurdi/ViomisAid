<template>
  <Layout>
    <div class="build-container">
      <h1>Doner en brønd</h1>
      <buildForm :buildSteps="buildSteps" intend="Brønd"></buildForm>
    </div>
  </Layout>
</template>

<script>
import buildForm from "@/components/buildForm.vue";
export default {
  name: "Well",
  components: { buildForm },
  data: () => ({
    buildSteps: [
      {
        title: "Type brønd",
        type: "Single",
        actions: [
          {
            title: "Hånd pumpe",
            value: 15000,
            priceId: "price_1KCTyEE1OcUYppSvi6WV4VT1",
          },
          {
            title: "Motor pumpe",
            value: 20000,
            priceId: "price_1KCTyVE1OcUYppSvWR0kh1jB",
          },
        ],
      },
      {
        title: "Ekstra",
        actions: [
          {
            title: "Tank + Vandhane station",
            value: 5000,
            priceId: "price_1KCTyrE1OcUYppSvFTrXzpMJ",
          },
        ],
      },
    ],
  }),
};
</script>

<style lang="scss">
.build-container {
  width: 80%;
  margin: 0 auto;
  text-align: center;
}
</style>
