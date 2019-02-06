const mapWidth = 300, mapHeight = 300;
const scale = 1215;
const projection = d3.geoMercator()
                .center([-119.3, 37.6])
                .scale(scale)
                .translate([mapWidth/2, mapHeight/2]);

const nodeOpacity = '99';


const colors = {'.solar': '#FCF65E',
                '.wind': '#68CF6A',
                '.renewable': '#00A28A',
                '.gas': '#BBBBBB',
                'unselected': '#555'
               }
