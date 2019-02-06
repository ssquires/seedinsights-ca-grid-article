



function makePieChart(svgID, data, pieColors, caption, labelAdjust=0) {
  let container = d3.select(svgID).append('svg').data([data]).append('g').attr('transform', 'translate(' + 100 + ',' + 150 + ')');
  let pie = d3.pie().value(function(d) { return d.value; });
  let arc = d3.arc().innerRadius(0).outerRadius(100);
  let outerArc = d3.arc().innerRadius(130 + labelAdjust).outerRadius(150);

  let slices = container.selectAll('slice')
    .data(pie).enter()
    .append('g');

  slices.append('path')
    .attr('fill', function(d, i) { return pieColors[i] })
    .attr('d', arc);

  slices.append('text')
      .attr('transform', function(d){
          return 'translate(' + arc.centroid(d) + ')';}
      )
      .attr('class', 'pie-label')
      .attr('text-anchor', 'middle')
      .text( function(d, i) { return data[i].value + '%'; });


  container.append('text')
    .attr('x', 0)
    .attr('y', 135)
    .attr('width', 200)
    .attr('text-anchor', 'middle')
    .attr('class', 'pie-caption')
    .attr('font-size', 20)
    .text(caption);

    // Make legend
    let x = 120;
    let y = -20;
    for (let i = 0; i < data.length; i++) {
			container.append('rect')
				.attr('fill', pieColors[i])
				.attr('stroke', pieColors[i])
				.attr('stroke-width', 0.8)
				.attr('width', 10)
				.attr('height', 10)
				.attr('x', x)
				.attr('y', y);

  		container.append('text')
  			.html(data[i].label)
  			.attr('x', x + 15)
  			.attr('y', y + 9)
  			.attr('font-size', 14)
  			.attr('font-family', 'Open Sans');
  			y += 15;
  	}
}
