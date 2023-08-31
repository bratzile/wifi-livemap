var mapWidth = 5046;
var mapHeight = 7134;

var map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -2,
    maxBounds: [[-mapHeight, 0], [mapHeight*2, mapWidth*2]],
}).setView([mapHeight / 2, mapWidth / 2], -2);

L.imageOverlay('https://www.aeroaccess.de/wp-content/uploads/2023/08/ocm-floormap-2.png',
    [[0, 0], [mapHeight, mapWidth]]).addTo(map);


    $.getJSON("./json/api-1.json", function(json1) {
    for (var i = 0; i < json1.length; i++) {
       var place = json1[i];
       var x = place.x - 100;
       var y = mapHeight - (place.y + 50); // Preokreni y-koordinatu
       var macAddress = place.mac;

       var markerIcon = L.icon({
           iconUrl: './assets/current location.png',
            iconSize: [30, 30],
            iconAnchor: [15, 10],
       });

       var coordinates = [y, x];
        var marker = L.marker(coordinates, { icon: markerIcon });

     marker.bindPopup(macAddress);

      marker.addTo(map);
   }
});

$.getJSON("./json/api-2.json", function(jsonData) {
    $.getJSON("./json/num-site-clients.json", function(clientData) {
        jsonData.forEach(function(entity) {
            var name = entity.name;
            var vertices = entity.vertices;
            var count = 0;

            // Find the matching site_id in clientData and get the count
            var matchingClient = clientData.results.find(function(client) {
                return client.site_id === name;
            });

            if (matchingClient) {
                count = matchingClient.count;
            }

            var coordinates = vertices.map(function(vertex) {
                var flippedX = vertex.x;
                var flippedY = mapHeight - vertex.y;
                return [flippedY, flippedX];
            });

            coordinates.push(coordinates[0]);

            var polygon = L.polygon(coordinates, { color: 'black', fillColor: 'rgba(0, 0, 0, 0.6)' }).addTo(map);

            var popupContent = "<b>" + name + "</b><br>";
            popupContent += "Currently visitors in store: " + count;

            polygon.bindPopup(popupContent);
        });
    });
});

$.getJSON("./json/areazones.json", function(jsonData) {
    jsonData.forEach(function(entity) {
        var name = entity.name;
        var numClients = entity.num_clients;
        var vertices = entity.vertices;

        var coordinates = vertices.map(function(vertex) {
            var flippedX = vertex.x;
            var flippedY = mapHeight - vertex.y;
            return [flippedY, flippedX];
        });

        coordinates.push(coordinates[0]);

        var polygon = L.polygon(coordinates, { color: 'yellow', fillColor: 'rgba(0, 0, 0, 0.6)' }).addTo(map);

        var popupContent = "<b>" + name + "</b><br>";
        popupContent += "Currently visitors in area: " + numClients;

        polygon.bindPopup(popupContent);
    });
});