<template>
  <div id="bookparkingspot" class="container">
    <p class="title">Bestille plass {{ spotid }}</p>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  name: "BookParkingSpot",
  data() {
    return {
      spotid: this.$route.params.id
    };
  }
};
</script>

<style></style>
