<template>
  <div class="spotstable">
      <div class="notification is-danger is-light mt-5">
        <p>Du har <strong>{{ spots.length }}</strong> steder, med til sammen <strong>{{ totalSpots }}</strong> plasser til leie.</p>
        <p>Totalt leieinntekter denne måneden: <strong>X</strong>.</p>
        <router-link to="/" class="button is-danger">
          Se detaljert oversikt
        </router-link>
      </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "MySpotStatus",
  data() {
    return {
      spots: {},
      totalSpots: 0
    };
  },
  created() {
    this.getUserSpots()
  },
  methods: {
    getUserSpots() {
      axios
        .get(`http://localhost:5000/users/spots/${this.token}`)
        .then((response) => {
          console.log(response.data);

          this.spots = response.data;
          response.data.forEach(item => this.totalSpots += parseInt(item[1].spots));
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
