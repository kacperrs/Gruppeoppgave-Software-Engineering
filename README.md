<h1 align="center"> Gruppeprosjektet Software Engineering </h1>
<h3 align="center"> Høst 2020 </h2>

**Gruppe 19**

* :blue_heart: Fabian Berget Lindblad
* :purple_heart: Kacper Rafal Sliwa
* :yellow_heart: Rikke Hedelund Hansen
* :green_heart: Aleksander Lengard

## Oppgaven
En oppstartsbedrift ønsker å få lagd en løsning der **bedrifter** og **privatpersoner** kan leie ut sine parkeringsplasser til andre. Idéen går ut på at **noen aktører** kan **registrere tilgjengelige plasser** som kan leies ut, mens **sluttbrukerene** kan **se**, **reservere** og **betale** for parkeringsplasser i den **tiden de trenger det**. 

## Applikasjonen
Tanken er å bruke **[Vue.js](https://vuejs.org/)** som web frontend. **[Express](https://expressjs.com/)** som api-backend, med **[SQLite](https://www.sqlitetutorial.net/sqlite-nodejs/)** som database. Vi bruke **[npm](https://www.npmjs.com/)** som pakkesystem (npm kommer som en del av node). Til testing bruker vi et javascript rammer verk som heter **[Jest](https://jestjs.io/)**

### Node
Bruker node versjon **v14.13.0**. Har dere allerde node på maskinen, men usikker på hvilken versjon så kan dere sjekke ved å skrive `node -v` i terminalen:
```bash
$ node -v
v14.13.0
```
Node kan skaffes her: [Node.js](https://nodejs.org/en/)

### Installere applikasjonen
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
$ npm start serve
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