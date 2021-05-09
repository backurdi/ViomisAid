<template>
  <div id="app">
    <header class="header">
      <div class="header__left">
        <Logo v-if="showLogo" />
      </div>

      <div class="header__right">
        <!-- <ToggleTheme /> -->
        <g-link to="/">Home</g-link>
        <g-link to="/jaria/">Jaria</g-link>
        <g-link to="/wells/">Brønde</g-link>
        <g-link to="/masjid/">Moske</g-link>
        <!-- <g-link :to="`/campaign/[${campaign.node.title}].vue`" v-for="(campaign, index) of campaigns" :key="index">{{campaign.node.title}}</g-link> -->
        <g-link to="/about/">Om os</g-link>
        <DonerButton :donationValue="100" />
      </div>
    </header>

    <main class="main">
      <slot />
    </main>

    <footer class="footer">
      <span class="footer__copyright"
        >Copyright © {{ new Date().getFullYear() }}.</span
      >
      <span class="footer__links">
        Powered by
        <a href="//www.suits.at">SUITS</a>
      </span>
    </footer>
  </div>
</template>

<static-query>
query subscription_projects {
	Container: allCampaign(sortBy: "date") {
    edges {
      node {
        title,
        description,
        defaultPrice,
        camaignImage
      }
    }}}
  </static-query>

<script>
import Logo from "~/components/Logo.vue";
// import ToggleTheme from "~/components/ToggleTheme.vue";
import DonerButton from "../components/primitives/donerButton"

export default {
  props: {
    showLogo: { default: true },
  },
  components: {
    Logo,
    // ToggleTheme,
    DonerButton
  },
  data:function(){
    return{
      campaigns:[]
    }
  },
  mounted:function(){
    this.campaigns = this.$static.Container.edges;
  }
};
</script>

<style lang="scss">
.page-title {
  text-align: center;
  font-size: 38px;
  margin-bottom: 100px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: var(--header-height);
  padding: 0 calc(var(--space) / 2);
  top: 0;
  z-index: 10;
  background-color: var(--bg-color);

  &__right {
    a {
      color: var(--body-color);
      text-decoration: none;
    }

    & > *:not(:last-child) {
      margin-right: 20px;
    }
  }

  &__left,
  &__right {
    margin-top: 10px;
    display: flex;
    align-items: center;
  }

  @media screen and (min-width: 1300px) {
    //Make header sticky for large screens
    position: sticky;
    width: 100%;
  }
}

.main {
  margin: 0 auto;
  padding: 0 calc(var(--space) / 2);
}

.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: calc(var(--space) / 2);
  text-align: center;
  font-size: 0.8em;

  > span {
    margin: 0 0.35em;
  }

  a {
    color: currentColor;
  }
}
</style>
