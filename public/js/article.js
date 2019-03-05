const pieColorsNow = ['#777777', '#003E66', '#77C2F2'];
const pieColorsFuture = ['#003E66', '#77C2F2'];

const presentDayData = [
  {'label': 'Natural Gas', 'value': 64.5},
  {'label': 'Carbon Neutral', 'value': 21.5},
  {'label': 'Renewables', 'value': 14}
];

const futureData = [
  {'label': 'Carbon Neutral', 'value': 40},
  {'label': 'Renewables', 'value': 60}
];

$(document).ready(function() {
  drawMaps();
  makePieChart('#pie-present', presentDayData, pieColorsNow, '2016');
  makePieChart('#pie-future', futureData, pieColorsFuture, '2045');
  let lineChartData = d3.csv('20190109_CA_DuckCurve.csv').then(function (data) {
    makeLineChart('#energy-demand',
                  'Demand for Energy: 1/9/2019',
                  data,
                  ['Total Load (MW)'],
                  ['black'],
                  false,
                  ['0', '10K', '20K', '30K'],
                  'Time of Day',
                  'Load (Megawatts)');

    makeLineChart('#renewable-production',
                  'Solar and Wind Production: 1/9/2019',
                  data,
                  ['Solar Plus Wind (MW)'],
                  ['limegreen'],
                  false,
                  ['0', '10K', '20K', '30K'],
                  'Time of Day',
                  'Production (Megawatts)');

    makeLineChart('#duck-curve',
                  'Net Load: 1/9/2019',
                  data,
                  ['Net Load (MW)'],
                  ['black'],
                  false,
                  ['0', '10K', '20K', '30K'],
                  'Time of Day',
                  'Net Load (Megawatts)');
  });


});
