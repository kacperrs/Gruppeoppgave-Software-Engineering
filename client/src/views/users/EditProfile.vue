<template>
  <div class="profile">
    <p class="title">Rediger profil</p>
    <form action="#" @submit.prevent="updateProfile" v-show="!updateSuccess">
      <!-- For og Etternavn -->
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Navn</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control is-expanded">
              <input
                class="input"
                type="text"
                placeholder="Fornavn"
                v-model="user.firstname"
                required
              />
            </p>
          </div>
          <div class="field">
            <p class="control is-expanded">
              <input
                class="input"
                type="text"
                placeholder="Etternavn"
                v-model="user.lastname"
                required
              />
            </p>
          </div>
        </div>
      </div>
      <!-- Epost -->
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Epost</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <input
                class="input"
                type="email"
                placeholder="ola@nordmann.no"
                v-model="user.email"
                disabled
                required
              />
            </p>
          </div>
        </div>
      </div>
      <!-- Passord -->
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Passord</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <input
                class="input"
                type="password"
                v-model="user.password"
                required
              />
            </p>
          </div>
        </div>
      </div>
      <!-- Telefonnummer -->
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Telefonnummer</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <input
                class="input"
                type="text"
                placeholder="815-493-00"
                v-model="user.phone"
                required
              />
            </p>
          </div>
        </div>
      </div>
      <!-- Brukertype -->
      <div class="field is-horizontal">
        <div class="field-label">
          <label class="label">Brukertype</label>
        </div>
        <div class="field-body">
          <div class="field is-narrow">
            <div class="control">
              <span v-if="user.isFirm">Firma</span>
              <span v-if="!user.isFirm">Privatperson</span>
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label"></label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <button class="button is-info mt-5">
                Oppdater profil
              </button>
              <button
                class="button is-danger mt-5 ml-3"
                v-on:click.prevent.stop="
                  speak('Trenger popup med: er du sikker, så slett bruker')
                "
              >
                Slett bruker
              </button>
            </p>
          </div>
        </div>
      </div>
    </form>

    <div class="notification is-success" v-show="updateSuccess">
      <p class="title">👏 Takk {{ user.firstname }}.</p>
      <p>
        Din brukerkonto er nå oppdatert.
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "EditProfile",
  data() {
    return {
      updateSuccess: false,
      user: {}
    };
  },
  created() {
    this.getUserData();
  },
  methods: {
    getUserData() {
      axios
        .get(`http://localhost:5000/users/${this.token}`)
        .then((response) => {
          const userdata = response.data;
          console.log(userdata);

          this.user = response.data;
        });
    },
    async updateProfile() {
      await axios
        .put(`http://localhost:5000/users/${this.token}`, this.user)
        .then((response) => {
          if (response.status === 200) {
            this.updateSuccess = true;
            setTimeout(() => this.$router.push({ path: "/profile" }), 3000);
          }
          if (response.status === 500) {
            // TODO: Trenger en visuell beskjed hvis feil oppstår!
            console.log("FEILER!!");
          }
        });
    },
    speak: (message) => {
      alert(message);
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
