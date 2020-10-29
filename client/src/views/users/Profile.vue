<template>
  <div class="mypage"></div>
</template>

<script>
import axios from "axios";
export default {
  name: "MyPage",
  data() {
    return {};
  },
  created() {
    this.getUserData();
  },
  methods: {
    getUserData() {
      axios
        .get(`http://localhost:5000/users/${this.token}`)
        .then((response) => {
          console.log(response.data);
        });
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
