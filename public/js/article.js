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
                  ['#003E66'],
                  false,
                  ['15K', '20K', '25K', '30K'],
                  'Time of Day',
                  'Load (Megawatts)',
                  15000, 30000);

    makeLineChart('#renewable-production',
                  'Solar and Wind Production: 1/9/2019',
                  data,
                  ['Solar Plus Wind (MW)'],
                  ['#DB8000'],
                  false,
                  ['0', '5K', '10K', '15K'],
                  'Time of Day',
                  'Production (Megawatts)',
                  0,
                  15000);

    makeLineChart('#duck-curve',
                  'Net Load: 1/9/2019',
                  data,
                  ['Net Load (MW)'],
                  ['#2A91D4'],
                  false,
                  ['15K', '20K', '25K', '30K'],
                  'Time of Day',
                  'Load (Megawatts)',
                  15000, 30000);
  });


});
