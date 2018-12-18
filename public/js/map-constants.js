const mapWidth = 300, mapHeight = 300;
const scale = 1215;
const projection = d3.geo.mercator()
                .center([-119.3, 37.6])
                .scale(scale)
                .translate([mapWidth/2, mapHeight/2]);
