let map;
let markerClickCounter = 0;
let markers = [];
let infoWindows = [];

window.onload = function() {
    loadScript('initMap');
};

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: {lat: 44.419565, lng: 26.103945}
    });
    loadLocations();
}


function loadLocations() {
    fetch('http://localhost:3000/api/locations')
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                addMarkers(data);
            } else {
                console.error('Invalid location data');
            }
        })
        .catch(error => console.error('Error loading location data:', error));
}


function addMarkers(locations) {
    locations.forEach(function(location) {
        var marker = new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: map,
            title: location.address
        });

        var infowindow = new google.maps.InfoWindow({
            content: "<b>Adresa: </b>"+ location.address + "<br><b>Anul constructiei: </b>" + location.yearOfConstruction +
                "<br><b>Anul expertizei: </b>" + location.yearOfExpertise + "<br><b>Numarul de apartamente: </b>" +
                location.numberOfApartments + "<br><b>Riscul seismic: </b>" + location.seismicRisk
        });

        marker.addListener('click', function() {
            infowindow.open(map, marker);


            updateInfoBoxContent(location);

            if (window.currentCircle) {
                window.currentCircle.setMap(null);
            }

            window.currentCircle = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.4,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.1,
                map: map,
                center: location,
                radius: 50
            });
            markerClickCounter++;
        });


        markers.push(marker);
        infoWindows.push(infowindow);

        map.addListener('click', function(event) {
            if (!isMarkerClicked(event)) {
                clearInfoBoxContent();
            }
            if (window.currentCircle) {
                window.currentCircle.setMap(null);
                window.currentCircle = null;
            }
            if (infowindow) {
                infowindow.close();
            }
        });

    });
}

function isMarkerClicked(event) {
    for (var i = 0; i < markers.length; i++) {
        if (markers[i].getPosition().equals(event.latLng)) {
            return true;
        }
    }
    return false;
}



function updateInfoBoxContent(location) {
    var infoBox = document.getElementById('info-box');

    var markerInfoDiv = document.createElement('div');
    markerInfoDiv.innerHTML = "<b>Adresa: </b>" + location.address +
        "<br><b>Anul constructiei: </b>" + location.yearOfConstruction +
        "<br><b>Anul expertizei: </b>" + location.yearOfExpertise +
        "<br><b>Numarul de apartamente: </b>" + location.numberOfApartments +
        "<br><b>Riscul seismic: </b>" + location.seismicRisk;

    infoBox.appendChild(markerInfoDiv);

    markerClickCounter++;
}
function clearInfoBoxContent() {
    markerClickCounter = 0;

    var infoBox = document.getElementById('info-box');
    infoBox.innerHTML = "";
}

function closeAllInfoWindows() {
    infoWindows.forEach(infoWindow => infoWindow.close());
}

function loadScript(callback) {
    fetch('http://localhost:3000/api/maps-api-key')
        .then(response => response.json())
        .then(data => {
            const API_KEY = data.key;
            console.log(data.key);
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&loading=async&callback=` + callback;
            document.body.appendChild(script);
        })
        .catch(error => console.error('Error loading Google Maps:', error));
}