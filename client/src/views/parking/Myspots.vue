<template>
  <div class="myspots">
    <p class="title">Dine parkeringsplasser</p>
    <div>
      <p v-if="Object.keys(spots).length === 0">
        Du leier ikke ut noen plasser ...
      </p>

      <SpotsTable />

      <button
        v-on:click="speak('Lag annonse plassen : kacper')"
        class="button is-primary mt-5"
      >
        Legg til parkeringsplass
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SpotsTable from "@/components/SpotsTable.vue";

export default {
  name: "MySpots",
  components: {
    SpotsTable
  },
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
