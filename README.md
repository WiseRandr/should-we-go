# Should We Go? — Outdoor Activity Planner

CPAN 113 · Group 5

Should We Go? helps you decide if the weather is right for an outdoor activity. Search for a city, pick an activity and a day, and the app checks the live forecast and gives you:

- a **suitability score** out of 100 with a verdict: **Go** (70+), **Maybe** (40–69) or **Stay home** (under 40)
- the **weather details** for that day
- **warnings** for anything outside the ideal range for the activity
- **packing advice**

You can save plans, then filter, sort, reopen or delete them on the **Saved plans** page.

## How to run

The app uses JavaScript modules and `fetch`, so it must be opened through a local server, not by double-clicking the HTML file.

1. Open the `should-we-go` folder in VS Code.
2. Install the **Live Server** extension.
3. Right-click `index.html` → **Open with Live Server**.

No API key is needed.

## Pages

| Page | What it does |
|---|---|
| `index.html` | Search form and the forecast results below it |
| `saved.html` | Saved plans with filters, sorting and an average score |
| `about.html` | About page (empty for now) |
| `contact.html` | Contact page (empty for now) |

Every page has a light/dark theme toggle in the header. The choice is remembered.

## Project structure

```
should-we-go/
├── index.html, saved.html, about.html, contact.html
├── css/
│   ├── theme.css        colours, sizes and shared styles (light + dark)
│   └── main.css         page layouts
├── data/
│   ├── activities.json  activities and their weather rules
│   └── plans.json       sample plans, loaded into localStorage on the first visit
└── js/
    ├── api.js           Open-Meteo city search + 7-day forecast
    ├── ui.js            form validation and submit events
    ├── home.js          fills the activity and day dropdowns
    ├── forecast.js      scores the forecast and shows the results
    ├── saved.js         saved plans list: filter, sort, reopen, delete
    ├── storage.js       localStorage and JSON loading
    ├── theme.js         light/dark toggle
    └── classes/
        ├── activity.js          Activity parent class (scoring, warnings, advice)
        ├── hiking.js, cycling.js, picnic.js, photography.js,
        │   running.js, camping.js, beach-day.js, walking.js
        └── create-activity.js   picks the right class for an activity
```

## How the score works

Each activity in `data/activities.json` has rules for five weather factors: temperature, rain chance, wind, UV index and humidity. Each rule has an **ideal** range, an **acceptable** range and a **weight**. The weights of an activity add up to 100.

1. Each factor gets a value between 0 and 1:
   - **1** inside the ideal range
   - **0** outside the acceptable range
   - **in between** when it is between the two (for example, halfway between the ideal and acceptable limits = 0.5)
2. Each value is multiplied by its weight, and the results are added up with `reduce`.
3. The total is the score out of 100. If the forecast is missing a factor, the score is calculated from the factors that are available.

Some activities override the score when one condition should ruin the day, whatever the rest is:

| Activity | Rule |
|---|---|
| Picnic | likely rain caps the score at 30 |
| Cycling | strong wind caps the score at 30 |
| Camping | a freezing night caps the score at 30 |
| Beach Day | too cold caps the score at 20 |

Each activity class also adds its own items to the packing advice (for example, a helmet for cycling or a tent for camping).

## Saved plans

Plans are saved in the browser's `localStorage` under the key `plans`.

- On the first visit, `data/plans.json` is loaded into `localStorage` as sample data. After that, only `localStorage` is used.
- A plan's id is `YYYY-MM-DD-activity` (for example `2026-11-27-cycling`), so there is only one plan per activity per day. Saving the same activity and day again updates the existing plan.
- **Reopen** checks the live forecast again for that city and date, so the score can be different from the saved one.

To reset the saved plans while testing, run this in the browser console:

```js
localStorage.removeItem("plans");
```

## Course concepts used

| Concept | Where |
|---|---|
| Classes, `extends`, `super`, overridden methods | `js/classes/` |
| `async`/`await`, `response.ok`, `try...catch`, visible error messages | `js/api.js`, `js/storage.js`, `js/forecast.js` |
| Modules (`import` / `export`) | all files in `js/` |
| Arrays and callbacks: `map`, `filter`, `find`, `forEach`, `sort`, `reduce` | `js/classes/activity.js`, `js/saved.js`, `js/forecast.js` |
| Spread operator | `js/storage.js` (updating plans), `js/saved.js` (sorting a copy), `js/forecast.js` |
| `JSON.parse` / `JSON.stringify` with `localStorage` | `js/storage.js` |
| `createElement`, `textContent`, `appendChild` | `js/forecast.js`, `js/saved.js`, `js/home.js` |
| Events: submit, change, click, and event delegation | `js/ui.js`, `js/saved.js` (one click listener for every Reopen/Delete button), `js/theme.js` |

## APIs

All weather data comes from [Open-Meteo](https://open-meteo.com/). It is free for non-commercial use and needs no API key ([pricing](https://open-meteo.com/en/pricing)).

- [Geocoding API](https://open-meteo.com/en/docs/geocoding-api): turns a city name into coordinates.
- [Forecast API](https://open-meteo.com/en/docs): 7-day daily forecast (temperature, rain chance, wind, humidity, UV index).

## Team

| Member | Responsibilities | Files |
|---|---|---|
| Ahmad Alsalkini | City search and forecast requests, data normalization | `js/api.js` |
| Mark O'Donnell | Form validation, submit/change/click events | `js/ui.js` |
| Herinalamina Wise Randriamialison | Activity classes and scoring, warnings and advice, storage, saved plans (save, delete, reopen, filter, sort, average score), pages and styles | `js/classes/`, `js/storage.js`, `js/forecast.js`, `js/home.js`, `js/saved.js`, `js/theme.js`, `data/`, HTML and CSS |

Rowan Markou Heppell was originally responsible for the activity classes, scoring, warnings and advice. Rowan left the course, and Herinalamina Wise Randriamialison took over those tasks.

Each JavaScript file should start with a comment naming its author and student number.
