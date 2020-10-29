<template>
  <div class="myspots">
    <p class="title">Dine parkeringsplasser</p>
    <div>
      <p v-if="Object.keys(spots).length === 0">
        Du leier ikke ut noen plasser ...
      </p>

      <table class="table">
        <thead>
          <tr>
            <th>Addresse</th>
            <th>Poststed</th>
            <th>Timespris</th>
            <th>Døgnpris</th>
            <th>Antall plasser</th>
            <th>Rediger</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="spot in spots" :key="spot[0]">
            <td>{{ spot[1].address }}</td>
            <td>{{ spot[1].zipcode }}</td>
            <td>{{ spot[1].hour_price }}</td>
            <td>{{ spot[1].day_price }}</td>
            <td>{{ spot[1].spots }}</td>
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

      <button class="button is-primary">
        Legg til parkeringsplass
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "MyPage",
  data() {
    return {
      page: {
        editProfile: false
      },
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
          console.log(response.data);

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
