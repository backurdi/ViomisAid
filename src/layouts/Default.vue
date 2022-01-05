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
        <div class="dropdown-container">
          <div class="dropdown">
            <p class="dropbtn">Byg</p>
            <div class="dropdown-content">
              <g-link to="/wells/">Brønde</g-link>
              <g-link to="/school/">Skole</g-link>
              <g-link to="/masjid/">Moske</g-link>
            </div>
          </div>
          <ChevronDownIcon class="arrow"></ChevronDownIcon>
        </div>
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
import { ChevronDownIcon } from "@vue-hero-icons/solid";
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
    ChevronDownIcon,
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

.dropdown-container {
  display: flex;
  justify-content: center;
  cursor: default;
}

.arrow {
  margin-top: 5px;
}

/* Dropdown Button */
.dropbtn {
  background-color: transparent;
  margin: 0;
  color: white;
  font-size: 20px;
  border: none;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {
  background-color: var(--primary-color);
  color: var(--body-color);
}

/* Show the dropdown menu on hover */
.dropdown-container:hover .dropdown-content {
  display: block;
}
</style>
