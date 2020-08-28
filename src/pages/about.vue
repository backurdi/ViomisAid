<template>
  <Layout :show-logo="true">
    <!-- <paymentForm /> -->
    <subPaymentForm />
  </Layout>
</template>

<script>
import paymentForm from "../components/paymentForm";
import subPaymentForm from "../components/subscripitonPaymentForm";
export default {
  components: {
    paymentForm,
    subPaymentForm,
  },
};
</script>

<style></style>
