



function makePieChart(svgID, data, pieColors, caption) {
  let container = d3.select(svgID).append('svg').data([data]).append('g').attr('transform', 'translate(' + 150 + ',' + 150 + ')');
  let pie = d3.pie().value(function(d) { return d.value; });
  let arc = d3.arc().innerRadius(0).outerRadius(150);

  let slices = container.selectAll('slice')
    .data(pie).enter()
    .append('g');

  slices.append('path')
    .attr('fill', function(d, i) { return pieColors[i] })
    .attr('d', arc);

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
