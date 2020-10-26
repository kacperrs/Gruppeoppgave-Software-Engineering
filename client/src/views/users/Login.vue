<template>
  <div class="login-form">
    <form action="#" @submit.prevent="login" v-if="!loggedIn">
      <p class="title">Logg inn</p>
      <div class="field">
        <p class="control has-icons-left">
          <input
            v-model="username"
            class="input is-medium"
            name="username"
            type="text"
            placeholder="Epost"
            required
          />
          <span class="icon is-small is-left"> 📧 </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <input
            v-model="password"
            class="input is-medium"
            name="password"
            type="password"
            placeholder="Passord"
            required
          />
          <span class="icon is-small is-left"> 🔒 </span>
        </p>
      </div>
      <div class="field">
        <p class="control">
          <button
            type="submit"
            class="button is-success is-medium is-fullwidth"
          >
            Login
          </button>
        </p>
      </div>
      <div v-if="loginFail" class="notification is-danger">
        Feil brukernavn eller passord!
      </div>
    </form>
    <div class="notification is-link is-light mt-5" v-if="usersInDb">
      <p>Siden dette er en demo - så kan du logge inn med disse:</p>
      <p v-for="(user, i) in usersInDb" :key="i">
        {{ user.email }} - {{ user.password }}
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      loginFail: false,
      usersInDb: []
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    async login() {
      this.$store
        .dispatch("retriveToken", {
          email: this.username,
          password: this.password
        })
        .then(() => {
          if (this.loggedIn) this.$router.push({ name: "Secret" });
          else this.loginFail = true;
        });
    },
    getUsers() {
      axios.get(`http://localhost:5000/users/`).then((response) => {
        this.usersInDb = Object.values(response.data);
      });
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    }
  }
};
</script>

<style scoped>
.login-form {
  max-width: 50%;
  margin: 0 auto;
}
</style>
