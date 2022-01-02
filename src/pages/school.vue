<template>
  <Layout>
    <div class="build-container">
      <h1>Doner en Skole</h1>
      <buildForm :buildSteps="buildSteps" intend="Skole"></buildForm>
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
        title: "Skole størrelse",
        type: "Single",
        actions: [
          {
            title: "7 klasseværelser (175 elever)",
            value: 110000,
            priceId: "price_1KChJjE1OcUYppSvrGmgoNla",
          },
          {
            title: "5 klasseværelser (175 elever)",
            value: 90000,
            priceId: "price_1KChJvE1OcUYppSvDhDhwYmV",
          },
        ],
      },
      {
        title: "Udstyr",
        actions: [
          {
            title: "Stole og borde",
            value: 6500,
            priceId: "price_1KChL0E1OcUYppSvdwufTjdW",
          },
          {
            title: "1 toilet:",
            value: 3250,
            priceId: "price_1KChLFE1OcUYppSvYtwump0W",
          },
          {
            title: "Solcelle-anlæg med lys",
            value: 13000,
            priceId: "price_1KChN8E1OcUYppSvSJkYCqEQ",
          },
        ],
      },
      {
        title: "Ekstra",
        actions: [
          {
            title: "Skole artikler",
            value: 9700,
            priceId: "price_1KChPfE1OcUYppSvpdHUd91l",
          },
          {
            title: "Frokost til alle elever i 1 år",
            value: 1200,
            priceId: "price_1KChPvE1OcUYppSvZsnQTL9y",
          },
          {
            title: "løn for 6 lære",
            value: 46800,
            priceId: "price_1KChQFE1OcUYppSvunwWn0ex",
          },
          {
            title: "slagte ko og ris til indvielse af Skole",
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
