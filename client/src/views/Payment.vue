<template>
    <div>
        <p class="title is-2">Betaling</p>
            <div class="field">
                <!--Her kommer informasjon om hva som skal kjøpes og prisen. Eksempel:-->
                <!--[Produkt] + [Pris]-->
                <span class="has-text-weight-bold">{{ payment.adress }} {{ payment.zipcode }}</span>
                <p>Total:</p>
                <span class="has-text-weight-bold">{{ payment.total_price }}</span>
                <!-- Så langt er det bare parkeringsadressen og totalen som vises. Dato/klokkeslett legger vi kanskje til senere? -->
            </div>
        <div>

        </div>
        <div id="payDiv" class="field">
            <p>Betal med:</p>
            <button id="VipBtn" type="submit" class="button is-success is-medium is-fullwidth>Vipps</button>
            <button id="MasBtn" type="submit" class="button is-success is-medium is-fullwidth>Mastercard</button>
        </div>

        <div id="replyDiv" class="field">
            <p>Her kommer tilbakemelding om betalingen gikk igjennom eller ikke.</p>
            <p>Denne div'en vil være skjult til betaling gjennomføres, og motsatt vil 'betal med' + knappene bli borte.</p>
        </div>
    </div>
</template>

<script>
function runHiddenFunctions(){
    makeHiddenVisible("replyDiv");
    makeHiddenVisible("payDiv");
}

function makeHiddenVisible(recievedDiv) {
  if (recievedDiv.style.display === "none") {
    recievedDiv.style.display = "block";
  } else {
    recievedDiv.style.display = "none";
  }
}
document.getElementById("VipBtn").addEventListener("click", runHiddenFunctions());
document.getElementById("MasBtn").addEventListener("click", runHiddenFunctions());
</script>

<style scoped>
#replyDiv {
    display: "none";
}

#VipBtn {
    background-color: #f44336;
    color: white;
    border-radius: 12px;
}

#MasBtn {
    background-color: #3366cc;
    color: white;
    border-radius: 12px;
}
</style>