<template>
  <Layout :show-logo="true">
    <!-- Author intro -->
    <Author :show-title="true" />
    <DonationFor />
    <HowToHelp />

    <!-- List posts -->
    <h2>Vores projekter</h2>
    <div class="posts">
      <PostCard v-for="edge in $page.posts.edges" :key="edge.node.id" :post="edge.node" />
    </div>

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
import Author from "~/components/Author.vue";
import DonationFor from "~/components/donationFor.vue";
import HowToHelp from "~/components/howToHelp.vue";
import PostCard from "~/components/PostCard.vue";
import Maps from "~/components/maps.vue";

export default {
  components: {
    Author,
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
