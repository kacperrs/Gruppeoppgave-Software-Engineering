<template>
  <div class="parkingspot">
    <div class="class-use">
      Find parkingspot in Halden!
    </div>
    <div class="is-justify-content-center data-list-input lister">
      <select class="form-control" v-model="selected">
        <option
          v-for="option in options"
          v-bind:key="option.id"
          v-bind:title="option.title"
        >
          {{ option.title }}</option
        >
        <!--
      <option>Kornsjø</option>
       <option> Brødløs</option>
      <option>Tistedalen </option>
      <option>Sentrum</option>
      <option> Busterud </option>
      <option> Berg </option>
      <option>Festningen</option>
      <option>Isebakken</option>
      <option>Remmen</option>
      <option> Prestebakken</option> -->
      </select>
    </div>
    <div>
      <div v-if="selected == 'Kornsjø'">
        Test
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Parkingspot",
  data: () => {
    return {
      options: [
        { id: 1, title: "Kornsjø" },
        { id: 2, title: "Brødløs" },
        { id: 3, title: "Tistedalen" },
        { id: 4, title: "Sentrum" },
        { id: 5, title: "Busterud" },
        { id: 6, title: "Berg" },
        { id: 7, title: "Festningen" },
        { id: 8, title: "Isebakken" },
        { id: 9, title: "Remmen" },
        { id: 10, title: "Prestebakken" }
      ],
      selected: ""
    };
  }
};
</script>

<style scoped>
.data-list-input {
  height: 100%;
  margin-left: 100px;
  margin-top: 10px;
}
</style>
