<template>
  <div class="how-to-help-wrapper">
    <h2 class="title">Du kan hjælpe ved at</h2>
    <div class="content-container">
      <div class="how-to-help">
        <div class="how-to-help__item" v-for="(howToHelp, index) of howToHelpList" :key="index">
          <div class="how-to-help__item__text">
            <h2 class="how-to-help__item__text__title">{{ howToHelp.title }}</h2>
            <p class="how-to-help__item__text__paragaph">{{ howToHelp.text }}</p>
            <div class="cta">
              <g-link
                class="cta__button"
                v-for="(cta, index) of howToHelp.cta"
                :key="index"
                :to="cta.link"
                :class="{cta__button__icon: cta.icon}"
              >
                <span v-if="!cta.icon">{{cta.text}}</span>
                <span v-if="cta.icon">
                  <svg>
                    <use :xlink:href="cta.icon" />
                  </svg>
                </span>
              </g-link>
            </div>
          </div>
          <div class="how-to-help__item__image">
            <div
              class="how-to-help__item__image__main"
              :style="{ backgroundImage: `linear-gradient(120deg, rgba(102, 25, 172, 0.5), rgba(78, 195, 205, 0.5)), url(${getImgPath(howToHelp.imgName)})` }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const sprite = require("@/assets/sprite.svg");
export default {
  data: () => {
    return {
      howToHelpList: [
        {
          title: "Doner",
          imgName: "doner.jpg",
          text:
            "Vi har altid flere projekter i gang. Donationer i alle størelser og former kan hjælpe en i nød. Behovet for nødhjælp er konstant, så tag del ved at donere for at fremme vores projektor verden over.",
          cta: [{ text: "Doner", link: "/about" }],
        },
        {
          title: "Bliv en del af holdet!",
          imgName: "bliv_medlem.jpg",
          text:
            "Viomis Aid har mange forskellige opgaver og roller. Du kan hjælpe med at gøre Viomis Aid større, ved at melde dig ind som frivillig.",
          cta: [{ text: "Bliv medlem", link: "/Form" }],
        },
        {
          title: "Skab Opmærksomhed",
          imgName: "del.jpg",
          text:
            "At donere penge er ikke den eneste måde du kan hjælpe på. Del vores arbejde med dem du kender, så de også kan få muligheden for at støtte op om vores arbejde.",
          cta: [
            {
              text: "Facebook",
              link: "facebook.com",
              icon: `${sprite}#icon-facebook`,
            },
            {
              text: "Instagram",
              link: "instagram.com",
              icon: `${sprite}#icon-instagram`,
            },
          ],
        },
      ],
    };
  },
  methods: {
    getImgPath: function (pic) {
      return require("../assets/images/" + pic);
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  margin-bottom: 80px;
}

.content-container {
  padding: 0 100px;
  .how-to-help {
    display: flex;
    flex-direction: column;

    &__item {
      display: flex;
      justify-content: space-between;
      height: 400px;

      &__image {
        &__main {
          width: 300px;
          height: 75%;
          border-radius: 50%;
          margin-left: 100px;
          background-size: cover;
        }
      }
    }

    & > :nth-child(2) {
      flex-direction: row-reverse;

      .how-to-help__item__image__main {
        margin-left: 0;
        margin-right: 100px;
      }
    }
  }

  .cta {
    display: flex;

    &__button {
      text-decoration: none;
      color: white;
      border: 1px solid white;
      padding: 8px 16px;
      margin-right: 15px;
      border-radius: 5px;
      transition: background-color 0.5s, color 0.5s;

      &__icon {
        width: 60px;
        height: 60px;
        padding: 10px;

        svg {
          width: 100%;
          height: 100%;
          fill: white;
          transition: fill 0.5s;
        }
      }

      &:hover {
        background-color: var(--body-color);
        color: var(--bg-color);

        svg {
          fill: var(--bg-color);
        }
      }
    }
  }
}
</style>
