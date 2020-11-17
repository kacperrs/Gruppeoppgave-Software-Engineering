<template>
  <div class="myBookingTable">
    <div
      class="notification is-danger is-light mt-5"
      v-if="bookings.length === 0"
    >
      Ingen tidligere leieforhold ...
    </div>

    <table
      class="table is-striped is-hoverable is-fullwidth"
      v-if="bookings.length !== 0"
    >
      <thead>
        <tr>
          <th>Addresse</th>
          <th>Poststed</th>
          <th>Fra</th>
          <th>Til</th>
          <th>Pris</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="booking in bookings" :key="booking[0]">
          <td>{{ booking[1].spot.address }}</td>
          <td>{{ booking[1].spot.zipcode }}</td>
          <td>{{ booking[1].date.start }}</td>
          <td>{{ booking[1].date.end }}</td>
          <td>{{ booking[1].cost }}</td>
          <td>
            <span
              class="button is-success is-small"
              v-if="
                new Date(booking[1].date.end).getTime() > new Date().getTime()
              "
              >Aktiv</span
            >
            <span
              class="button is-danger is-small"
              v-if="
                new Date(booking[1].date.end).getTime() < new Date().getTime()
              "
              >Utgått</span
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
  name: "MyBookings",
  data() {
    return {
      bookings: {}
    };
  },
  created() {
    this.getUserSpots();
  },
  methods: {
    getUserSpots() {
      axios
        .get(`http://localhost:5000/users/bookings/${this.token}`)
        .then((response) => {
          console.log("HERE", response.data);

          this.bookings = response.data;
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
