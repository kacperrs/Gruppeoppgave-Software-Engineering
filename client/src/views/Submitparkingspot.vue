<template>
<div class= "Submitparkingspot"> 

	<div class="description">
      Submit a parking spot for rent!
    </div>

    <form id="submitform">
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
  

	

<br>

        <label for="street">Street: </label>
    <input type="text" id="street" name="Street"> <br>
     <label for="streetnumber">Street number: </label>
    <input type="text" id ="streetnumber" name ="streetnumber"> <br>
    <label for="rentablefrom">Rentable from: </label>
    <input type="date" id = "rentablefrom" name ="rentablefrom"> <br>
    <label for="rentableto">Rentable to: </label>
    <input type="date" id = "rentableto" name = "rentableto"> <br>
    <label for="price">Price: </label>
    <input type="number" id = "price" name = "price"> <br>

</form>

 <button v-on:click="submit">Submit parking spot</button>

	</div>
</template>

<script>
export default {
  methods: {
    submit: function() {
      alert('Parking spot submitted!')
    }
  }
}
</script>

<style scoped>




</style>