<template>
  <div class="mypage">
    <p class="title">Hei {{ user.firstname }} {{ user.lastname }}! 👋</p>
    <div class="profile">
      <div class="notification is-info is-light mt-5">
        <p class="subtitle">Din profil</p>
        Du er registrert med navnet
        <span class="has-text-weight-bold"
          >{{ user.firstname }} {{ user.lastname }}</span
        >, ønsker du å gjøre endringer i din profil, trkk på knappen.
        <router-link to="/editprofile" class="button is-info is-fullwidth mt-5">
          Rediger profil
        </router-link>
      </div>
    </div>

    <!-- Tidligere leieforhold -->
    <div class="notification is-warning is-light mt-5">
      <p class="subtitle">Tidligere leieforhold</p>
      <button class="button is-warning is-fullwidth">
        Finn en parkeringsplass
      </button>
    </div>

    <!-- Brukerens plasser -->
    <div class="container mt-5">
      <p class="subtitle has-text-danger">Dine parkeringsplasser</p>
      <SpotsTable />
      <button
        v-on:click="speak('Lag annonse plassen : kacper')"
        class="button is-danger is-fullwidth mt-5"
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
  name: "Profile",
  components: {
    SpotsTable
  },
  data() {
    return {
      page: {
        editProfile: false
      },
      user: {}
    };
  },
  created() {
    this.getUserData();
  },
  methods: {
    getUserData() {
      axios
        .get(`http://localhost:5000/users/${this.token}`)
        .then((response) => {
          const userdata = response.data;
          console.log(userdata);

          this.user = response.data;
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
