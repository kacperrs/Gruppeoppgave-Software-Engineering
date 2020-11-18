<template>
  <div class="mypage">
    <p class="title">Hei {{ user.firstname }} {{ user.lastname }}! 👋</p>
    <div class="profile">
      <div class="notification is-info is-light mt-5">
        <p class="subtitle">Din profil</p>
        Du er registrert med navnet
        <span class="has-text-weight-bold"
          >{{ user.firstname }} {{ user.lastname }}</span
        >, ønsker du å gjøre endringer i din profil, trykk på knappen.
        <router-link to="/editprofile" class="button is-info is-fullwidth mt-5">
          Rediger profil
        </router-link>
      </div>
    </div>

    <!-- Tidligere leieforhold -->
    <div class="container mt-5">
      <p class="notification subtitle is-warning">
        Tidligere leieforhold
      </p>
      <MyBookings />
      <router-link
        to="/findparkingspot"
        class="button is-primary is-fullwidth mt-5 is-outlined"
      >
        Finn en parkeringsplass
      </router-link>
    </div>

    <!-- Brukerens plasser -->
    <div class="container mt-5">
      <p class="notification subtitle is-danger">
        Dine parkeringsplasser
      </p>
      <!-- Fjerne sportstable og vise denne under detalj visning?s -->
      <MySpotStats />
      <SpotsTable />

      <router-link
        to="/Submitparkingspot"
        class="button is-danger is-fullwidth mt-5 is-outlined"
      >
        Legg til parkeringsplass
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SpotsTable from "@/components/SpotsTable.vue";
import MySpotStats from "@/components/MySpotStats.vue";
import MyBookings from "@/components/MyBookings.vue";

export default {
  name: "Profile",
  components: {
    SpotsTable,
    MySpotStats,
    MyBookings
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
