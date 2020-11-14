<template>
  <div id="bookparkingspot" class="container">
    <p class="title">{{ spotData.address }}</p>
    <p class="subtitle">{{ spotData.zipcode }}</p>
    <div class="notification is-primary">
      <v-date-picker
        v-model="date"
        :min-date="new Date()"
        :disabled-dates="[{ weekdays: [1, 7] }, new Date(2020, 10, 17)]"
        :v-model="date"
        is-range
        is-expanded
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "BookParkingSpot",
  data() {
    return {
      spotid: this.$route.params.id,
      spotData: {},
      date: []
    };
  },
  created() {
    this.getSpotData();
  },
  methods: {
    getSpotData() {
      axios
        .get(`http://localhost:5000/spots/${this.$route.params.id}`)
        .then((response) => {
          this.spotData = response.data;
        });
    }
  }
};
</script>

<style></style>
