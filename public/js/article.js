const pieColorsNow = ['#777777', '#003E66', '#77C2F2'];
const pieColorsFuture = ['#003E66', '#77C2F2'];

const presentDayData = [
  {'label': 'Natural Gas', 'value': 64.5},
  {'label': 'Carbon Neutral*', 'value': 21.5},
  {'label': 'Renewables', 'value': 14}
];

const futureData = [
  {'label': 'Carbon Neutral*', 'value': 40},
  {'label': 'Renewables', 'value': 60}
];

$(document).ready(function() {
  drawMaps();
  makePieChart('#pie-present', presentDayData, pieColorsNow, '2016 (Historical)');
  makePieChart('#pie-future', futureData, pieColorsFuture, '2045 (Projected)');
  let lineChartData = d3.csv('20180601_CA_DuckCurve.csv').then(function (data) {
    makeLineChart('#energy-demand',
                  'Demand for Energy: 6/1/2018',
                  data,
                  ['Total Load (MW)'],
                  ['#003E66'],
                  false,
                  ['15K', '20K', '25K', '30K'],
                  'Time of Day',
                  'Load (Megawatts)',
                  15000, 30000);

    makeLineChart('#renewable-production',
                  'Solar and Wind Production: 6/1/2018',
                  data,
                  ['Solar+Wind (MW)'],
                  ['#DB8000'],
                  false,
                  ['0', '5K', '10K', '15K'],
                  'Time of Day',
                  'Production (Megawatts)',
                  0,
                  15000);

    makeLineChart('#duck-curve',
                  'Net Load: 6/1/2018',
                  data,
                  ['Net Load (MW)'],
                  ['#2A91D4'],
                  false,
                  ['12K', '17K', '22K', '27K'],
                  'Time of Day',
                  'Load (Megawatts)',
                  12000, 27000);


  });

  let windData = d3.csv('CA_June_Wind_Generation.csv').then(function (data) {

    makeLineChart('#wind-graph',
                  'Wind Output',
                  data,
                  ['43252', '43253', '43254', '43255', '43256', '43257', '43258', '43259', '43260', '43261', '43262', '43263', '43264', '43265', '43266'],
                  ['#2A91D4', '#2A91D4', '#2A91D4', '#2A91D4', '#2A91D4', '#2A91D4', '#2A91D4', '#2A91D4', '#2A91D4', '#2A91D4', '#2A91D4', '#2A91D4', '#2A91D4', '#2A91D4', '#2A91D4', '#2A91D4', '#2A91D4', '#2A91D4', '#2A91D4', '#2A91D4', '#2A91D4', '#2A91D4', '#2A91D4', '#2A91D4'],
                  false,
                  ['0', '1000', '2000', '3000', '4000', '5000'],
                  'Time of Day',
                  'Load (Megawatts)',
                  0, 5000);
  });


});
