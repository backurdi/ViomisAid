<template>
  <div class="author">
    <div class="author__top-content">
      <div class="author__top-content__text">
      <h1 class="author__top-content__text__site-title">Vær med til at gøre en forskel</h1>
      <p class="author__top-content__text__intro">Støt dine brødre og søstre som ikke har  så meget</p>
      <p class="author__links">
        <g-link to="/payment/">Doner</g-link>
      </p>
      </div>
      <img class="author__top-content__image"  src="../../static/images/hero-children.png"/>
    </div>
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
  border-radius: 10px;

  &__top-content{
    padding: 20px 100px;
    display: flex;
    justify-content: space-between;

    &__image {
      width: 400px;
  //     margin-right: 20px;
  //     background-image: 
  //     url("../../static/images/hero-boy.png");
  //   background-size: cover;
  //   background-repeat: no-repeat;
  //     // border-radius: 50%;
  //     width: 40%;
  //     // margin-bottom: 1em;
    }
  
  //   &__image:after {
  //   content: "";
  //   display: block;
  //   padding-bottom: 100%;
  // }

  &__text{
    height: fit-content;
    align-self: center;

    &__site-title {
      max-width: 900px;
      font-size: 90px;
      font-weight: 800;
      color: #000;
    }
  
    &__intro {
      font-size: 1.5rem;
      color: #000;
      max-width: 700px;
      font-weight: 600;
    }
  }
  }

  &__bottom-content{

    .help-words{
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      .word{
        margin-right: 2px;
        font-size: 1.2rem;
        background-color: rgb(33, 100, 223);
        padding: 8px 20px;
        border-radius: 10px;
        margin-bottom: 2px;
        color: white;
        font-weight: 600;
      }

      // .blue{
      //   background-color: rgb(33, 100, 223);
      // }
      // .red{
      //   background-color: rgb(223, 33, 33);
      // }
      // .yellow{
      //   background-color: rgb(220, 223, 33);
      // }
      // .purple{
      //   background-color: rgb(147, 33, 223);
      // }
      // .orange{
      //   background-color: rgb(223, 141, 33);
      // }
      // .green{
      //   background-color: rgb(33, 223, 65);
      // }
      // .turkuis{
      //   background-color: rgb(33, 185, 223);
      // }
      // .pink{
      //   background-color: rgb(223, 33, 198);
      // }
      // .white{
      //   background-color: white;
      //   border:1px solid black;
      //   color: black;
      // }

    }
  }


  &__links {
    margin-top: -0.5em;
    a {
      margin: 0 0.5em;
      color: #fff;
      border: 1px solid #fff;
      background-color: #BF861A;
      font-weight: 600;
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
