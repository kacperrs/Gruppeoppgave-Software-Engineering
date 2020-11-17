<template>
  <div id="paymentContainer">
    <div class="container" v-if="paymentStatus != 'success'">
      <div class="columns is-centered">
        <div class="column is-three-fifths">
          <p class="title">Betaling</p>

          <div class="notification is-success is-light has-text-centered">
            <div v-if="dateFormatter.diff.days > 1">
              <p>
                for
                <strong>{{ dateFormatter.diff.days }}</strong>
                dager, på <strong>{{ spot.address }}</strong> i
                <strong>{{ spot.zipcode }}</strong
                >.
              </p>

              <div class="columns is-centered is-vcentered">
                <div class="column is-narrow">📅 {{ dateFormatter.start }}</div>
                <div class="column is-narrow">
                  <div class="content is-large"><strong>&rarr;</strong></div>
                </div>
                <div class="column is-narrow">{{ dateFormatter.end }} 📆</div>
              </div>
            </div>

            <div v-if="dateFormatter.diff.days == 1">
              <p>
                for
                <span v-if="dateFormatter.diff.hour > 0">
                  <strong>{{ dateFormatter.diff.hour }}</strong>
                  time(r)</span
                >

                <span
                  v-if="
                    dateFormatter.diff.min > 0 && dateFormatter.diff.hour > 0
                  "
                >
                  og
                </span>

                <span v-if="dateFormatter.diff.min > 0"
                  ><strong>{{ dateFormatter.diff.min }}</strong> minutter</span
                >, på <strong>{{ spot.address }}</strong> i
                <strong>{{ spot.zipcode }}</strong
                >.
              </p>

              <div class="columns is-centered is-vcentered">
                <div class="column is-narrow">🕜 {{ dateFormatter.start }}</div>
                <div class="column is-narrow">
                  <div class="content is-large"><strong>&rarr;</strong></div>
                </div>
                <div class="column is-narrow">{{ dateFormatter.end }} 🕔</div>
              </div>
            </div>
          </div>

          <div class="notification is-warning is-light has-text-centered">
            <p class="subtitle is-4">
              Å betale:
            </p>
            <p class="title">{{ cost }},-</p>
          </div>

          <p class="subtitle">Velg betalingsmetode</p>
          <div class="columns">
            <div class="column">
              <button
                class="button vipps is-danger is-medium is-fullwidth"
                @click="doPayment('vipps')"
              >
                Vipps
              </button>
            </div>

            <div class="column">
              <button
                class="button is-info master is-medium is-fullwidth"
                @click="doPayment('master')"
              >
                Mastercard
              </button>
            </div>
          </div>

          <div
            class="notification is-danger is-light"
            v-if="paymentStatus == 'failed'"
          >
            ⚠️ <strong>Oisann</strong>, betalingen gikk ikke igjennom, prøv
            igjen!
          </div>

          <p class="subtitle">Eller gå tilbake for å endre dato</p>
          <router-link
            class="button is-fullwidth is-success is-light"
            :to="{
              name: 'BookParkingspot',
              params: { id: spot.id }
            }"
            >Tilbake</router-link
          >
        </div>
      </div>
    </div>

    <div
      class="notification is-success is-light"
      v-if="paymentStatus == 'success'"
    >
      ✔️ <strong>Takk skal du ha!</strong>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Payment",
  props: {
    spot: {},
    date: {},
    dateFormatter: {},
    cost: {}
  },
  data() {
    return {
      payment: {
        total_price: 1,
        address: 12,
        zipcode: 12
      },
      paymentStatus: ""
    };
  },
  methods: {
    async doPayment(method) {
      // Need to pass payment type to obj
      console.log("Clicked", method);

      const booking = {
        id: this.spot.id,
        uid: this.$store.getters.token,
        date: this.date,
        paymentMethod: method,
        cost: this.cost
      };

      await axios
        .post("http://localhost:5000/spots/book", booking)
        .then((response) => {
          console.log(response.status);
          if (response.status === 200) {
            this.paymentStatus = "success";
            setTimeout(() => this.$router.push({ path: "/profile" }), 3000);
          }
        })
        .catch((error) => {
          if (error.response.status === 402) {
            this.paymentStatus = "failed";
          }
        });
    }
  }
};
</script>

<style scoped>
.vipps {
  background-color: #f44336;
}

.master {
  background-color: #3366cc;
}
</style>
