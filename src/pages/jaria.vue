<template>
  <Layout>
    <h1 class="page-title">Gør en vedvarende forskel</h1>
    <jariaProject
      v-for="(jariaProjectData, i) of jariaProjectsData"
      :key="i"
      :jariaData="jariaProjectData.node"
      :index="i + 1"
    />
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
      }
    }}}
</static-query>

<script>
import jariaProject from "../components/jariaProject";
import axios from "axios";

export default {
  components: {
    jariaProject,
  },

  data: function() {
    return {
      jariaProjectsData: {},
    };
  },

  mounted: function() {
    this.jariaProjectsData = this.$static.Container.edges;
  },

  methods: {},
};
</script>

<style lang="scss"></style>
