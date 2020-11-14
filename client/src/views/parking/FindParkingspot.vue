<template>
  <div class="parkingspot">
    <div class="class-use">
      <h1>Finn parkeringsplasser</h1>
    </div>
    <div class="container">
      <h4>Søk etter stedsnavn her:</h4>
      <select
        class="form-control"
        v-model="selected"
        @change="onChange($event)"
      >
        <option v-for="option in parkingspot" v-bind:key="option.ownerID">
          {{ option[1].zipcode }}
        </option>
      </select>

      <table class="table" v-if="Object.keys(spots).length === 0">
        <thead>
          <tr>
            <th>Addresse</th>
            <th>Poststed</th>
            <th>Timespris</th>
            <th>Døgnpris</th>
            <th>Antall plasser</th>
            <th>Link til side</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="option in parkingspot" v-bind:key="option.ownerID">
            <td>{{ option[1].address }}</td>
            <td>{{ option[1].zipcode }}</td>
            <td>{{ option[1].hour_price }}</td>
            <td>{{ option[1].day_price }}</td>
            <td>{{ option[1].spots }}</td>
            <td>
              <router-link
                :to="{
                  name: 'BookParkingspot',
                  params: { id: option[0] }
                }"
                >Sjekk tilgjengelighet</router-link
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <table class="table" v-if="Object.keys(spots).length !== 0">
      <thead>
        <tr>
          <th>Addresse</th>
          <th>Poststed</th>
          <th>Timespris</th>
          <th>Døgnpris</th>
          <th>Antall plasser</th>
          <th>Link til side</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="spot in spots" v-bind:key="spot[0]">
          <td>{{ spot[1].address }}</td>
          <td>{{ spot[1].zipcode }}</td>
          <td>{{ spot[1].hour_price }}</td>
          <td>{{ spot[1].day_price }}</td>
          <td>{{ spot[1].spots }}</td>
          <td>
            <router-link
              :to="{
                name: 'BookParkingspot',
                params: { id: spot[0] }
              }"
              >Sjekk tilgjengelighet</router-link
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "FindParkingspot",
  data: () => {
    return {
      selected: "",
      parkingspot: [],
      spots: {}
    };
  },
  created() {
    this.getSpot();
    this.getSpotsZipcode();
  },
  methods: {
    getSpot() {
      axios.get(`http://localhost:5000/spots/`).then((response) => {
        this.parkingspot = Object.entries(response.data);
      });
    },
    getSpotsZipcode(zipcode) {
      axios
        .get(`http://localhost:5000/spots/location/${zipcode}`)
        .then((response) => {
          console.log(response.data);
          this.spots = response.data;
        });
    },
    onChange(event) {
      this.getSpotsZipcode(event.target.value);
      this.selected = event.target.value;
      console.log(event.target.value);
    }
  },
  computed: {
    token() {
      return this.$store.getters.token;
    }
  }
};
</script>

<style scoped>
.data-list-input {
  height: 100%;
  margin-left: 100px;
  margin-top: 10px;
}
</style>
