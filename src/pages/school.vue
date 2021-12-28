<template>
  <Layout>
    <div class="build-container">
      <h1>Doner en Skole</h1>
      <buildForm :buildSteps="buildSteps"></buildForm>
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
          { title: "7 klasseværelser (175 elever)", value: 110000 },
          { title: "5 klasseværelser (175 elever)", value: 90000 },
        ],
      },
      {
        title: "Udstyr",
        type: "Multi",
        actions: [
          { title: "Stole og borde", value: 6500 },
          { title: "1 toilet:", value: 3250 },
          { title: "Solcelle-anlæg med lys", value: 13000 },
        ],
      },
      {
        title: "Ekstra",
        type: "Multi",
        actions: [
          { title: "Skole artikler", value: 9700 },
          { title: "Frokost til alle elever i 1 år", value: 1200 },
          { title: "løn for 6 lære", value: 46800 },
          { title: "slagte ko og ris til indvielse af Skole", value: 4000 },
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
