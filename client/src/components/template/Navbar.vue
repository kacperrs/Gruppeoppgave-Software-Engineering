<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="container is-max-desktop">
      <div class="navbar-brand">
        <a class="navbar-item logo-font" href="/">
          <strong>Share-A-Spot</strong>
        </a>
      </div>

      <div class="navbar-end">
        <router-link to="/register" class="navbar-item" v-if="!loggedIn">
          Registrer deg
        </router-link>

        <router-link to="/login" class="navbar-item" v-if="!loggedIn">
          Logg inn
        </router-link>

        <router-link to="/parkingspot" class="navbar-item" v-if="loggedIn"
          >Finn parkering</router-link
        >

        <div class="navbar-item has-dropdown is-hoverable" v-if="loggedIn">
          <a class="navbar-link">
            Mine sider
          </a>

          <div class="navbar-dropdown is-boxed">
            <router-link to="/profile" class="navbar-item">
              Oversikt
            </router-link>

            <router-link to="/myspots" class="navbar-item">
              Mine parkeringsplasser
            </router-link>

            <router-link to="/profile" class="navbar-item">
              Historikk
            </router-link>

            <router-link to="/profile" class="navbar-item">
              Rediger profil
            </router-link>

            <hr class="navbar-divider" />
            <router-link to="/logout" class="navbar-item">
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
