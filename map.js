var mapWidth = 5046;
var mapHeight = 7134;

var map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -2,
    maxBounds: [[-mapHeight, 0], [mapHeight*2, mapWidth*2]],
}).setView([mapHeight / 2, mapWidth / 2], -2);

L.imageOverlay('https://www.aeroaccess.de/wp-content/uploads/2023/08/ocm-floormap-2.png',
    [[0, 0], [mapHeight, mapWidth]]).addTo(map);





