<template>
  <Layout>
    <div class="build-container">
      <h1>Doner en Masjid</h1>
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
        title: "Masjid størrelse",
        type: "Single",
        actions: [
          { title: "200 mennesker", value: 97000 },
          { title: "300 mennesker", value: 130000 },
        ],
      },
      {
        title: "Ekstra indenfor",
        type: "Multi",
        actions: [
          { title: "Minbar", value: 2000 },
          { title: "Luksus gulvtæppe i plastik:", value: 13000 },
          { title: "Højtaler, mikrofon, inde og ude", value: 10000 },
          {
            title: "Brønd med pumpe, vandtank, og 6 wudhu-vandhaner",
            value: 20000,
          },
        ],
      },
      {
        title: "Ekstra Udenfor",
        type: "Multi",
        actions: [
          { title: "Asfalteret forplads", value: 6500 },
          { title: "4 toiletter", value: 13000 },
          { title: "Solcelle-anlæg med lys", value: 13000 },
          {
            title: "Brønd med pumpe, vandtank, og 6 wudhu-vandhaner",
            value: 20000,
          },
        ],
      },
      {
        title: "Ekstra",
        type: "Multi",
        actions: [
          { title: "Imam / underviser løn i et år", value: 9700 },
          { title: "slagte ko og ris til indvielse af Masjid", value: 4000 },
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
