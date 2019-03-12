


const duckData = [
  [0, 21.5],
  [3.8, 19],
  [7.5, 19.5],
  [8.5, 19.1],
  [13.5, 12],
  [16.5, 13],
  [19.5, 25],
  [20, 26.5],
  [23.5, 22.5]
]

const gasData = [
  [1, 21.5],
  [4.8, 19],
  [8.5, 19.5],
  [9.5, 19.1],
  [14.5, 12],
  [17.5, 13],
  [20.5, 25],
  [21, 26.5],
  [24.5, 22.5]
]

const solarData = [
  [0, 9],
  [3, 9],
  [6, 9],
  [8, 10],
  [10, 15],
  [15, 18],
  [18, 10],
  [20, 9],
  [24, 9]
]

const windData = [
  [0, 10],
  [3, 18],
  [6, 11],
  [9, 19],
  [12, 10],
  [15, 18],
  [18, 10],
  [21, 19],
  [24, 10]
];

const xLabels = ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'];


function makeLineChart(containerID,
                       chartTitle,
                       dataset,
                       columns,
                       dataColors,
                       drawPoints=false,
                       yLabels=[],
                       xAxisTitle,
                       yAxisTitle,
                       yStart=0,
                       yEnd=30000) {
  let xAxisLevel = 200;
  let xLength = 400;
  let yAxisLevel = 0;
  let yLength = 200;
  let xStart = 0;
  let xEnd = 24;

  // Make svg element
  let chart = d3.select(containerID).append('svg')
    .attr('viewBox', '-50 -50 ' + (xLength + 50) + ' ' + (yLength + 100))
    .attr('width', '100%')
    .attr('height', '100%');

  // Make chart title
  let titleText = chart.append('text')
    .html(chartTitle)
    .attr('font-size', 20)
    .attr('font-family', 'Open Sans');
  let bbox = titleText.node().getBBox();
  titleText.attr('x', xLength / 2 - bbox.width / 2);

  // Make x-axis title
  let xText = chart.append('text')
    .html(xAxisTitle)
    .attr('font-size', 16)
    .attr('font-family', 'Open Sans')
    .attr('y', xAxisLevel + 45);
  let xbbox = xText.node().getBBox();
  xText.attr('x', xLength / 2 - xbbox.width / 2);

  // Make y-axis title
  let yText = chart.append('text')
    .html(yAxisTitle)
    .attr('font-size', 16)
    .attr('font-family', 'Open Sans')
    .attr('transform', 'rotate(270)');
  let ybbox = yText.node().getBBox();
  if (yLabels.length > 0) {
    yText.attr('y', '-40');
  } else {
    yText.attr('y', '-10');
  }
  yText.attr('x', -(xAxisLevel - yLength / 2 + ybbox.width / 2));

  // Draw x axis
  chart.append('line')
    .attr('x1', xStart - 5)
    .attr('y1', xAxisLevel)
    .attr('x2', xStart + xLength)
    .attr('y2', xAxisLevel)
    .attr('stroke', 'black')
    .attr('stroke-width', '1');

  // Draw x ticks and labels
  let spaceBetweenTicks = xLength / xLabels.length;
  for (let i = 0;  i < xLabels.length; i++) {
    chart.append('line')
      .attr('x1', xStart + i * spaceBetweenTicks)
      .attr('y1', xAxisLevel - 5)
      .attr('x2', xStart + i * spaceBetweenTicks)
      .attr('y2', xAxisLevel + 5)
      .attr('stroke', 'black')
      .attr('stroke-width', '1');

    chart.append('text')
      .html(xLabels[i])
      .attr('x', xStart + i * spaceBetweenTicks - 13)
      .attr('y', xAxisLevel + 20)
      .attr('font-size', 14)
      .attr('font-family', 'Open Sans');
  }

  // Draw y axis
  chart.append('line')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', 0)
    .attr('y2', 205)
    .attr('stroke', 'black')
    .attr('stroke-width', '1');

  // Draw y ticks and labels
  spaceBetweenTicks = yLength / (yLabels.length - 1);
  for (let i = 0; i < yLabels.length; i++) {
    chart.append('line')
      .attr('x1', yAxisLevel - 5)
      .attr('x2', yAxisLevel + 5)
      .attr('y1', xAxisLevel - i * spaceBetweenTicks)
      .attr('y2', xAxisLevel - i * spaceBetweenTicks)
      .attr('stroke', 'black')
      .attr('stroke-width', '1');

    chart.append('text')
      .html(yLabels[i])
      .attr('x', yAxisLevel - 30)
      .attr('y', xAxisLevel - i * spaceBetweenTicks + 5)
      .attr('font-size', 14)
      .attr('font-family', 'Open Sans');
  }

  // Make curve data for each column we want to include
  for (let j = 0; j < columns.length; j++) {
    curveData = [];
    let fillColor = dataColors[j];
    for (let row of dataset) {
      dataX = (row['Hour'] / (xEnd - xStart)) * xLength + yAxisLevel;
      dataY = xAxisLevel - yLength * ((row[columns[j]] - yStart) / (yEnd - yStart));
      curveData.push([dataX, dataY]);
    }

    let makeCurve = d3.line().curve(d3.curveCatmullRom);
    let path = makeCurve(curveData);
    chart.append('path').attr('d', path)
      .attr('fill', 'none')
      .attr('stroke', fillColor)
      .attr('stroke-width', '2');

    // Draw circles on each data point
    if (drawPoints) {
      for (var i = 0; i < data.length; i++) {
        chart.append('circle')
          .attr('cx', data[i][0])
          .attr('cy', data[i][1])
          .attr('r', 4)
          .attr('fill', fillColor);
      }
    }
  }
}
