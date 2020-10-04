<template>
  <div id="app">
    <header class="header">
      <div class="header__left">
        <Logo v-if="showLogo" />
      </div>

      <div class="header__right">
        <ToggleTheme />
        <g-link to="/">Home</g-link>
        <g-link to="/jaria/">Jaria</g-link>
        <g-link to="/about/">About us</g-link>
        <a href="#" class="action-button">Doner</a>
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

<script>
import Logo from "~/components/Logo.vue";
import ToggleTheme from "~/components/ToggleTheme.vue";

export default {
  props: {
    showLogo: { default: true },
  },
  components: {
    Logo,
    ToggleTheme,
  },
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
    .action-button {
      border: 1px solid var(--body-color);
      padding: 5px 15px;
      border-radius: 10px;

      &:hover {
        background-color: var(--body-color);
        color: var(--bg-color);
      }
    }

    & > *:not(:last-child) {
      margin-right: 20px;
    }
  }

  &__left,
  &__right {
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
