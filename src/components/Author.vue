<template>
  <div class="author">
    <h1 v-if="showTitle" class="author__site-title">{{ $static.metadata.siteName }}</h1>

    <p
      class="author__intro"
    >Med få klik kan du være med til at donere mad, tøj, legetøj, rent drikkevand, medicin og meget mere.</p>

    <p class="author__links">
      <g-link to="/payment/">Doner</g-link>
      <g-link to="/jaria/">Jaria</g-link>
    </p>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
export default {
  props: ["showTitle"],
};
</script>

<style lang="scss" scoped>
.author {
  background-image: linear-gradient(
      0deg,
      rgba(255, 0, 150, 0.3),
      rgba(255, 0, 150, 0.3)
    ),
    url("../../static/images/hero.jpg");
  background-size: 120%;
  background-position-x: -130px;
  background-repeat: no-repeat;
  padding: 200px 0px 200px 100px;
  border-radius: 10px;

  &__image {
    border-radius: 100%;
    width: 90px;
    height: 90px;
    margin-bottom: 1em;
  }

  &__site-title {
    font-size: 4.5rem;
    color: white;
  }

  &__intro {
    font-size: 1.5rem;
    color: #000;
    max-width: 700px;
    font-weight: 600;
  }

  &__links {
    margin-top: -0.5em;
    a {
      margin: 0 0.5em;
      color: #fff;
      border: 1px solid #fff;
      padding: 10px 25px;
      border-radius: 10px;
      transition: background-color 150ms, color 150ms;
      text-decoration: none;

      &:hover {
        background-color: #fff;
        color: #fff;
        color: rgb(114, 4, 124);
      }
    }
  }
}
</style>
