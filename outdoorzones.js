// Kreiraj HTML strukturu tabele
var tableHtml = '<div id="areaTablePopup"'

// Dodaj tabelu na mapu kao HTML element
var tablePopup = L.popup()
    .setContent(tableHtml);

map.on('load', function () {
    tablePopup.setLatLng(map.getBounds().getSouthWest());
    tablePopup.openOn(map);
});
// Učitaj podatke i popuni tabelu
$.getJSON("./json/areazones.json", function(jsonData) {
    var tableContent = "<table>";
    tableContent += "<tr><th>Areas</th><th>Clients</th></tr>";

    jsonData.forEach(function(entity) {
        var name = entity.name;
        var numClients = entity.num_clients;

        tableContent += "<tr><td>" + name + "</td><td>" + numClients + "</td></tr>";
    });

    tableContent += "</table>";

    $("#areaTableContainer").html(tableContent);
});
