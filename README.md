# Schoolvolleybal WK - Reis naar China

Een visualisatie webapp die de voortgang toont van de fundraising voor de reis naar het schoolvolleybal wereldkampioenschap in China.

## 🎯 Functionaliteit

- **Visuele voortgang**: Een vliegtuig vliegt van Nederland naar China, waarbij de afstand de hoeveelheid opgehaald geld representeert
- **Animaties**: Soepele animaties bij het laden van de pagina
- **Real-time data**: Toont het huidige bedrag, percentage en kilometers afgelegd
- **Locatie indicator**: Geeft aan boven welk land het vliegtuig zich momenteel bevindt
- **Responsive design**: Werkt op desktop, tablet en mobiel

## 📊 Data Structuur

De data wordt opgeslagen in `data.json`:

```json
{
  "fundraising": {
    "huidigBedrag": 15000,
    "doelBedrag": 41500,
    "laatstBijgewerkt": "2025-11-08"
  }
}
```

### Velden:
- **huidigBedrag**: Het tot nu toe opgehaalde bedrag in euro's
- **doelBedrag**: Het totale doel (€41.500)
- **laatstBijgewerkt**: Datum van laatste update (YYYY-MM-DD formaat)

## 🚀 Gebruik

### Lokaal draaien

1. Open `index.html` in een moderne webbrowser
2. Of gebruik een lokale webserver:
   ```bash
   # Met Python
   python -m http.server 8000

   # Of met Node.js
   npx http-server
   ```
3. Open in browser: `http://localhost:8000`

### Data bijwerken

Bewerk `data.json` en update de waarde van `huidigBedrag`:

```json
{
  "fundraising": {
    "huidigBedrag": 25000,
    "doelBedrag": 41500,
    "laatstBijgewerkt": "2025-11-15"
  }
}
```

Upload het bestand opnieuw naar je hosting en de pagina wordt automatisch bijgewerkt.

## 🎨 Design

- **Kleuren**: Lichte, vrolijke kleuren met zachte gradiënten
- **Animaties**: Soepele overgangen en vlieg-effecten
- **Stijl**: Minimalistisch en abstract

## 📱 Responsive

De webapp past zich automatisch aan verschillende schermformaten aan:
- Desktop: Volledige weergave met alle details
- Tablet: Geoptimaliseerde layout
- Mobiel: Gestapelde kaarten voor betere leesbaarheid

## 🔄 Migratie naar Firebase (optioneel)

Als je later wilt overstappen naar Firebase voor eenvoudigere updates:

1. Maak een Firebase project aan op https://console.firebase.google.com
2. Voeg Firestore Database toe
3. Pas `js/data.js` aan om data van Firebase te halen in plaats van `data.json`
4. Je kunt dan data bijwerken via het Firebase dashboard zonder bestanden te uploaden

## 📂 Project Structuur

```
/
├── index.html          # Hoofd HTML bestand
├── data.json          # Fundraising data
├── css/
│   └── style.css      # Styling en animaties
├── js/
│   ├── data.js        # Data management
│   └── animation.js   # Vliegtuig animatie logica
└── README.md          # Deze documentatie
```

## 🌐 Deployment

Je kunt deze webapp gratis hosten op:
- **GitHub Pages**: Gratis hosting voor statische websites
- **Netlify**: Automatische deployment vanuit Git
- **Vercel**: Snelle deployment met preview URLs
- **Firebase Hosting**: Als je Firebase gebruikt voor data

## 💡 Tips

- Update `laatstBijgewerkt` elke keer dat je `huidigBedrag` aanpast
- Test de animaties na elke update door de pagina te refreshen
- De vliegtuig animatie triggert wanneer de visualisatie in beeld komt (scroll-activated)

## 📝 Licentie

Dit project is gemaakt voor het schoolvolleybal team. Voel je vrij om het aan te passen aan je eigen behoeften.
