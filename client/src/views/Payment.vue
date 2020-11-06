<template>
    <div>
        <h2>Betaling</h2>
        <div>
            <p>Her kommer informasjon om hva som skal kjøpes og prisen. Eksempel:</p>
            <p>[Produkt] - [Pris]</p>
        </div>
        <div id="PayBtn">
            <p>Betal med:</p>
            <button id="VipBtn">Vipps</button>
            <button id="MasBtn">Mastercard</button>
        </div>
        <div id="replyDiv">
        <p>Her kommer tilbakemelding om betalingen gikk igjennom eller ikke.</p>
        <p>Denne div'en vil være skjult til betaling gjennomføres, og motsatt vil 'betal med' + knappene bli borte.</p>
        </div>
    </div>
</template>

<script>
function runHiddenFunctions(){
    makeHiddenVisible("replyDiv");
    makeHiddenVisible("PayBtn");
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