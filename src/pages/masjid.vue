<template>
  <Layout>
      <div class="hero">
          <h1 class="page-title">Masjid</h1>
      </div>
      <div class="well-content">
          <div class="well-text">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
          </div>
          <div class="choose-type">
              <button class="without-punp" @click="value=values.withoutPump">Uden Pumpe</button>
              <button class="with-pump" @click="value=values.withPump">Med Pumpe</button>
              <button class="bangladesh-pump" @click="value=values.bangladesh">Vand pumpe Bangladesh</button>
          </div>
          <h1 class="donation-amount">{{value}} DKK</h1>
          <DonerButton :donationValue="value"/>
      </div>
  </Layout>
</template>

<script>
import DonerButton from "../components/primitives/donerButton";
export default {
    components:{DonerButton},
    data:function(){
        return{
            value: 20000,
            values: {withoutPump: 15000, withPump: 20000, bangladesh: 5600}
        }
    }

}
</script>

<style lang="scss"> 

    .hero{
        margin-top: 40px;
  background-image: linear-gradient(
      45deg,
      rgba(78, 195, 205, 0.4),
      rgba(78, 195, 205, 0.4),
      rgba(255, 0, 150, 0.3)
    ),
    url("../../static/images/payment-background.jpg");
  background-size: cover;
  padding: 150px 0;
  margin: 0 0 50px 0;
    }

    .well-content{
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;

        .well-text{
            margin-bottom: 40px;
        }

        .choose-type{
            width: 40%;
            display: flex;
            justify-content: space-between;
            margin-bottom: 50px;

        }
        .donation-amount{
            margin-bottom: 20px;
        }
        button{
            background: none;
            border: 1px solid var(--body-color);
            color: var(--body-color);
            padding: 10px 20px;
            border-radius: 5px;
            transition: all 150ms;

            &:hover{
                background: var(--body-color);
                color: var(--bg-color);
                cursor: pointer;
            }

            &:focus{
                outline: none;
            }
        }
    }

</style>