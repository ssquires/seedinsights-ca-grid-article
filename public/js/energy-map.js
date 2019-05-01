let tooltip = d3.select("body")
		      .append("div")
    		  .attr("class", "tooltip")
    		  .style("opacity", 1)
              .style("border-radius", "8px");

function parseDataFile(idPrefix, svgID, dataFile, filterTo='none', edgeDataFile='none', weightedEdges=true) {
	let nodeList = [];
	d3.csv(dataFile).then(function(data) {
		let i = 0;
		for (let nodeData of data) {
				node = {};
				if (nodeData['node number']) {
					node['id'] = idPrefix + nodeData['node number'];
				} else {
					node['id'] = idPrefix + i;
					i++;
				}
				node['long'] = nodeData['X (longitude)'];
				node['lat'] = nodeData['Y (latitude)'];

				if(nodeData['load']) {
					node['load'] = nodeData['load'];
				} else {
					node['load'] = '';
				}

				if (nodeData['Solar']) {
					node['solar'] = nodeData['Solar'];
				} else {
					node['solar'] = nodeData['solar'];
				}

				if (nodeData['Wind']) {
					node['wind'] = nodeData['Wind'];
				} else {
					node['wind'] = nodeData['wind'];
				}

				if (nodeData['Other']) {
					node['other'] = nodeData['Other'];
				} else {
					node['other'] = nodeData['other'];
				}

				if (nodeData['description']) {
					node['description'] = nodeData['description'];
				} else {
					node['description'] = '';
				}

				if (nodeData['Total generation']) {
					node['total_output'] = nodeData['Total generation'];
				} else {
					node['total_output'] = Number(node['solar']) + Number(node['wind']) + Number(node['other'])
				}

				let solar = node['solar'], wind = node['wind'], other = node['other'];
				if (solar > Math.max(wind, other)) {
					node['class'] = 'solar node';
				} else if (wind > Math.max(solar, other)) {
					node['class'] = 'wind node';
				} else {
					node['class'] = 'other node';
				}
				if (node['load'] < 0) {
					node['class'] = 'city node';
				}

				nodeList.push(node);
		}
		makeNodes(svgID, nodeList);
		// Make chart title

		if (edgeDataFile !== 'none') {
				d3.csv(edgeDataFile).then(function(data) {
					let edgeList = [];

					for (let edgeData of data) {
						let edge = {};
						edge['id'] = idPrefix + 'Edge' + edgeData['Line number'];
						edge['from'] = idPrefix + edgeData['From node #'];
						edge['to'] = idPrefix + edgeData['To node #'];
						edge['value'] = edgeData['Value'];
						edgeList.push(edge);
					}
					makeEdges(svgID, edgeList, weightedEdges);
				});
		}
	});
}

function parseBlackoutDataFile(idPrefix, svgID, dataFile, edgeDataFile) {
	let nodeList = [];
	d3.csv(dataFile).then(function(data) {
		let i = 0;
		for (let nodeData of data) {
				node = {};
				if (nodeData['node number']) {
					node['id'] = idPrefix + nodeData['node number'];
				} else {
					node['id'] = idPrefix + i;
					i++;
				}
				node['long'] = nodeData['X (longitude)'];
				node['lat'] = nodeData['Y (latitude)'];
				nodeList.push(node);
		}

		d3.select(svgID).selectAll('.node')
	        .data(nodeList)
	        .enter().append('circle')
					.attr('id', function (d) { return d['id']})
					.attr('class', 'blackout_node')
	        .attr('cx', function (d) { return d['long']})
	        .attr('cy', function (d) { return d['lat']})
	        .attr('r', 0.02)
					.attr('stroke-width', '0')
					.attr('fill-opacity', '0')
					.attr('stroke-opacity', '1')
					.attr('fill', '#333');

		if (edgeDataFile !== 'none') {
				d3.csv(edgeDataFile).then(function(data) {
					let edgeList = [];

					for (let edgeData of data) {
						let edge = {};
						edge['id'] = idPrefix + 'Edge' + edgeData['Line number'];
						edge['from'] = idPrefix + edgeData['From node #'];
						edge['to'] = idPrefix + edgeData['To node #'];
						edge['class'] = 'blackout_edge';

						let allStages = edgeData['Stage 1'] + edgeData['Stage 2'] +
								edgeData['Stage 3'] + edgeData['Stage 4'] + edgeData['Stage 5'];
						let failureStage = allStages.indexOf('0') + 1;

						edge['class'] += ' stage' + failureStage + '_0';


						let fromNode = d3.select('#' + edge['from']);
						let toNode = d3.select('#' + edge['to']);

						if (failureStage > 0) {
							if (failureStage == 2) {
								if (!fromNode.classed('node_stage1_0')) {
									fromNode.classed('node_stage' + failureStage + '_0', true);
								}
								if (!toNode.classed('node_stage1_0')) {
									toNode.classed('node_stage' + failureStage + '_0', true);
								}
							}
							if (failureStage == 3) {
								if (!fromNode.classed('node_stage1_0') && !fromNode.classed('node_stage2_0')) {
									fromNode.classed('node_stage' + failureStage + '_0', true);
								}
								if (!toNode.classed('node_stage1_0') && !toNode.classed('node_stage2_0')) {
									toNode.classed('node_stage' + failureStage + '_0', true);
								}
							}
							if (failureStage == 4) {
								if (!fromNode.classed('node_stage1_0') && !fromNode.classed('node_stage2_0') && !fromNode.classed('node_stage3_0')) {
									fromNode.classed('node_stage' + failureStage + '_0', true);
								}
								if (!toNode.classed('node_stage1_0') && !toNode.classed('node_stage2_0') && !toNode.classed('node_stage3_0')) {
									toNode.classed('node_stage' + failureStage + '_0', true);
								}
							}
							if (failureStage == 5) {
								if (!fromNode.classed('node_stage1_0') && !fromNode.classed('node_stage2_0') && !fromNode.classed('node_stage3_0') && !fromNode.classed('node_stage4_0')) {
									fromNode.classed('node_stage' + failureStage + '_0', true);
								}
								if (!toNode.classed('node_stage1_0') && !toNode.classed('node_stage2_0') && !toNode.classed('node_stage3_0') && !toNode.classed('node_stage4_0')) {
									toNode.classed('node_stage' + failureStage + '_0', true);
								}
							}


							if (failureStage < 5) {
								fromNode.classed('node_stage5_0', false);
								toNode.classed('node_stage5_0', false);
							}
							if (failureStage < 4) {
								fromNode.classed('node_stage4_0', false);
								toNode.classed('node_stage4_0', false);
							}
							if (failureStage < 3) {
								fromNode.classed('node_stage3_0', false);
								toNode.classed('node_stage3_0', false);
							}
							if (failureStage < 2) {
								fromNode.classed('node_stage2_0', false);
								toNode.classed('node_stage2_0', false);
							}
						}
						edgeList.push(edge);
					}



					d3.select(svgID).selectAll('.edge')
								.data(edgeList)
								.enter().append('line')
								.attr('id', function (d) { return d['id']})
								.attr('class', function (d) { return d['class']})
								.attr('x1', function (d) { return $('#' + d['from']).attr('cx')})
								.attr('y1', function (d) { return $('#' + d['from']).attr('cy')})
								.attr('x2', function (d) { return $('#' + d['to']).attr('cx')})
								.attr('y2', function (d) { return $('#' + d['to']).attr('cy')})
								.attr('stroke-width', '0.02px')
								.attr('stroke', 'white');

						setInterval(cycleBlackout, 2500);

						let stagesText = ['A blackout can start with the failure of a single line.',
															'As power redistributes through the grid, more lines overload and fail.',
															'These failures in turn cause more failures, and large areas can lose power.'];
						for (let i = 0; i < stagesText.length; i++) {
							d3.select(svgID)
								.append('text')
								.attr('id', idPrefix + '_text' + i)
								.attr('class', idPrefix + '_text')
								.html(stagesText[i])
								.attr('x', -0.2)
								.attr('y', -2.3)
								.attr('w', 0.5)
								.style('text-anchor', 'middle')
								.style('font', '0.15px Libre Franklin')
								.style('fill', '#333')
						}

						d3.select('#' + idPrefix + '_text0').raise().style('fill', 'white');
				});


		}
	});
}

function makeNodes(svgID, data) {
  	// Create a circle on the map for each node.
	  d3.select(svgID).selectAll('.node')
	        .data(data)
	        .enter().append('circle')
					.attr('id', function (d) { return d['id']})
					.attr('class', function (d) { return d['class']})
	        .attr('cx', function (d) { return projection([d['long'], d['lat']])[0]})
	        .attr('cy', function (d) { return projection([d['long'], d['lat']])[1]})
	        .attr('r', function (d) { return 3; })
					.attr('stroke-width', '0.8px')
					.attr('fill-opacity', '1')
					.attr('stroke-opacity', '1');
}

function makeEdges(svgID, data, weightedEdges) {
	d3.select(svgID).selectAll('.edge')
				.data(data)
				.enter().append('line')
				.attr('id', function (d) { return d['id']})
				.attr('class', function (d) {
					let r = d['value'];
					if (!weightedEdges) {
						return 'edge';
					}
					if (r >= 0.9) {
						return 'risk_90 edge';
					} else if (r >= 0.8) {
						return 'risk_80 edge';
					} else if (r >= 0.7) {
						return 'risk_70 edge';
					} else if (r >= 0.6) {
						return 'risk_60 edge';
					} else if (r >= 0.5) {
						return 'risk_50 edge';
					} else if (r >= 0.4) {
						return 'risk_40 edge';
					} else if (r >= 0.3) {
						return 'risk_30 edge';
					} else if (r >= 0.2) {
						return 'risk_20 edge';
					} else if (r >= 0.1) {
						return 'risk_10 edge';
					} else {
						return 'risk_00 edge';
					}
				})
				.attr('x1', function (d) { return $('#' + d['from']).attr('cx')})
				.attr('y1', function (d) { return $('#' + d['from']).attr('cy')})
				.attr('x2', function (d) { return $('#' + d['to']).attr('cx')})
				.attr('y2', function (d) { return $('#' + d['to']).attr('cy')})
				.attr('stroke-width', '1.5px');

		// Raise nodes to be drawn on top of edges, and put everything below
		// additional annotations.
		d3.select(svgID).selectAll('.node').lower();
		d3.select(svgID).selectAll('.edge').lower();
		d3.select(svgID).selectAll('path').lower();

}

function addTitle(svgID, title) {
	let titleText = d3.select(svgID).append('text')
		.html(title)
		.attr('font-size', 18)
		.attr('font-family', 'Open Sans')
		.attr('class', 'title');
	let bbox = titleText.node().getBBox();
	let viewBox = d3.select(svgID).attr('viewBox').split(' ')
	let totalWidth = Number(viewBox[2]) / 2 + Number(viewBox[0])
	titleText.attr('x', totalWidth - bbox.width / 2);
	titleText.attr('y', -20);
}

let blackoutStage = 1;
function cycleBlackout() {
	d3.selectAll('.stage' + blackoutStage + '_0').lower();
	$('.stage' + blackoutStage + '_0').css('stroke', 'red');
	setTimeout(function() {
		$('.stage' + blackoutStage + '_0').css('stroke', '#333');

		if (blackoutStage == 1) {
			d3.select('#blackout_text0').raise().transition().style('fill', 'white').duration(500);
		} else if (blackoutStage == 2) {
			d3.select('#blackout_text0').transition().style('fill', '#333').duration(500);
			setTimeout(function() {d3.select('#blackout_text1').raise().transition().style('fill', 'white').duration(500)}, 500);
		} else if (blackoutStage == 4) {
			d3.select('#blackout_text1').transition().style('fill', '#333').duration(500);
			setTimeout(function() {d3.select('#blackout_text2').raise().transition().style('fill', 'white').duration(500)}, 500);
		}
		if (blackoutStage == 6) {
			blackoutStage = 0;
			$('.blackout_edge').css('stroke', 'white');
			d3.select('#blackout_text2').transition().style('fill', '#333').duration(500);
		}
		blackoutStage++;
	}, 500);





}

function makeLegend(svgID, legendX, legendY) {
	let legend = {'Solar': {'class': 'solar'},
						'Wind': {'class': 'wind'},
						'Cities, Other': {'class': 'other'}};
	let x = legendX, y = legendY
	for (let source in legend) {
		let group = d3.select(svgID).append('g')
			.attr('id', legend[source]['id'])

		group.append('rect')
			.attr('fill', '#EEE')
			.attr('x', x - 5)
			.attr('y', y - 5)
			.attr('width', 80)
			.attr('height', 40);

			group.append('rect')
				.attr('class', legend[source]['class'])
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
