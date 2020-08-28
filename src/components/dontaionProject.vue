<template>
  <div class="donation-project-wrapper">
    <div class="donation-project">
      <img src="../../static/images/hero.jpg" alt />
      <div class="info-box">
        <h3>Title</h3>
        <p>Some text</p>
        <button>Some button</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.donation-project-wrapper {
  display: flex;
  justify-content: center;

  .donation-project {
    display: flex;
    width: 800px;
    background-color: #fff;

    img {
      width: 60%;
      clip-path: polygon(0 0, 100% 0%, 75% 100%, 0% 100%);
    }

    .info-box {
      width: 50%;
    }
  }
}
</style>