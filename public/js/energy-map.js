var tooltip = d3.select("body")
		      .append("div")
    		  .attr("class", "tooltip")
    		  .style("opacity", 1)
              .style("border-radius", "8px");

let svg;

function makeNodes(svgID) {
  let data = d3.csv('grid-data.csv').then(function(data) {
		svg = svgID;
  	// Create a circle on the map for each node.
	  d3.select(svgID).selectAll('.node')
	        .data(data.filter(function(d) {
	            return Number(d['Total generation']) >= 15.0;
	        }))
	        .enter().append('circle')
					.attr('class', function (d) {
						let solar = d['Solar'], wind = d['Wind'], cf = d['Carbon free (includes biomass)'], nr = d['Non-renewables'];
						if (solar > Math.max(wind, cf, nr)) {
							return 'solar node';
						} else if (wind > Math.max(solar, cf, nr)) {
							return 'wind node';
						} else if (cf > Math.max(solar, wind, nr)) {
							return 'renewable node';
						} else {
							return 'gas node';
						}
					})
	        .attr('cx', function (d) { return projection([d['X (longitude)'], d['Y (latitude)']])[0]})
	        .attr('cy', function (d) { return projection([d['X (longitude)'], d['Y (latitude)']])[1]})
	        .attr('r', function (d) { return Math.log(d['Total generation']) / 1.5})
	        .attr('fill', function (d) {
						let solar = d['Solar'], wind = d['Wind'], cf = d['Carbon free (includes biomass)'], nr = d['Non-renewables'];
						if (solar > Math.max(wind, cf, nr)) {
							return colors['.solar'];
						} else if (wind > Math.max(solar, cf, nr)) {
							return colors['.wind'];
						} else if (cf > Math.max(solar, wind, nr)) {
							return colors['.renewable'];
						} else {
							return colors['.gas'];
						}
	        })
	        .attr('stroke',  function (d) {
	            let solar = d['Solar'], wind = d['Wind'], cf = d['Carbon free (includes biomass)'], nr = d['Non-renewables'];
							if (solar > Math.max(wind, cf, nr)) {
								return colors['.solar'];
							} else if (wind > Math.max(solar, cf, nr)) {
								return colors['.wind'];
							} else if (cf > Math.max(solar, wind, nr)) {
								return colors['.renewable'];
							} else {
								return colors['.gas'];
							}
	        })
					.attr('stroke-width', '0.8px')
					.attr('fill-opacity', '0.65')
					.attr('stroke-opacity', '0.85')
	        .on('mouseover', nodeMouseover)
					.on('mouseout', nodeMouseout);
	});
}

function nodeMouseover(d) {
	// Determine class of nodes to select
	let nodeClass;
	if (this.classList.contains('solar')) {
		selectClass('.solar');
	} else if (this.classList.contains('wind')) {
		selectClass('.wind');
	} else if (this.classList.contains('renewable')) {
		selectClass('.renewable');
	} else {
		selectClass('.gas');
	}


}

function nodeMouseout(d) {
	if (this.classList.contains('solar')) {
		unselectClass('.solar');
	} else if (this.classList.contains('wind')) {
		unselectClass('.wind');
	} else if (this.classList.contains('renewable')) {
		unselectClass('.renewable');	}
	else {
		unselectClass('.gas');
	}
}

function selectClass(className) {

	// Gray out other nodes
	for (let nodeClass of ['.solar', '.wind', '.renewable', '.gas']) {
		if (nodeClass != className) {
			d3.select(svg).selectAll(nodeClass).transition('gray').duration(300)
				.attr('fill', colors['unselected'])
				.attr('stroke', colors['unselected']);
		}
	}

	// Make selected node class larger
	d3.select(svg).selectAll(className).raise();
	d3.select(svg).selectAll(className).transition('big').duration(300)
		.attr('r', function(d) {return Math.log(d['Total generation'])});
}

function unselectClass(className) {

	// Turn all nodes back to their original colors
	for (let nodeClass of ['.solar', '.wind', '.renewable', '.gas']) {
		d3.select(svg).selectAll(nodeClass).transition('color').duration(300)
			.attr('fill', colors[nodeClass])
			.attr('stroke', colors[nodeClass]);
	}


	// Make unselected node class smaller
	d3.select(svg).selectAll(className).transition('small').duration(300)
		.attr('r', function(d) {return Math.log(d['Total generation']) / 1.5});
}

function makeLegend(svgID, legendX, legendY) {
	let legend = {'Solar': {'color': colors['.solar'], 'id': 'solar'},
						'Wind': {'color': colors['.wind'], 'id': 'wind'},
						'Other Renewables': {'color': colors['.renewable'], 'id': 'renewable'},
					  'Natural Gas': {'color': colors['.gas'], 'id': 'gas'}};
	let x = legendX, y = legendY
	for (let source in legend) {
		let group = d3.select(svgID).append('g')
			.attr('id', legend[source]['id'])


			group.append('rect')
				.attr('id', legend[source]['id'])
				.attr('fill', legend[source]['color'])
				.attr('stroke', colors['unselected'])
				.attr('stroke-width', 0.8)
				.attr('width', 10)
				.attr('height', 10)
				.attr('x', x)
				.attr('y', y);;

		group.append('text')
			.html(source)
			.attr('x', x + 15)
			.attr('y', y + 9)
			.attr('font-size', 10)
			.attr('font-family', 'Open Sans');
			y += 15;
	}
}
