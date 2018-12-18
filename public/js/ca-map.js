function drawMaps() {
  d3.json('california.json', function(err, data) {
    makeMap('#map', data);
    makeNodes('#map');
  });
}


function makeMap(svgID, data) {

  // Path Generator to draw regions on map
  let path = d3.geo.path().projection(projection);

  // Create SVG paths to populate map
  d3.select(svgID).selectAll('.ca')
      .data(data)
      .enter().append('path')
      .attr('d', path)
      .attr("stroke", "#174973")
      .attr("fill", "#174973")
      .attr("stroke-width", "1");
}
