<template>
  <Layout>
    <h1 class="page-title">Gør en vedvarende forskel</h1>
    <jariaProject
      v-for="(jariaProjectData, i) of jariaProjectsData"
      :key="i"
      :jariaData="jariaProjectData.node"
      :index="i + 1"
    />
    <customJaria />
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

<style lang="scss"></style>
