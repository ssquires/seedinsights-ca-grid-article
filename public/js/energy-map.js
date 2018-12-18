var tooltip = d3.select("body")
		      .append("div")
    		  .attr("class", "tooltip")
    		  .style("opacity", 1)
              .style("border-radius", "8px");

function makeTooltipHTML(d) {
    let solar = d['Solar'],
      wind = d['Wind'],
      cf = d['Carbon free (includes biomass)'],
      nr = d['Non-renewables'],
      tg = d['Total generation'];

    var name = d.LakeName + ' (' + d.Name + ')';
    var html = '<p><strong>Solar: </strong>' + solar + '</p>' +
      '<p><strong>Wind: </strong>' + wind + '</p>' +
      '<p><strong>Carbon free: </strong>' + cf + '</p>' +
      '<p><strong>Non-renewables: </strong>' + nr + '</p>' +
      '<p><strong>Total generation: </strong>' + tg+ '</p>';
    return html;
}

function makeNodes(svgID) {
  d3.csv('grid-data.csv', function(error, data) {
    makeMapNodes(svgID, data);
  });
}

function makeMapNodes(svgID, data) {

  // Create a circle on the map for each node.
  d3.select(svgID).selectAll('.node')
        .data(data.filter(function(d) {
            return Number(d['Total generation']) >= 15.0;
        }))
        .enter().append('circle')
        .attr('cx', function (d) { return projection([d['X (longitude)'], d['Y (latitude)']])[0]})
        .attr('cy', function (d) { return projection([d['X (longitude)'], d['Y (latitude)']])[1]})
        .attr('r', function (d) { return Math.log(d['Total generation']) / 2})
        .attr('fill', function (d) {
            let solar = d['Solar'], wind = d['Wind'], cf = d['Carbon free (includes biomass)'], nr = d['Non-renewables'];
            if (solar > Math.max(wind, cf, nr)) {
              return 'yellow';
            } else if (wind > Math.max(solar, cf, nr)) {
              return 'cyan';
            } else if (cf > Math.max(solar, wind, nr)) {
              return 'limegreen';
            } else {
              return 'darkorange';
            }
        })
        .attr('stroke', 'none')
        .on('mouseover', nodeMouseover);
}

function nodeMouseover(d) {
   tooltip.transition().duration(200).style("opacity", 0.9);
    tooltip.html(makeTooltipHTML(d))
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY) - 30 + "px")
            .transition().duration(500)
            .style("opacity", 1)
            .style("pointer-events", "auto");
}
