<template>
  <div id="bookparkingspot" class="container">
    <p class="title">Velg dato</p>
    <p class="subtitle">
      <strong>{{ spot.address }}</strong> er ledig følgende dager:
    </p>
    <div class="columns">
      <div class="column is-two-thirds">
        <v-date-picker
          v-model="date"
          :min-date="new Date()"
          :model-config="timeConfig"
          :disabled-dates="{ weekdays: [1, 7] }"
          is-range
          is-expanded
          @change="countDays()"
        />
        <div
          class="notification is-info is-light mt-5"
          v-if="dateFormatter.diff.days == 1"
        >
          <div class="columns is-centered is-vcentered">
            <div class="column is-narrow">
              <v-date-picker
                mode="time"
                v-model="date.start"
                :model-config="timeConfig"
                is24hr
              />
            </div>
            <div class="column is-narrow">
              <div class="content is-large"><strong>&rarr;</strong></div>
            </div>
            <div class="column is-narrow">
              <v-date-picker
                mode="time"
                v-model="date.end"
                :model-config="timeConfig"
                is24hr
              />
            </div>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="notification is-info is-light">
          <strong>💡 Tips:</strong>
          <p>For å velge én dag - trykk to ganger på samme dato.</p>
        </div>
        <div
          class="notification is-primary is-light mt-5"
          v-if="dateFormatter.diff.days > 0"
        >
          <strong class="mb-3">Du har valgt:</strong>
          <div v-if="dateFormatter.diff.days > 1">
            <p>
              <strong>Fra:</strong> {{ dateFormatter.start }} <br />
              <strong>Til:</strong> {{ dateFormatter.end }}
            </p>
            <p>
              <strong>{{ dateFormatter.diff.days }}</strong> dager vil koste
            </p>
          </div>
          <div v-if="dateFormatter.diff.days == 1">
            <p>{{ dateFormatter.start }}</p>
            <p>
              <span v-if="dateFormatter.diff.hour > 0">
                <strong>{{ dateFormatter.diff.hour }}</strong> time(r)</span
              >

              <span
                v-if="dateFormatter.diff.min > 0 && dateFormatter.diff.hour > 0"
              >
                og
              </span>

              <span v-if="dateFormatter.diff.min > 0"
                ><strong>{{ dateFormatter.diff.min }}</strong> minutter</span
              >
              vil koste
            </p>
          </div>
          <p class="title mt-5">💰 {{ cost }},-</p>

          <router-link
            class="button is-info is-fullwidth mt-5"
            v-if="dateFormatter.diff.days > 0"
            :to="{
              name: 'Payment',
              params: {
                spot: spot,
                date: date,
                dateFormatter: dateFormatter,
                cost: cost
              }
            }"
          >
            Til betaling
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "BookParkingSpot",
  props: {
    id: {}
  },
  data() {
    return {
      spot: {},
      date: {
        start: 0,
        end: 0,
        diff: 0
      },
      timeConfig: {
        start: {
          timeAdjust: "12:00:00"
        },
        end: {
          timeAdjust: "15:00:00"
        }
      },
      cost: 0,
      dateFormatter: {
        start: "",
        end: "",
        diff: {
          days: "",
          hour: "",
          min: ""
        }
      },
      bookedDates: []
    };
  },
  created() {
    this.getSpotData();
    this.getBookedDates();
  },
  methods: {
    getSpotData() {
      axios.get(`http://localhost:5000/spots/${this.id}`).then((response) => {
        this.spot = response.data;
        this.spot.id = this.id;
      });
    },
    getBookedDates() {
      axios
        .get(`http://localhost:5000/spots/bookings/${this.id}`)
        .then((response) => {
          this.bookedDates = response.data;
        });
    }
  },
  watch: {
    diff: function() {
      let diff = this.date.end - this.date.start;
      this.dateFormatter.diff.days = Math.ceil(diff / (1000 * 3600 * 24));
      this.dateFormatter.diff.hour = Math.floor((diff / (1000 * 60 * 60)) % 24);
      this.dateFormatter.diff.min = Math.floor((diff / (1000 * 60)) % 60);

      let start = new Date(this.date.start);
      let end = new Date(this.date.end);

      this.dateFormatter.start = `${start.getDate()}-${start.getMonth() +
        1}-${start.getFullYear()}`;
      this.dateFormatter.end = `${end.getDate()}-${end.getMonth() +
        1}-${end.getFullYear()}`;

      if (this.dateFormatter.diff.days == 1)
        this.cost = Math.round(
          ((diff / (1000 * 60 * 60)) % 24) * this.spot.hour_price,
          2
        );
      else this.cost = this.dateFormatter.diff.days * this.spot.day_price;
    }
  },
  computed: {
    diff: function() {
      return this.date.end - this.date.start;
    }
  }
};
</script>

<style></style>
