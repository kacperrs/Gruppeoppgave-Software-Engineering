<template>
  <div class="parkingspot">
    <p class="title">Finn parkering</p>
    <div class="container">
      <div class="notification is-info is-light">
        <div class="columns is-vcentered">
          <div class="column is-narrow">
            <p class="content is-medium">
              🔍 Vis i område:
            </p>
          </div>
          <div class="column is-narrow">
            <div class="select">
              <select v-model="filter">
                <option value="all" selected>
                  Vis alle
                </option>
                <option v-for="code in zipcodes" v-bind:key="code">
                  {{ code }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <table class="table is-striped is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Addresse</th>
            <th>Poststed</th>
            <th>Timespris</th>
            <th>Døgnpris</th>
            <th>Videre</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="spot in parkingspots" v-bind:key="spot[0]">
            <td>{{ spot[1].address }}</td>
            <td>{{ spot[1].zipcode }}</td>
            <td>{{ spot[1].hour_price }}</td>
            <td>{{ spot[1].day_price }}</td>
            <td class="is-centered">
              <router-link
                class="button is-primary is-small"
                :to="{
                  name: 'BookParkingspot',
                  params: { id: spot[0] }
                }"
                ><strong>&rarr;</strong>
              </router-link>
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
  name: "FindParkingspot",
  data: () => {
    return {
      filter: "all",
      parkingspots: [],
      zipcodes: []
    };
  },
  created() {
    this.getAllSpots();
  },
  methods: {
    getAllSpots() {
      axios.get(`http://localhost:5000/spots/`).then((response) => {
        this.parkingspots = Object.entries(response.data);
        this.zipcodes = [
          ...new Set(this.parkingspots.map((spot) => spot[1].zipcode))
        ];
      });
    },
    getSpotsZipcode(zipcode) {
      axios
        .get(`http://localhost:5000/spots/location/${zipcode}`)
        .then((response) => {
          this.parkingspots = response.data;
        });
    }
  },
  computed: {
    token() {
      return this.$store.getters.token;
    }
  },
  watch: {
    filter: function() {
      this.filter == "all"
        ? this.getAllSpots()
        : this.getSpotsZipcode(this.filter);
    }
  }
};
</script>

<style></style>
