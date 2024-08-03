coordinates = JSON.parse(coordinates);
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 7 // starting zoom
});


// Create a default Marker and add it to the map.
const marker1 = new mapboxgl.Marker({ color: 'red', rotation: 15 })
    .setLngLat(coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25, })
        .setHTML(`<h4>Exact location provided after booking</h4>`))
    .addTo(map);
