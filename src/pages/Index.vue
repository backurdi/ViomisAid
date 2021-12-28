<template>
  <Layout :show-logo="true">
    <Hero :show-title="true" />
    <maps />
  </Layout>
</template>

<page-query>
query {
  posts: allPost(filter: { published: { eq: true }}) {
    edges {
      node {
        id
        title
        date (format: "D. MMMM YYYY")
        timeToRead
        description
        cover_image (width: 770, height: 380, blur: 10)
        ...on Post {
        id
        title
        path
        }
        path
        tags {
          id
          title
          path
        }
      }
    }
  }
}
</page-query>

<script>
import Hero from "~/components/Hero.vue";
import DonationFor from "~/components/donationFor.vue";
import HowToHelp from "~/components/howToHelp.vue";
import PostCard from "~/components/PostCard.vue";
import Maps from "~/components/maps.vue";

export default {
  components: {
    Hero,
    PostCard,
    DonationFor,
    HowToHelp,
    Maps,
  },
  metaInfo: {
    title: "Home",
  },
};
</script>

<style lang="scss" scoped>
.posts {
  display: flex;
  flex-wrap: wrap;

  .post-card {
    flex: 1 0;
    width: 20%;
    max-height: 400px;
    overflow: hidden;

    &:not(:last-child) {
      margin-right: 20px;
    }
  }
}
</style>
