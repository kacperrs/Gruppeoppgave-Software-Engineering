<h1 align="center"> Gruppeprosjektet Software Engineering </h1>

<p align="center">
 Fabian :purple_heart: Kacper :yellow_heart: Rikke :green_heart: Aleksander
</p>

<p align="center">
  <a href="#applikasjonen">Applikasjonen</a> •
  <a href="#last-ned-og-innstaler">Last ned og innstaler</a> •
  <a href="#">Bruk</a> •
  <a href="#">Tester</a> •
  <a href="#">Related</a>
</p>

<hr>

## Applikasjonen

Denne applikasjonen er en prototype, minste brukbare produkt for en tjeneste som skal la brukere leie, og leie ut sine egne parkeringsplasser. Brukere skal kunne finne tilgjengelige plasser, reservere og betale for parkeringsplassen i perioden de trenger den. De skal også ha mulighet for å legge ut sin egen parkeringsplass og tilby den for andre.

Vi har valgt å skape en web applikasjon som kommuniserer med hovedsystemet via en API. Brukergrensesnittet er utviklet med **[Vue.js](https://vuejs.org/)** og bruker **[BUMLA](https://bulma.io/)** som CSS rammeverk. APIen er utviklet i JavaScript og bruker **[Express](https://expressjs.com/)** for å håndtere forespørsler. For å lagre data, har vi valgt en enkel form for *«database»* som skriver og henter data fra JSON-filer på disk. Til testing bruker vi et JavaScript test-rammeverk som heter **[Jest](https://jestjs.io/)**. Og **[npm](https://www.npmjs.com/)** blir brukt som pakkesystem, npm kommer som en del av **[Node.js](https://nodejs.org/en/)**. 


## Last ned og innstaler

For å laste ned og installere systemet, trenges Node og Git. Usikker på om du har dette installert? Da kan du ta en titt <a href="#innstaller-node-og-git">her</a>, så forklares fremgangsmåten. Hvis dette er greit, gå til neste steg.

### :octocat: Laste ned fra GitHub
For å laste ned filene, åpener du terminalen og navigerer til ønsket mappe for systemet. Last så ned filene fra github.

```bash
$ git clone https://github.com/wakeupgrumpy/Software-Engineering.git
```

Dette skaper da mappen `Software-Engineering` med alle filene til applikasjonen. Naviger inn i mappen og fortsett til neste steg.

```bash
$ cd Software-Engineering
```
### :pineapple: Server
Systemet er delt opp i to deler, en ``client`` og en ``server``. Vi skal nå gå igjennom installasjonen av serveren.

Naviger inn i `server` mappen, og installer avhengigheter:
```bash
$ cd server
$ npm install
```
``npm`` vill nå laste ned alle avhengigheter til server programmet, og legge disse i mappen ``node_modules``.

Når avhengigheten er ferdig lastet ned er server siden av systemet klart til bruk. 

### :strawberry: Client
Naviger terminalen inn i ``client`` mappen og installer avhengigheter:

```bash
$ cd client
$ npm install
```
``npm`` vill nå laste ned alle avhengigheter til klient programmet, og legge disse i mappen ``node_modules``.

Når avhengigheten er ferdig lastet ned er klient siden av systemet klart til bruk. 

### :construction_worker: Innstaller node og git
#### Node.js
For å laste ned og installere systemet kreves Node.js. Usikker på om du har node installert på maskinen? Da kan du åpne terminalen og skrive `node -v`.

```bash
$ node -v
v14.13.0
```

Dette vil returnere versjonen av node som er installert. Hvis du får en feilmelding, så er ikke node installert og da kan det skaffes her: **[Node.js](https://nodejs.org/en/)**

Vi har brukt node versjon **v14.13.0** under utvikling. Men har også blitt testet og virker med seneste versjon **v15.2.1**.

#### Git
For å laste ned systemet med terminalen fra github trenger du git. Det kan lastes ned her: <https://git-scm.com/download>.


#### Git alternativ
Hvis du ikke ønsker å installere og bruke git. Kan systemet lastes ned som en ``.zip`` fil ved å trykke på den grønne **``CODE``** knappen øverst til høyre på denne siden, og **``Download ZIP``**


## Bruk
Når avhengigheter til server og klienten er lastet ned og installert er systemet kart til bruk. 

:warning: **MERK:** Både **server** og **client** må kjøre for at systemet skal virke som det skal!

### :apple: Server
Vi åpner en ny terminal og navigerer først til ``server`` mappen. Og starter serveren ved å bruke kommandoen: 

```bash
$ npm run start
```
Du vil nå få en tilbakemelding i terminalen som ser slik ut, systemet er klart til bruk på <http://localhost:5000>. **Ikke** lukk dette terminalvinduet for da avsluttes programmet.
```bash
> share-a-spot@1.0.0 start
> node index.js

Server running on port: http://localhost:5000
```
❗ **MERK!** Pass på at det ikke er noe annet på maskinen din som allerede kjører på denne porten, dette vill medføre at systemet ikke starter!

Hvis du åpner http://localhost:5000 i nettleseren din, så skal du se meldingen: 
```bash
{
  message: "Share-A-Spot Server - Up and 🏃"
}
```

💡 **TIPS:** Ved utvikling brukes ``nodemon``, som gjør at vi ikke selv trenger å starte serveren på nytt hver gang vi gjør en endring. Er det ønskelig å starte serveren på denne måten bruker vi isteden kommandoen:
```bash
$ npm run dev
```

### :grapes: Client

For å starte brukergrensesnittet, åpner vi ett nytt terminalvindu og navigerer til ``client`` mappen.  Vi starter vue sitt utviklingsmiljø ved:

```bash
$ npm run serve
```
Dette vil bygge systemet og gjøre det klart til bruk. 
```bash
  App running at:
  - Local:   http://localhost:8080/
  - Network: http://192.168.1.XXX:8080/

  Note that the development build is not optimized.
  To create a production build, run npm run build.
```
Når det er ferdig vil vi få en tilbakemleding i terminalen at systemet er tilgjengelig på <http://localhost:8080>. **Ikke** lukk dette terminalvinduet for da avsluttes programmet.

**Når begge tjenestene kjører, er systemet klart til å brukes. Du kan nå åpne nettleseren din og navigere til <http://localhost:8080> hvor brukergrensesnittet er.**

## Testing
For å kjøre testene åpner vi en terminal og navigerer til ``server`` mappen. Vi bruker [Jest](https://jestjs.io/) som er ett test rammeverk for JavaScript. Den vil gå igjennom alle mappene å lete etter filer merket med ``<filnavn>.test.js``. Alle filer som ligger i mappen ``__tests__`` automatisk også bli kjørt. Alle testene til programmet vårt ligger i denne mappen.

Når vi er i ``server`` mappen starter vi testene ved:
```bash
$ npm run test
```
Dette vil kun gi oss en tilbakemelding at alle testene var vellykket, eller hvis noen har feilet så vil den gi en tilbakemelding om det. For en mer utdypende rapport bruker vi `--verbose`
```bash
$ npm run test -- --verbose
```

```bash
$ npm run test -- --coverage
```