function drawMaps() {
  let data = d3.json('california.json').then(function (data) {
    // Path Generator to draw regions on map
    let path = d3.geoPath().projection(projection);

    // Create SVG paths to populate map
    d3.select('#map').selectAll('.ca')
        .data(data)
        .enter().append('path')
        .attr('d', path)
        .attr("stroke", "#333")
        .attr("stroke-width", "0.8px")
        .attr("fill", "#333");
    makeNodes('#map');
    makeLegend('#map', 160, 50);
  });
}
