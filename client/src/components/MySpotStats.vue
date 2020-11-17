<template>
  <div class="spotstable">
    <div class="notification is-danger is-light mt-5">
      <p>
        Du har <strong>{{ spots.length }}</strong> plass(er)
      </p>
      <p>
        Totalt leieinntekter: <strong>{{ earnigns }}</strong
        >.
      </p>
      <p
        class="button is-danger"
        @click="speak('Til oversiktsside med grafer osv.')"
      >
        Se detaljert oversikt
      </p>
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
      earnigns: 0
    };
  },
  created() {
    this.getUserSpots();
    this.getTotalEarnings();
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
    getTotalEarnings() {
      axios
        .get(`http://localhost:5000/users/earnings/${this.token}`)
        .then((response) => {
          console.log("Earnings", response.data);

          this.earnigns = response.data.sum;
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
