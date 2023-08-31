// Kreiraj HTML strukturu tabele
var tableHtml = '<div id="areaTablePopup" style="position: absolute; bottom: 20px; left: 20px; background-color: white; border: 1px solid #ccc; padding: 10px; z-index: 1000;font-family:Verdana;">' +
    '<div id="areaTable"></div>' +
    '</div>';

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
    tableContent += "<tr><th>Zone Area</th><th>Clients</th></tr>";

    jsonData.forEach(function(entity) {
        var name = entity.name;
        var numClients = entity.num_clients;

        tableContent += "<tr><td>" + name + "</td><td>" + numClients + "</td></tr>";
    });

    tableContent += "</table>";

    $("#areaTableContainer").html(tableContent);
});
