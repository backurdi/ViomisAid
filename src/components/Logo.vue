<template>
  <g-link class="logo" to="/">
    <img src="../../static/images/logo.png" alt="Viomis aid logo" />
  </g-link>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style lang="scss">
.logo {
  width: 100px;
  text-decoration: none;
  color: var(--body-color) !important;
  font-size: 0.9em;
}
</style>
