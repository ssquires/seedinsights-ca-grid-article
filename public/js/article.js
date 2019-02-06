const pieColorsNow = ['#003F5C', '#68CF6A', '#00A28A'];
const pieColorsFuture = ['#00A28A', '#68CF6A'];

const presentDayData = [
  {'label': 'Natural Gas', 'value': 43},
  {'label': 'Renewables', 'value': 30},
  {'label': 'Carbon Neutral', 'value': 27}
];

const futureData = [
  {'label': 'Carbon Neutral', 'value': 40},
  {'label': 'Renewables', 'value': 60}
];

$(document).ready(function() {
  drawMaps();
  makePieChart('#pie-present', presentDayData, pieColorsNow, '2017');
  makePieChart('#pie-future', futureData, pieColorsFuture, '2045');
  makeLineChart('#duck-curve',
                'The Duck Curve',
                [duckData],
                ['black'],
                false,
                ['9,000', '15,000', '21,000', '28,000'],
                'Time of Day',
                'Megawatts');
  makeLineChart('#natural-gas-curve',
                'Natural Gas Production',
                [duckData, gasData],
                ['black', 'red'],
                false,
                [],
                'Time of Day',
                'Energy');
  makeLineChart('#solar-curve',
                'Solar Production',
                [duckData, solarData],
                ['black', 'orange'],
                false,
                [],
                'Time of Day',
                'Energy');
  makeLineChart('#wind-curve',
                'Wind Production',
                [duckData, windData],
                ['black', 'blue'],
                false,
                [],
                'Time of Day',
                'Energy');
});
