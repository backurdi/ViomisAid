<template>
  <Layout>
    <h1 class="page-title">Gør en vedvarende forskel</h1>
    <div class="jaria-container">
      <jariaProject
        v-for="(jariaProjectData, i) of causes"
        :key="i"
        :jariaData="jariaProjectData"
        :index="i + 1"
      />
      <customJaria />
    </div>
  </Layout>
</template>

<script>
import jariaProject from "../components/jariaProject";
import customJaria from "../components/customJaria";
import { mapState } from "vuex";

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
  computed: {
    ...mapState(["causes"]),
  },
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
