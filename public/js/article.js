const pieColorsNow = ['#003F5C', '#68CF6A', '#00A28A'];
const pieColorsFuture = ['#444444', '#68CF6A'];

const presentDayData = [
  {'label': 'Natural Gas', 'value': 43},
  {'label': 'Solar, Wind, and Other Renewables', 'value': 30},
  {'label': 'Large Hydro and Nuclear', 'value': 27}
];

const futureData = [
  {'label': 'Carbon Neutral', 'value': 40},
  {'label': 'Renewable', 'value': 60}
];

$(document).ready(function() {
  drawMaps();
  makePieChart('#pie-present', presentDayData, pieColorsNow, '2017 (Natural gas, large hydro/nuclear, and renewable)');
  makePieChart('#pie-future', futureData, pieColorsFuture, '2045 (Renewable vs. carbon neutral)');
});
