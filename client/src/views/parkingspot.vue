<template>
  <div class="parkingspot">
    <div class="class-use">
      Find parkingspot in Halden!
    </div>
    <div class="is-justify-content-center data-list-input lister">
      <select class="form-control" v-model="selected"  >
        <option
            v-for="(option) in parkingspot" v-bind:key="option.ownerID"
        >

          {{ option.zipcode }} </option>

      </select>
    </div>
    <div>
      <div v-for="(user) in parkingspot" v-bind:key="user.ownerID">
        <div v-if="selected == user.zipcode">

          <p>A lovely parkingsspot in {{user.address}}.
          Hour price : {{user.hour_price}}
          Day price: {{user.day_price}} </p>
          <p>

          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Parkingspot",
  data: () => {
    return {
      selected: "",
      parkingspot: []

    };
  },
  created(){
    this.getSpot()
  },
  methods: {
    getSpot() {
      axios.get(`http://localhost:5000/spots/`).then((response) => {
        this.parkingspot = Object.values(response.data);
      });
    }
  },
};
</script>

<style scoped>
.data-list-input {
  height: 100%;
  margin-left: 100px;
  margin-top: 10px;
}
</style>