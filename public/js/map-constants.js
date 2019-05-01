const mapWidth = 270, mapHeight = 270;
const scale = 1215;
const projection = d3.geoMercator()
                .center([-117, 37.6])
                .scale(scale)
                .translate([mapWidth/2 + 15, mapHeight/2 - 15]);

const nodeOpacity = '99';


const colors = {'.solar': '#FCF65E',
                '.wind': '#68CF6A',
                '.renewable': '#00A28A',
                '.gas': '#BBBBBB',
                'unselected': '#555'
               }
