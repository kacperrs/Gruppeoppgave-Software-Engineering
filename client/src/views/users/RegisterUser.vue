<template>
  <div class="register-form">
    <form action="#" @submit.prevent="register" v-if="!registrationSuccess">
      <p class="title">🧟 Registrer bruker</p>
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
                v-model="form.firstname"
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
                v-model="form.lastname"
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
                v-model="form.email"
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
                v-model="form.password"
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
                v-model="form.phone"
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
              <label class="radio">
                <input
                  type="radio"
                  v-model="form.isFirm"
                  v-bind:value="false"
                  name="member"
                  checked
                />
                Privatperson
              </label>
              <label class="radio">
                <input
                  type="radio"
                  v-model="form.isFirm"
                  v-bind:value="true"
                  name="member"
                />
                Firma
              </label>
            </div>
          </div>
        </div>
      </div>
      <!-- Brukervillkår -->
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label"></label>
        </div>
        <div class="field-body is-large">
          <p class="control">
            <label class="checkbox is-large">
              <input type="checkbox" />
              Jeg har lest, og godtatt
              <a href="#" @click="modal = true">brukervilkårene</a>
              for
              <strong>share-a-spot</strong>
            </label>
          </p>
        </div>
      </div>
      <!-- Registreringsknapp -->
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label"></label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <button class="button is-success is-medium is-fullwidth mt-5">
                Registrer bruker
              </button>
            </p>
          </div>
        </div>
      </div>

      <!-- Brukervilkår modal -->
      <div class="modal" v-bind:class="{ 'is-active': modal }">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Brukervilkår</p>
          </header>
          <section class="modal-card-body">
            <p>
              Normally, both your asses would be dead as fucking fried chicken,
              but you happen to pull this shit while I'm in a transitional
              period so I don't wanna kill you, I wanna help you. But I can't
              give you this case, it don't belong to me. Besides, I've already
              been through too much shit this morning over this case to hand it
              over to your dumb ass.
            </p>
            <p>
              The path of the righteous man is beset on all sides by the
              iniquities of the selfish and the tyranny of evil men. Blessed is
              he who, in the name of charity and good will, shepherds the weak
              through the valley of darkness, for he is truly his brother's
              keeper and the finder of lost children. And I will strike down
              upon thee with great vengeance and furious anger those who would
              attempt to poison and destroy My brothers. And you will know My
              name is the Lord when I lay My vengeance upon thee.
            </p>
            <p>
              Now that we know who you are, I know who I am. I'm not a mistake!
              It all makes sense! In a comic, you know how you can tell who the
              arch-villain's going to be? He's the exact opposite of the hero.
              And most times they're friends, like you and me! I should've known
              way back when... You know why, David? Because of the kids. They
              called me Mr Glass.
            </p>
            <p>
              The path of the righteous man is beset on all sides by the
              iniquities of the selfish and the tyranny of evil men. Blessed is
              he who, in the name of charity and good will, shepherds the weak
              through the valley of darkness, for he is truly his brother's
              keeper and the finder of lost children. And I will strike down
              upon thee with great vengeance and furious anger those who would
              attempt to poison and destroy My brothers. And you will know My
              name is the Lord when I lay My vengeance upon thee.
            </p>
          </section>
          <footer class="modal-card-foot">
            <button
              class="button is-success is-medium is-fullwidth"
              @click="modal = false"
            >
              Lukk
            </button>
          </footer>
        </div>
      </div>
    </form>
    <div class="notification is-success" v-show="registrationSuccess">
      <p class="title">👏 Takk {{ form.firstname }}.</p>
      <p>
        Din bruker er nå opprettet. Du vil nå bli videresendt til
        innloggingssiden.
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
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        phone: "",
        isFirm: false
      },
      modal: false,
      registrationSuccess: false
    };
  },
  methods: {
    async register() {
      await axios
        .post("http://localhost:5000/users", this.form)
        .then((response) => {
          if (response.status === 201) {
            this.registrationSuccess = true;
            setTimeout(() => this.$router.push({ path: "/login" }), 5000);
          }
          if (response.status === 500) {
            // TODO: Trenger en visuell beskjed hvis feil oppstår!
          }
        });
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
