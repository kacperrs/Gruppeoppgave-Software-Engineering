<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="container is-max-desktop">
      <div class="navbar-brand">
        <a class="navbar-item logo-font" href="/">
          <strong>Share-A-Spot</strong>
        </a>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link
              to="/register"
              class="button is-primary"
              v-if="!loggedIn"
            >
              Registrer deg
            </router-link>
            <router-link to="/login" class="button is-light" v-if="!loggedIn">
              Logg inn
            </router-link>
            <router-link to="/logout" class="button is-light" v-if="loggedIn">
              Logg ut
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    }
  }
};
</script>

<style scoped>
.logo-font {
  font-family: "Bebas Neue", cursive;
  font-size: 2rem;
  letter-spacing: 0.2rem;
}
</style>
