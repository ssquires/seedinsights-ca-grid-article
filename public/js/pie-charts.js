var presentDayData = [
  {'label': 'natural gas', 'value': 40},
  {'label': 'solar and wind', 'value': 30},
  {'label': 'other renewables', 'value': 30}
];

var futureData = [
  {'label': 'natural gas', 'value': 10},
  {'label': 'solar and wind', 'value': 45},
  {'label': 'other renewables', 'value': 45}
];

var colors = ['red', 'green', 'blue'];

function makePieChart(svgID, data, caption) {
  var container = d3.select(svgID).append('svg').data([data]).append('g').attr('transform', 'translate(' + 150 + ',' + 150 + ')');
;
  var pie = d3.layout.pie().value(function(d) { return d.value; });
  var arc = d3.svg.arc().outerRadius(150);

  var slices = container.selectAll('slice')
    .data(pie).enter()
    .append('g');

  slices.append('path')
    .attr('fill', function(d, i) { return colors[i] })
    .attr('d', function(d) { return arc(d) });

  slices.append('text')
      .attr('transform', function(d){
          d.innerRadius = 100;
          d.outerRadius = 150;
          return 'translate(' + arc.centroid(d) + ')';}
      )
      .attr('class', 'pie-label')
      .attr('text-anchor', 'middle')
      .text( function(d, i) {return data[i].value + '%';});

  container.append('text')
    .attr('x', 0)
    .attr('y', 175)
    .attr('width', 300)
    .attr('text-anchor', 'middle')
    .attr('class', 'pie-caption')
    .text(caption);
}
