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

#### Laste ned fra github :octocat:
For å laste ned filene, åpener du terminalen og navigerer til ønsket mappe for systemet.

Last ned filene fra github :octocat:
```bash
$ git clone https://github.com/wakeupgrumpy/Software-Engineering.git
```

Dette skaper da mappen `Software-Engineering` med alle filene til applikasjonen. Naviger inn i mappen og fortsett til neste steg.

```bash
$ cd Software-Engineering
```
#### Server
Systemet er delt opp i to deler, en ``client`` og en ``server``. Vi skal nå gå igjennom installasjonen av serveren.

Naviger inn i `server` mappen, og installer avhengigheter:
```bash
$ cd server
$ npm install
```
``npm`` vill nå laste ned alle avhengigheter til server programmet, og legge disse i mappen ``node_modules``.

Når avhengigheten er ferdig lastet ned er systemet klart til bruk. Vi kan starte serveren ved å bruke kommandoen: 

```bash
$ npm run start
```
Du vil nå få en tilbakemelding som ser slik ut, systemet er klart til bruk på <http://localhost:5000>. **Ikke** lukk dette terminalvinduet for da avsluttes programmet.
```bash
> share-a-spot@1.0.0 start
> node index.js

Server running on port: http://localhost:5000
```
**MERK!** Pass på at det ikke er noe annet på maskinen din som allerede kjører på denne porten, dette vill medføre at systemet ikke starter!

Hvis du åpner http://localhost:5000 i nettleseren din, så skal du se meldingen: 
```bash
{
  message: "Share-A-Spot Server - Up and 🏃"
}
```

#### Client


#### Innstaller node og git
For å laste ned og installere systemet kreves Node.js. Usikker på om du har node installert på maskinen? Da kan du åpne terminalen og skrive `node -v`.

```bash
$ node -v
v14.13.0
```

Dette vil returnere versjonen av node som er installert. Hvis du får en feilmelding, så er ikke node installert og da kan det skaffes her: **[Node.js](https://nodejs.org/en/)**

Vi har brukt node versjon **v14.13.0** under utvikling. Men har også blitt testet og virker med seneste versjon **v15.2.1**.







Bruk terminalen og naviger til en mappe og last ned github repo (vil da skape mappen `Software-Engineering` med alle filene til applikasjonen):

```bash
$ git clone https://github.com/wakeupgrumpy/Software-Engineering.git
```

Så må dere navigere inn i denne mappen:

```bash
$ cd Software-Engineering
```

Innstaler alle dependencys til serveren

```bash
$ npm install
```

Så for å installere alle vue dependencies:

```bash
$ cd client
$ npm install
```

Skal i fremtiden når vi er ferdig med utvikling få alt til å være samlet, slik at sensor kun trenger å installere en gang.

### Front end

For å starte front-end. Så må dere være i mappen **client**:

```bash
$ npm run serve
```

Dere vill da få tilbake en meldin om at vue er tilgjengelig på <http://localhost:8080>

### Back end

Naviger til mappen **Software-Engineering**

```bash
$ npm start
```

Der vill da få tilbakemelding om at server kjører på <http://localhost:5000>

### Dataflyt

![Dataflyt](https://www.planttext.com/api/plantuml/svg/PP9BQyCm48Jl-XNR70LfxZwKK5fAeFH1eBtq8aTReyIH53r2y--xgzYnI0wo9VdJQ6RmCYOLKjxtGdYQc8tnoYQOIVaOyWw3b3DG4VBrrsziuJSucwI47mjV6U-tiQ37ZDVm6iEHfPXy_lC1Onnfw_GD_gIIQbN4yu7rvwj9M63TNgClpdKzmbxvE3YbwKqIJAetjXki6kyZBE0Dqzc2LoSXCimVs7e3nYOCQfC43NDK2IdyDETqWXwCi_S6f5JUIDb0mCF2krWTBE64u1VpkcKw7dgc3nd3QK8fccvXVb6bZhopMcYiaK5gj7gvUXkThT7Xui4dLT90XudUC8UFzzLqBRTLjaT9tgY4U3dAK4ybPCQOUB57MsNb5cbCIWC1RdTNAvQsYoA1cGMjnb0JN76rfFQNnD0l-Wy0)

### :link: Lenker

- Trello - kanbanbord <https://trello.com/b/Wj1RpvXr/krav/>
- Emoji liste <https://gist.github.com/rxaviers/7360908>

### :memo: Todo

- [ ] **`README`**
  - [ ] Legge til epost adresser til gruppemedlemer.
- [ ] **`Applikasjon`**: Legge til utfyllende informasjon
  - [ ] Hvordan installere dependencies
  - [ ] Hvordan skrive en test
  - [ ] Hvordan kjøre en test
  - [ ] Hvordan struktruen på applikasjonen skal se ut
  - [ ] Oversikt over tabeller i databasen
  - [ ] Hvordan starte serverne i dev
