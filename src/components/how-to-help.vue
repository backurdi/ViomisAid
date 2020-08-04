<template>
  <div class="how-to-help">
    <h2>Du kan hjælpe ved at</h2>
    <div class="how-to-help-item" v-for="(howToHelp, index) of howToHelpList" :key="index">
      <h2>{{howToHelp.title}}</h2>
      <p>{{howToHelp.text}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      howToHelpList: [
        {
          title: "Doner",
          text:
            "Vi har altid flere projekter i gang. Donationer i alle størelser og former kan hjælpe en i nød. Behovet for nødhjælp er konstant, så tag del ved at donere for at fremme vores projektor verden over.",
        },
        {
          title: "Bliv en del af holdet!",
          text:
            "Viomis Aid har mange forskellige opgaver og roller. Du kan hjælpe med at gøre Viomis Aid større, ved at melde dig ind som frivillig.",
        },
        {
          title: "Skab Opmærksomhed",
          text:
            "At donere penge er ikke den eneste måde du kan hjælpe på. Del vores arbejde med dem du kender, så de også kan få muligheden for at støtte op om vores arbejde.",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
</style>