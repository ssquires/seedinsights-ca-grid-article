function drawMaps() {
  let data = d3.json('california.json').then(function (data) {
    // Path Generator to draw regions on map
    let path = d3.geoPath().projection(projection);

    // Create SVG paths to populate map
    // d3.select('#map-present').selectAll('.ca')
    //     .data(data)
    //     .enter().append('path')
    //     .attr('d', path)
    //     .attr("stroke", "#333")
    //     .attr("stroke-width", "0.8px")
    //     .attr("fill", "#333");
    //makeNodes('#map-present', 'grid-data.csv');
    // makeLegend('#map-present', 160, 50);

    parseDataFile('present', '#map-present', 'grid-data.csv');

    d3.select('#graph-map-1').selectAll('.ca')
        .data(data)
        .enter().append('path')
        .attr('d', path)
        .attr("stroke", "#333")
        .attr("stroke-width", "0.8px")
        .attr("fill", "#333");
    // makeLegend('#graph-map-1', 160, 50);
    parseDataFile('map-1', '#graph-map-1', 'placeholders_nodes.csv', 'placeholders_lines.csv', false);

    d3.select('#graph-map-2-risk').selectAll('.ca')
        .data(data)
        .enter().append('path')
        .attr('d', path)
        .attr("stroke", "#333")
        .attr("stroke-width", "0.8px")
        .attr("fill", "#333");
    // makeLegend('#graph-map-1', 160, 50);
    parseDataFile('map-2', '#graph-map-2-risk', 'placeholders_nodes.csv', 'placeholders_lines.csv', true);

    d3.select('#graph-map-3-bad-config').selectAll('.ca')
        .data(data)
        .enter().append('path')
        .attr('d', path)
        .attr("stroke", "#333")
        .attr("stroke-width", "0.8px")
        .attr("fill", "#333");
    parseDataFile('map-3', '#graph-map-3-bad-config', 'placeholders_nodes_bad_config.csv', 'placeholders_lines_bad_config.csv', true);

    d3.select('#graph-map-4-good-config').selectAll('.ca')
        .data(data)
        .enter().append('path')
        .attr('d', path)
        .attr("stroke", "#333")
        .attr("stroke-width", "0.8px")
        .attr("fill", "#333");
    parseDataFile('map-4', '#graph-map-4-good-config', 'placeholders_nodes_good_config.csv', 'placeholders_lines_good_config.csv', true);

  });


}
