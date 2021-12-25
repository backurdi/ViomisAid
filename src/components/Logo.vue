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
  background-color: var(--primary-dark-color);
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  margin-top: -60px;
}
</style>
