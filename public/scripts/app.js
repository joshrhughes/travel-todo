console.log("hello");
// mapboxgl.accessToken = 'pk.eyJ1Ijoiam9zaHJodWdoZXMiLCJhIjoiY2pjMTJ3aWJ1MDNrNDMzczRxeXlveWtlbCJ9.AJ6NBubcPSNerFsvC4HB2g';
// var map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/outdoors-v10'
// });


// mapboxgl.accessToken = 'pk.eyJ1Ijoiam9zaHJodWdoZXMiLCJhIjoiY2pjMTJ3aWJ1MDNrNDMzczRxeXlveWtlbCJ9.AJ6NBubcPSNerFsvC4HB2g';
// var map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/streets-v9',
//     center: [-79.4512, 43.6568],
//     zoom: 13
// });

// map.addControl(new MapboxGeocoder({
//     accessToken: mapboxgl.accessToken
// }));

// map.on('mousemove', function (e) {
//     document.getElementById('info').innerHTML =
//         // e.point is the x, y coordinates of the mousemove event relative
//         // to the top-left corner of the map
//         JSON.stringify(e.point) + '<br />' +
//         // e.lngLat is the longitude, latitude geographical position of the event
//         JSON.stringify(e.lngLat);
// });


 mapboxgl.accessToken = 'pk.eyJ1Ijoiam9zaHJodWdoZXMiLCJhIjoiY2pjMTJ3aWJ1MDNrNDMzczRxeXlveWtlbCJ9.AJ6NBubcPSNerFsvC4HB2g';
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/joshrhughes/cjcdhc3ds3kcc2sqm67x5dw2q',
            center: [-96, 37.8],
            zoom: 3
        });
          // Add geolocate control to the map.
            map.addControl(new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true
            }));
        // Adds long lat stuff
        // map.on('click', function (e) {
        //     var features = map.queryRenderedFeatures(e.point);
        //     document.getElementById('features').innerHTML = JSON.stringify(features, null, 2);
        // });

        map.on('click', function (e) {
                document.getElementById('features').innerHTML =
                    // e.point is the x, y coordinates of the mousemove event relative
                    // to the top-left corner of the map
                    JSON.stringify(e.point) + '<br />' +
                    // e.lngLat is the longitude, latitude geographical position of the event
                    JSON.stringify(e.lngLat);
            });

        // Adds search bar
        map.addControl(new MapboxGeocoder({
                accessToken: mapboxgl.accessToken
            }));
