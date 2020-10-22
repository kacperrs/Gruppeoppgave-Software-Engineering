

<template>
  <div class="parkingspot">

    <div class="class-use">
      Find parkingspot in Halden!
    </div>
  <div class="is-justify-content-center data-list-input lister">
    <select class="form-control" v-model="selected">
      <option> Kornsjø</option>
      <option> Brødløs</option>
      <option>Tistedalen </option>
      <option>Sentrum</option>
      <option> Busterud </option>
      <option> Berg </option>
      <option>Festningen</option>
      <option>Isebakken</option>
      <option>Remmen</option>
      <option> Prestebakken</option>
    </select>

  </div>
  <div v-if="selected == 'Kornsjø'">
    <div class="is-justify-content annonse1">
    <h1> Parkeringsplass på Fjellåsveien 3</h1>
    <p> Villa Kornsjø leier ut parkeringsplasser til 5 mennesker</p>
    <a href="#">Trykk her for å komme inn på siden</a>
    </div>
  </div>
  </div>
</template>

<script>

export default {
  name: "Parkingspot.vue",
  el: '#lister',
  data(){
    return {
    selected : 'Kornsjø'
  }
  }

};


</script>

<style scoped>
.data-list-input{
  height: 100%;
  margin-left: 100px;
  margin-top: 10px;
}

</style>