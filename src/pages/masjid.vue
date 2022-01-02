<template>
  <Layout>
    <div class="build-container">
      <h1>Doner en Masjid</h1>
      <buildForm :buildSteps="buildSteps" intend="Masjid"></buildForm>
    </div>
  </Layout>
</template>

<script>
import buildForm from "@/components/buildForm.vue";
export default {
  name: "Masjid",
  components: { buildForm },
  data: () => ({
    buildSteps: [
      {
        title: "Masjid størrelse",
        type: "Single",
        actions: [
          {
            title: "200 mennesker",
            value: 97000,
            priceId: "price_1KCTtoE1OcUYppSvt9xMfQHT",
          },
          {
            title: "300 mennesker",
            value: 130000,
            priceId: "price_1KChdQE1OcUYppSvKgik6WDE",
          },
        ],
      },
      {
        title: "Ekstra indenfor",
        actions: [
          {
            title: "Minbar",
            value: 2000,
            priceId: "price_1KChdeE1OcUYppSvOmry8oAe",
          },
          {
            title: "Luksus gulvtæppe i plastik:",
            value: 13000,
            priceId: "price_1KChe8E1OcUYppSvlWPmu636",
          },
          {
            title: "Højtaler, mikrofon, inde og ude",
            value: 10000,
            priceId: "price_1KCheaE1OcUYppSvTlBz4ic1",
          },
        ],
      },
      {
        title: "Ekstra Udenfor",
        actions: [
          {
            title: "Asfalteret forplads",
            value: 6500,
            priceId: "price_1KChfAE1OcUYppSvbaSBSD1U",
          },
          {
            title: "4 toiletter",
            value: 13000,
            priceId: "price_1KChfUE1OcUYppSvcmcxQfxT",
          },
          {
            title: "Solcelle-anlæg med lys",
            value: 13000,
            priceId: "price_1KChN8E1OcUYppSvSJkYCqEQ",
          },
          {
            title: "Brønd med pumpe, vandtank, og 6 wudhu-vandhaner",
            value: 20000,
            priceId: "price_1KCherE1OcUYppSv4cXQo9Qe",
          },
        ],
      },
      {
        title: "Ekstra",
        actions: [
          {
            title: "Imam / underviser løn i et år",
            value: 9700,
            priceId: "price_1KChndE1OcUYppSvxz1Vgt1e",
          },
          {
            title: "slagte ko og ris til indvielse af Masjid",
            value: 4000,
            priceId: "price_1KChQwE1OcUYppSvyTKudD8w",
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
