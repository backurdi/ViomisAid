<template>
  <Layout>
    <h1 class="page-title">Gør en vedvarende forskel</h1>
    <div class="jaria-container">
      <jariaProject
        v-for="(jariaProjectData, i) of jariaProjectsData"
        :key="i"
        :jariaData="jariaProjectData.node"
        :index="i + 1"
      />
      <customJaria />
    </div>
  </Layout>
</template>

<static-query>
query subscription_projects {
	Container: allSubscriptionProjects(sortBy: "date") {
    edges {
      node {
        jaria_image
        title
        description
        price
      }
    }}}
</static-query>

<script>
import jariaProject from "../components/jariaProject";
import customJaria from "../components/customJaria";
import axios from "axios";

export default {
  components: {
    jariaProject,
    customJaria,
  },

  data: function () {
    return {
      jariaProjectsData: {},
    };
  },

  mounted: function () {
    this.jariaProjectsData = this.$static.Container.edges;
  },

  methods: {},
};
</script>

<style lang="scss">
.page-title {
  margin: 20px 0;
}
.jaria-container {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
}
</style>
