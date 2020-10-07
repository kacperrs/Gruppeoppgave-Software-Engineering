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
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      loginFail: false,
      loggedIn: this.$store.getters.loggedIn
    };
  },
  methods: {
    async login() {
      this.$store
        .dispatch("retriveToken", {
          username: this.username,
          password: this.password
        })
        .then((response) => {
          if (response) {
            this.$router.push({ name: "Secret" });
            // this.$router.replace({ name: "Secret" });
          } else this.loginFail = true;
        });
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
