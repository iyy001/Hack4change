let map, userMarker, driverMarker;


function initMap() {
    map = L.map('map').setView([12.971581, -6,805], 60);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    userMarker = L.marker([12.97151482820237, 80.0429360438823]).addTo(map).bindPopup('User Location').openPopup();
    driverMarker = L.marker([12.972603371458044, 80.04259247559322]).addTo(map).bindPopup('Driver Location').openPopup();
}

function updateMarkers(userLocation, driverLocation) {
    userMarker.setLatLng([userLocation.lat, userLocation.lng]);
    driverMarker.setLatLng([driverLocation.lat, driverLocation.lng]);

    if (distance(userLocation, driverLocation) < 100) {
        document.getElementById('alerts').style.display = 'block';
    } else {
        document.getElementById('alerts').style.display = 'none';
    }
}

function distance(loc1, loc2) {
    const R = 6371e3; // metres
    const φ1 = loc1.lat * Math.PI / 180;
    const φ2 = loc2.lat * Math.PI / 180;
    const Δφ = (loc2.lat - loc1.lat) * Math.PI / 180;
    const Δλ = (loc2.lng - loc1.lng) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c;
    return d;
}

document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(response => response.text()).then(result => {
        alert(result);
    });
});

function fetchBusSchedule() {
    fetch('/bus/schedule')
        .then(response => response.json())
        .then(data => {
            const busTimingsDiv = document.getElementById('busTimings');
            busTimingsDiv.innerHTML = '';
            data.forEach(schedule => {
                const div = document.createElement('div');
                div.innerHTML ="Bus Number: ${schedule.bus_number}, Route: ${schedule.route}, Timings: ${schedule.timings}";
                busTimingsDiv.appendChild(div);
            });
        });
}

setInterval(() => {
    fetch("/location/get-location?mobile=USER_MOBILE")
        .then(response => response.json())
        .then(data => {
            updateMarkers(data.userLocation, data.driverLocation);
        });
}, 180000); // 3 minutes

initMap();
fetchBusSchedule();