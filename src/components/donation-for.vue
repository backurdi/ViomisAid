<template>
  <div class="donation-for">
    <h2>Dine donationer går til</h2>
    <div class="goes-to-item-container">
      <div class="goes-to-item" v-for="(doantionGoesTo, index) of donationGoesToList" :key="index">
        <h3>{{doantionGoesTo.title}}</h3>
        <p>{{doantionGoesTo.text}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      donationGoesToList: [
        { icon: "something", title: "something", text: "something" },
        { icon: "something", title: "something", text: "something" },
        { icon: "something", title: "something", text: "something" },
        { icon: "something", title: "something", text: "something" },
      ],
    };
  },
};
</script>

<style lang="scss">
.donation-for {
  text-align: center;
  padding: 50px 0;
}

.goes-to-item-container {
  display: flex;
  justify-content: center;

  .goes-to-item:not(:last-child) {
    margin-right: 60px;
  }
}
</style>