<template>
  <div class="spotstable mt-5">
    <div
      class="notification is-danger is-light mt-5"
      v-if="Object.keys(spots).length === 0"
    >
      Du leier ikke ut noen plasser ...
    </div>
    <div class="container">
      <table class="table" v-if="Object.keys(spots).length !== 0">
        <thead>
          <tr>
            <th>Addresse</th>
            <th>Poststed</th>
            <th>Timespris</th>
            <th>Døgnpris</th>
            <th>Rediger</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="spot in spots" :key="spot[0]">
            <td>{{ spot[1].address }}</td>
            <td>{{ spot[1].zipcode }}</td>
            <td>{{ spot[1].hour_price }}</td>
            <td>{{ spot[1].day_price }}</td>
            <td>
              <button
                v-on:click="speak('Rediger plassen')"
                class="button is-small mr-1"
              >
                ✏️
              </button>
              <button
                v-on:click="speak('Fjern plassen')"
                class="button is-small"
              >
                ❌
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SpotsTable",
  data() {
    return {
      spots: {}
    };
  },
  created() {
    this.getUserSpots();
  },
  methods: {
    getUserSpots() {
      axios
        .get(`http://localhost:5000/users/spots/${this.token}`)
        .then((response) => {
          this.spots = response.data;
        });
    },
    speak: (message) => {
      alert(message);
    }
  },
  computed: {
    token() {
      return this.$store.getters.token;
    }
  }
};
</script>

<style scoped></style>
