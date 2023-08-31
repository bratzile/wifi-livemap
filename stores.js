$.getJSON("./json/storezones.json", function(storezonesData) {
    $.getJSON("./json/siteclients.json", function(siteclientsData) {
        $.getJSON("./json/sitenames.json", function(sitenamesData) {
            storezonesData.forEach(function(storezone) {
                var site_id = storezone.name; // Uzmi "name" iz storezonesData kao site_id
                var vertices = storezone.vertices;
                var count = 0;

                // Pronađi odgovarajući "site_id" u siteclientsData i uzmi broj posetilaca
                var matchingClient = siteclientsData.results.find(function(client) {
                    return client.site_id === site_id;
                });

                if (matchingClient) {
                    count = matchingClient.count;
                }

                // Pronađi odgovarajući "realname" u sitenamesData na osnovu "site_id"
                var matchingRealName = sitenamesData.find(function(site) {
                    return site.site_id === site_id;
                });

                var realName = matchingRealName ? matchingRealName.realname : site_id;

                var coordinates = vertices.map(function(vertex) {
                    var flippedX = vertex.x;
                    var flippedY = mapHeight - vertex.y;
                    return [flippedY, flippedX];
                });

                coordinates.push(coordinates[0]);

                var polygon = L.polygon(coordinates, { color: 'black', fillColor: 'rgba(0, 0, 0, 0.6)' }).addTo(map);

                var popupContent = "<b>" + realName + "</b><br>"; // Koristi "realname" umesto "site_id"
                popupContent += "Currently visitors in store: " + count;

                polygon.bindPopup(popupContent);
            });
        });
    });
});
