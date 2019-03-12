function drawMaps() {
  let data = d3.json('california.json').then(function (data) {
    // Path Generator to draw regions on map
    let path = d3.geoPath().projection(projection);

    parseDataFile('present', '#map-present', 'grid-data.csv');

    d3.select('#graph-map-1').selectAll('.ca')
        .data(data)
        .enter().append('path')
        .attr('d', path)
        .attr("stroke", "#BBB")
        .attr("stroke-width", "0.8px")
        .attr("fill", "#F5F5F5");
    makeLegend('#graph-map-1', 50, 210);
    parseDataFile('map-1', '#graph-map-1', 'placeholders_nodes.csv', 'none', 'placeholders_lines.csv', false);

    d3.select('#graph-map-2-risk').selectAll('.ca')
        .data(data)
        .enter().append('path')
        .attr('d', path)
        .attr("stroke", "#BBB")
        .attr("stroke-width", "0.8px")
        .attr("fill", "#F5F5F5");
    makeLegend('#graph-map-2-risk', 50, 210);
    parseDataFile('map-2', '#graph-map-2-risk', 'placeholders_nodes.csv', 'none', 'placeholders_lines.csv', true);

    d3.select('#graph-map-3-bad-config').selectAll('.ca')
        .data(data)
        .enter().append('path')
        .attr('d', path)
        .attr("stroke", "#BBB")
        .attr("stroke-width", "0.8px")
        .attr("fill", "#F5F5F5");
    makeLegend('#graph-map-3-bad-config', 50, 210);
    parseDataFile('map-3', '#graph-map-3-bad-config', 'placeholders_nodes_bad_config.csv', 'none', 'placeholders_lines_bad_config.csv', true);

    d3.select('#graph-map-4-good-config').selectAll('.ca')
        .data(data)
        .enter().append('path')
        .attr('d', path)
        .attr("stroke", "#BBB")
        .attr("stroke-width", "0.8px")
        .attr("fill", "#F5F5F5");
    makeLegend('#graph-map-4-good-config', 50, 210);
    parseDataFile('map-4', '#graph-map-4-good-config', 'placeholders_nodes_good_config.csv', 'none', 'placeholders_lines_good_config.csv', true);

    d3.select('#blackout').selectAll('.ca')
      .data(data)
      .enter().append('path')
      .attr('d', path)
      .attr("stroke", "#445")
      .attr("stroke-width", "0.8px")
      .attr("fill", "#445");
    parseBlackoutDataFile('blackout', '#blackout', 'blackoutnodes.csv', 'blackoutlines.csv');
  });


}
