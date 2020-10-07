<template>
  <div class="home">
    <p class="title is-2">Lei av å lete etter parkering?</p>
    <p class="subtitle is-4">Share-a-spot fikser det!</p>
    <p>
      You think water moves fast? You should see ice. It moves like it has a
      mind. Like it knows it killed the world once and got a taste for murder.
      After the avalanche, it took us a week to climb out. Now, I don't know
      exactly when we turned on each other, but I know that seven of us survived
      the slide... and only five made it out. Now we took an oath, that I'm
      breaking now. We said we'd say it was the snow that killed the other two,
      but it wasn't. Nature is lethal but it doesn't hold a candle to man.
    </p>
    <p>
      Now that there is the Tec-9, a crappy spray gun from South Miami. This gun
      is advertised as the most popular gun in American crime. Do you believe
      that shit? It actually says that in the little book that comes with it:
      the most popular gun in American crime. Like they're actually proud of
      that shit.
    </p>

    <div class="notification is-grey-lighter">
      Normally, both your asses would be dead as fucking
      <strong>fried chicken</strong>, but you happen to pull this shit while I'm
      in a transitional period so I don't wanna kill you, I wanna help you. But
      I can't give you this case, it don't belong to me. Besides, I've already
      been through <a href="/">too much shit</a> this morning over this case to
      hand it over to your dumb ass.
    </div>

    <div class="field is-grouped is-grouped-centered">
      <p class="control">
        <router-link to="/about" class="button is-primary is-large">
          Hvordan fungerer share-a-spot?
        </router-link>
      </p>
      <p class="control" v-if="!loggedIn">
        <router-link to="/register" class="button is-danger is-large">
          Registrer deg
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    }
  }
};
</script>
