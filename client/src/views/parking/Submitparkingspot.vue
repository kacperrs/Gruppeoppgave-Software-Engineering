<template>
  <div class="register-form">
    <form action="#" @submit.prevent="submit" v-if="!registrationSuccess">
      <p class="title">Legg inn parkeringsplass</p>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Adresse</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <input
                class="input"
                type="text"
                placeholder="Storgata 11"
                v-model="form.address"
                required
              />
            </p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Stedsnavn</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <input
                class="input"
                type="text"
                placeholder="Oslo"
                v-model="form.zipcode"
                required
              />
            </p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Pris per time</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <input
                class="input"
                type="number"
                placeholder="100"
                v-model="form.hour_price"
                required
              />
            </p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Pris per dag</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <input
                class="input"
                type="number"
                placeholder="600"
                v-model="form.day_price"
                required
              />
            </p>
          </div>
        </div>
      </div>

      <!-- <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Antall parkeringsplasser</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <input
                class="input"
                type="number"
                placeholder="5"
                v-model="form.spots"
                required
              />
            </p>
          </div>
        </div>
    </div> -->

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label"></label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <button class="button is-success is-medium is-fullwidth mt-5">
                Legg inn parkeringsplass
              </button>
            </p>
          </div>
        </div>
      </div>
    </form>

    <div class="notification is-success" v-show="registrationSuccess">
      <p class="title">👏 Takk!</p>
      <p>
        Parkeringsplassen er nå lagt inn!
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        ownerId: "",
        address: "",
        zipcode: "",
        hour_price: "",
        day_price: "",
        spots: "",
        isFirm: false
      },
      registrationSuccess: false
    };
  },
  methods: {
    async submit() {
      this.form.ownerId = this.token;
      await axios
        .post("http://localhost:5000/spots/", this.form, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then((response) => {
          if (response.status === 201) {
            this.registrationSuccess = true;
            console.log("data har blitt sendt inn");
          }
          if (response.status === 500) {
            console.log("Det har oppstått en feil!");
          }
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

<style scoped>
.register-form {
  max-width: 80%;
  margin: 0 auto;
}
</style>
