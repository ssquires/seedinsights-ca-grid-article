$(document).ready(function() {
  drawMaps();
  makePieChart('#pie-present', presentDayData, '2017 (not real numbers)');
  makePieChart('#pie-future', futureData, '2045 (also not real numbers)');
});
