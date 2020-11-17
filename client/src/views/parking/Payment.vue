<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-three-fifths">
        <p class="title">Betaling</p>

        <div class="notification is-success is-light has-text-centered">
          <div v-if="$route.params.dateFormatter.diff.days > 1">
            <p>
              for
              <strong>{{ $route.params.dateFormatter.diff.days }}</strong>
              dager, på <strong>{{ $route.params.spot.address }}</strong> i
              <strong>{{ $route.params.spot.zipcode }}</strong
              >.
            </p>

            <div class="columns is-centered is-vcentered">
              <div class="column is-narrow">
                📅 {{ $route.params.dateFormatter.start }}
              </div>
              <div class="column is-narrow">
                <div class="content is-large"><strong>&rarr;</strong></div>
              </div>
              <div class="column is-narrow">
                {{ $route.params.dateFormatter.end }} 📆
              </div>
            </div>
          </div>

          <div v-if="$route.params.dateFormatter.diff.days == 1">
            <p>
              for
              <span v-if="$route.params.dateFormatter.diff.hour > 0">
                <strong>{{ $route.params.dateFormatter.diff.hour }}</strong>
                time(r)</span
              >

              <span
                v-if="
                  $route.params.dateFormatter.diff.min > 0 &&
                    $route.params.dateFormatter.diff.hour > 0
                "
              >
                og
              </span>

              <span v-if="$route.params.dateFormatter.diff.min > 0"
                ><strong>{{ $route.params.dateFormatter.diff.min }}</strong>
                minutter</span
              >, på <strong>{{ $route.params.spot.address }}</strong> i
              <strong>{{ $route.params.spot.zipcode }}</strong
              >.
            </p>

            <div class="columns is-centered is-vcentered">
              <div class="column is-narrow">
                🕜 {{ $route.params.dateFormatter.start }}
              </div>
              <div class="column is-narrow">
                <div class="content is-large"><strong>&rarr;</strong></div>
              </div>
              <div class="column is-narrow">
                {{ $route.params.dateFormatter.end }} 🕔
              </div>
            </div>
          </div>

          <p class="subtitle is-4 mt-5">
            Å betale:
          </p>
          <p class="title">{{ $route.params.cost }},-</p>
        </div>

        <p class="subtitle">Velg betalingsmetode</p>
        <div class="columns">
          <div class="column">
            <button class="button vipps is-danger is-medium is-fullwidth">
              Vipps
            </button>
          </div>

          <div class="column">
            <button class="button is-info master is-medium is-fullwidth">
              Mastercard
            </button>
          </div>
        </div>
        <p class="subtitle">Eller gå tilbake for å endre dato</p>
        <router-link
          class="button is-fullwidth is-success is-light"
          :to="{
            name: 'BookParkingspot',
            params: { id: $route.params.id }
          }"
          >Tilbake</router-link
        >
      </div>
    </div>

    <div class="field">
      <!--Her kommer informasjon om hva som skal kjøpes og prisen. Eksempel:-->
      <!--[Produkt] + [Pris]-->
      <span class="has-text-weight-bold"
        >{{ payment.address }} {{ payment.zipcode }}</span
      >
      <p>Total:</p>
      <span class="has-text-weight-bold">{{ payment.total_price }}</span>
      <!-- Så langt er det bare parkeringsadressen og totalen som vises. Dato/klokkeslett legger vi kanskje til senere? -->
    </div>
    <div></div>
    <div id="payDiv" class="field">
      <p>Betal med:</p>
      <button
        id="VipBtn"
        type="submit"
        class="button is-success is-medium is-fullwidth"
      >
        Vipps
      </button>
      <button
        id="MasBtn"
        type="submit"
        class="button is-success is-medium is-fullwidth"
      >
        Mastercard
      </button>
    </div>

    <div id="replyDiv" class="field">
      <p>Her kommer tilbakemelding om betalingen gikk igjennom eller ikke.</p>
      <p>
        Denne div'en vil være skjult til betaling gjennomføres, og motsatt vil
        'betal med' + knappene bli borte.
      </p>
    </div>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  name: "Payment",
  data() {
    return {
      payment: {
        total_price: 1,
        address: 12,
        zipcode: 12
      }
    };
  }
};

// function runHiddenFunctions(){
//     makeHiddenVisible("replyDiv");
//     makeHiddenVisible("payDiv");
// }

// function makeHiddenVisible(recievedDiv) {
//   if (recievedDiv.style.display === "none") {
//     recievedDiv.style.display = "block";
//   } else {
//     recievedDiv.style.display = "none";
//   }
// }
// document.getElementById("VipBtn").addEventListener("click", runHiddenFunctions());
// document.getElementById("MasBtn").addEventListener("click", runHiddenFunctions());
</script>

<style scoped>
.vipps {
  background-color: #f44336;
  /* color: white;
  border-radius: 12px; */
}

.master {
  background-color: #3366cc;
  /* color: white;
  border-radius: 12px; */
}
</style>
