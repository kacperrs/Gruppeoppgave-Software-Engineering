<template>
  <div class="container"></div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("logout").then(() => {
      this.$router.go({ name: "Home" });
    });
  }
};
</script>
