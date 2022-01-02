<template>
  <div id="app">
    <nav class="nav">
      <div class="nav__left">
        <Logo v-if="showLogo" />
      </div>

      <div class="nav__right">
        <!-- <ToggleTheme /> -->
        <g-link to="/">Home</g-link>
        <g-link to="/jaria/">Jaria</g-link>
        <g-link to="/wells/">Brønde</g-link>
        <g-link to="/school/">Skole</g-link>
        <g-link to="/masjid/">Moske</g-link>
        <g-link to="/about/">Om os</g-link>
        <DonerButton :donationValue="100" class="doner" />
        <DonerButton :donationValue="100" class="zakat" buttonText="Zakat" />
      </div>
    </nav>

    <main class="main">
      <slot />
    </main>

    <footer class="footer">
      <span class="footer__copyright"
        >Copyright © {{ new Date().getFullYear() }}.</span
      >
      <span class="footer__links"> Powered by Unity dev </span>
    </footer>
  </div>
</template>

<static-query>
query subscription_projects {
	Causes: allSubscriptionProjects(sortBy: "date") {
    edges {
      node {
        jaria_image
        title
        description
        price
        price_id
      }
    }}}
  </static-query>

<script>
import { mapState } from "vuex";
import Logo from "~/components/Logo.vue";
import DonerButton from "../components/primitives/donerButton";

export default {
  props: {
    showLogo: { default: true },
  },
  components: {
    Logo,
    // ToggleTheme,
    DonerButton,
  },
  data: function () {
    return {
      campaigns: [],
    };
  },
  mounted() {
    this.campaigns = this.$static.Causes.edges.map((cause) => cause.node);
    if (!this.causes.length) {
      this.$store.commit("setCauses", this.campaigns);
    }
  },
  computed: {
    ...mapState(["causes"]),
  },
};
</script>

<style lang="scss">
.page-title {
  text-align: center;
  font-size: 38px;
  margin-bottom: 100px;
}
.nav {
  background-color: var(--primary-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: var(--header-height);
  padding: 0 calc(var(--space) / 2);
  top: 0;
  z-index: 10;
  height: 80px;
  margin-top: 60px;

  &__right {
    a {
      color: var(--body-color);
      text-decoration: none;
    }

    & > *:not(:last-child) {
      margin-right: 20px;
    }

    .doner {
      background-color: var(--primary-dark-color);
    }
    .zakat {
      background-color: var(--secondary-color);
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
}

.footer {
  color: var(--primary-dark-color);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: calc(var(--space) / 2);
  text-align: center;
  font-size: 0.8em;

  > span {
    margin: 0 0.35em;
  }
}
</style>
