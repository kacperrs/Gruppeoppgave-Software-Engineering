

<template>
  <div class="parkingspot">

    <div class="class-use">
      Find parkingspot in Halden!
    </div>
  <div class="is-justify-content-center data-list-input">
    <select class="data-list-input" style="position: absolute; width: 200px " onchange="document.getElementById('displayValue').value=this.options[this.selectedIndex].text;
    document.getElementById('idValue').value=this.options[this.selectedIndex].value;" v-model="places">
      <option></option>
      <option value="Tistedalen">Tistedalen</option>
      <option value="Brødløs"> Brødløs </option>
      <option value="Sentrum">Sentrum</option>
      <option value="Busterud"> Busterud </option>
      <option value="Berg">Berg</option>
      <option value="Festningen"> Festingen</option>
      <option value="Kornsjø"> Kornsjø </option>
      <option value="Isebakke"> Isebakke </option>
      <option value="Remmen"> Remmen </option>
      <option value="Prestebakke"> Prestebakke</option>
    </select>

  </div>

  </div>
</template>

<script lang="ts">

export default {
  name: "Parkingspot.vue"


};

</script>

<style scoped>
.data-list-input{
  height: 100%;
  margin-left: 100px;
  margin-top: 10px;
}

</style>