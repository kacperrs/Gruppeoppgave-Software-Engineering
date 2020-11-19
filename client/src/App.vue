<template>
  <div id="app">
    <Navbar />
    <main>
      <div class="content container is-max-desktop">
        <router-view />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/template/Navbar.vue";
import Footer from "@/components/template/Footer.vue";

export default {
  components: {
    Navbar,
    Footer
  }
};
</script>

<style>
main {
  margin: 2rem 0 2rem 0;
  min-height: calc(100vh - (232px + 4rem));
}
</style>
