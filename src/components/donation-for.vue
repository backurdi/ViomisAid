<template>
  <div class="donation-for">
    <h2>Dine donationer går til</h2>
    <div class="goes-to-item-container">
      <div class="goes-to-item" v-for="(doantionGoesTo, index) of donationGoesToList" :key="index">
        <svg>
          <use :xlink:href="doantionGoesTo.icon" />
        </svg>
        <h3>{{doantionGoesTo.title}}</h3>
        <p>{{doantionGoesTo.text}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      donationGoesToList: [
        {
          icon: "/assets/img/sprite.svg#icon-gym",
          title: "At Redde Liv",
          text:
            "Førsteprioritet er dem, som har mest brug for det. Det sker ved at redde liv med ambulancer, klinikker og mere.",
        },
        {
          icon: "/assets/img/sprite.svg#icon-droplet",
          title: "Rent Drikkevand",
          text:
            "someBørn skal ikke gå flere kilometer i en ulidelig varme, for at få adgang til rent drikkevand. Vi kan bygge brønde.hing",
        },
        {
          icon: "/assets/img/sprite.svg#icon-home",
          title: "Husly",
          text:
            "Mange dør af kulde om vinteren. Vi har både sendt tøj i tonsvis, bygget hjem og installeret varmeapparater.",
        },
        {
          icon: "/assets/img/sprite.svg#icon-restaurant",
          title: "Mad",
          text:
            "Når man er flygtning og bor i et telt, eller under et træ, har man også brug for mad. Vi uddeler madkurve.",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.donation-for {
  text-align: center;
  padding: 50px 0;
}

.goes-to-item-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  .goes-to-item {
    width: 25%;
    flex: 1 0;

    svg {
      width: 45px;
      height: 45px;
      fill: white;
    }

    h3 {
      margin-top: 20px;
    }
  }

  .goes-to-item:not(:last-child) {
    margin-right: 60px;
  }
}
</style>