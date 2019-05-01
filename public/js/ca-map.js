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
    parseDataFile('map-1', '#graph-map-1', 'model_nodes_basic.csv', 'none', 'model_lines_basic.csv', false);
    addTitle('#graph-map-1', 'A Simplified Transmission Network');

    d3.select('#graph-map-2-risk').selectAll('.ca')
        .data(data)
        .enter().append('path')
        .attr('d', path)
        .attr("stroke", "#BBB")
        .attr("stroke-width", "0.8px")
        .attr("fill", "#F5F5F5");
    parseDataFile('map-2', '#graph-map-2-risk', 'model_nodes_basic.csv', 'none', 'model_lines_basic.csv', true);
    addTitle('#graph-map-2-risk', 'Measuring Failure Risk');

    d3.select('#graph-map-3-bad-config').selectAll('.ca')
        .data(data)
        .enter().append('path')
        .attr('d', path)
        .attr("stroke", "#BBB")
        .attr("stroke-width", "0.8px")
        .attr("fill", "#F5F5F5");
    parseDataFile('map-3', '#graph-map-3-bad-config', 'model_nodes_bad.csv', 'none', 'model_lines_bad.csv', true);
    addTitle('#graph-map-3-bad-config', 'A High-Risk Choice');

    d3.select('#graph-map-4-good-config').selectAll('.ca')
        .data(data)
        .enter().append('path')
        .attr('d', path)
        .attr("stroke", "#BBB")
        .attr("stroke-width", "0.8px")
        .attr("fill", "#F5F5F5");
    parseDataFile('map-4', '#graph-map-4-good-config', 'model_nodes_good.csv', 'none', 'model_lines_good.csv', true);
    addTitle('#graph-map-4-good-config', 'A Low-Risk Choice');

    parseBlackoutDataFile('blackout', '#blackout', 'blackoutnodes.csv', 'blackoutlines.csv');
  });


}
