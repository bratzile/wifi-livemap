    $.getJSON("./json/outdoorclients.json", function(json1) {
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