var map = L.map('map').setView([0, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

var drawControl = new L.Control.Draw({
    edit: {
        featureGroup: drawnItems
    },
    draw: {
        polygon: false,
        polyline: false,
        circle: false,
        circlemarker: false,
        marker: false,
        rectangle: true
    }
});
map.addControl(drawControl);

map.on(L.Draw.Event.CREATED, function (e) {
    var type = e.layerType,
        layer = e.layer;

    if (type === 'rectangle') {
        var bounds = layer.getBounds();
        var llcrnrlat = bounds.getSouthWest().lat;
        var urcrnrlat = bounds.getNorthEast().lat;
        var llcrnrlon = bounds.getSouthWest().lng;
        var urcrnrlon = bounds.getNorthEast().lng;
        
        var formattedCoords = `Lower left coordinates=${llcrnrlat}, ${llcrnrlon}  Upper right coordinates=${urcrnrlat}, ${urcrnrlon}`;

        layer.bindPopup(formattedCoords).openPopup();

        copyToClipboard(formattedCoords);
    }

    drawnItems.addLayer(layer);
});


function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        alert("Rectangle corners copied to clipboard!");
    }, function(err) {
        console.error('Could not copy text: ', err);
    });
}
