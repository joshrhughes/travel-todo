console.log("hello");
$(document).ready(function() {
    console.log("We Ready");
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


/////////////////// here

//  mapboxgl.accessToken = 'pk.eyJ1Ijoiam9zaHJodWdoZXMiLCJhIjoiY2pjMTJ3aWJ1MDNrNDMzczRxeXlveWtlbCJ9.AJ6NBubcPSNerFsvC4HB2g';
//         var map = new mapboxgl.Map({
//             container: 'map',
//             style: 'mapbox://styles/joshrhughes/cjcdhc3ds3kcc2sqm67x5dw2q',
//             center: [-96, 37.8],
//             zoom: 3
//         });
//           // Add geolocate control to the map.
//             map.addControl(new mapboxgl.GeolocateControl({
//                 positionOptions: {
//                     enableHighAccuracy: true
//                 },
//                 trackUserLocation: true
//             }));
//         // Adds long lat stuff
//         // map.on('click', function (e) {
//         //     var features = map.queryRenderedFeatures(e.point);
//         //     document.getElementById('features').innerHTML = JSON.stringify(features, null, 2);
//         // });

//         map.on('click', function (e) {
//                 document.getElementById('features').innerHTML =
//                     // e.point is the x, y coordinates of the mousemove event relative
//                     // to the top-left corner of the map
//                     JSON.stringify(e.point) + '<br />' +
//                     // e.lngLat is the longitude, latitude geographical position of the event
//                     JSON.stringify(e.lngLat);
//             });

//         // Adds search bar
//         map.addControl(new MapboxGeocoder({
//                 accessToken: mapboxgl.accessToken
//             }));




    ////Collecting Place form data and pushing it to db

    $.get('/places', function (places) {
        console.log('response returned');
        console.log(places);
        places.forEach(function (onePlace) {
            renderPlace(onePlace);
        });
    });


    $('#placeForm').on('submit', function(event){
        event.preventDefault();
        console.log(this);
        //console.log(request);
        var formData = $(this).serialize();
        console.log("form data is " + $(this).serialize());
        console.log("the unserialzied data is " + this);
        console.log('formData', formData);
        $(this).trigger("reset");

        $.ajax({
        url: "/places",
        type:"POST",
        data: formData,
        // dataType: String
        }).done(function(stuff){
            console.log(stuff);
            renderPlace(stuff);
            //returns "place" and no idea why
            
        });
    });// end of form submit

    //Rendering Places to Auth Page
    function renderPlace(places){
       console.log("rendering places:", places);

        var placeHtml = 
            "        <!-- Place -->" +
            "          <div class='divPlace"+ places._id +"'>" +
            "             <div>" + places.locName +"</div>" +
            "             <button class='btn btn-default place" + places._id + "'>Been There?</button>" +
            "          </div>"+
            "        <!-- end Place -->";

        // render to the page with jQuery
        $('#userPlaces').append(placeHtml);
    }
    

});//end of .ready()