console.log("hello");
$(document).ready(function() {
    console.log("We Ready");
/////////////////// MapBox

 mapboxgl.accessToken = 'pk.eyJ1Ijoiam9zaHJodWdoZXMiLCJhIjoiY2pjMTJ3aWJ1MDNrNDMzczRxeXlveWtlbCJ9.AJ6NBubcPSNerFsvC4HB2g';
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/joshrhughes/cjcw3yogd12ts2rqyup4zmowf',
            // style: 'mapbox://styles/mapbox/light-v9',
            center: [-96, 37.8],
            zoom: 1
        });
        
        map.addControl(new MapboxGeocoder({
            accessToken: mapboxgl.accessToken
        }));
            
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

        // map.on('click', function (e) {
        //         document.getElementById('features').innerHTML =
        //             // e.point is the x, y coordinates of the mousemove event relative
        //             // to the top-left corner of the map
        //             JSON.stringify(e.point) + '<br />' +
        //             // e.lngLat is the longitude, latitude geographical position of the event
        //             JSON.stringify(e.lngLat);
        //     });

    
    ////Collecting Place form data and pushing it to page
    $.get('/places', function (places) {
        console.log('response returned');
        console.log(places);
        places.forEach(function (onePlace) {
            console.log(onePlace.complete);
            if(onePlace.complete != true){
            renderTodo(onePlace);
            } else {
            renderComplete(onePlace);
            }
        });
    });

    //// Collects Form Entry and creates new Place
    $('#placeForm').on('submit', function(event){
        event.preventDefault();
        var formData = $(this).serialize();
        console.log("the unserialzied data is " + this);
        console.log('formData', formData);
        $(this).trigger("reset");
        $.ajax({
            url: "/places",
            type:"POST",
            data: formData,
            // dataType: String
        }).done(function(stuff){
            if (stuff.complete != true) {
                renderTodo(stuff);
            } else {
                renderComplete(stuff);
            }
        });
    });// end of form submit

    ////Rendering Places to Auth Page
    function renderTodo(places){
       console.log("rendering places:", places);

        var placeHtml = 
           
            "          <div class='text-center row divPlace"+ places._id +"'>" +
            "           <div class='align-middle col-sm-6'><h4>" + places.locName +"</h4></div>" +
            "            <div class='align-middle btn-group btn-group-md col-sm-6'>"+
            "             <button id='" + places._id + "' class='btn btn-sm btn-default placeTodo '>✓</button>" +
            "             <button id='" + places._id + "' class='btn btn-sm btn-default placeDelete '>X</button>" +
            "            </div>"+
            "          </div>";

        // render to the page with jQuery
        $('#todoPlaces').append(placeHtml); 
    }// end of renderPlace
    
    ////Rendering Places completed to Auth page
    function renderComplete(places) {
        console.log("rendering complete places:", places);

        var placeHtml =
           
            "          <div class='text-center row divPlaceComplete" + places._id + "'>" +
            "             <div class='align-right  col-sm-6'><h4>" + places.locName + "</h4></div>" +
            "              <div class='align-right btn-group btn-group-md col-sm-6'>" +
            "              <button id='" + places._id + "' class=' btn btn-sm btn-default placeDelete'>X</button>" +   
            "            </div>" +      
            "          </div>";

        // render to the page with jQuery
        $('#completePlaces').append(placeHtml);
    }// end of renderPlace
 
    ////When beenThere checkbox has been clicked, updates field
    $("#userPlaces").on("click", ".placeTodo", function () {
        var idNum = $(this).attr('id');
        $.ajax({
            url: "/places/"+idNum,
            type: "PUT",
        }).done($.get("/places/"+idNum, function(places){
            renderComplete(places[0]);
            console.log(this);
             $(".divPlace"+idNum+"").remove();
        }));
    });//end of update todo to complete

    ////Deletes place
    $("#userPlaces").on("click", ".placeDelete", function () {
        var idNum = $(this).attr('id');
        $.ajax({
            url: "/places/" + idNum,
            type: "DELETE",
        }).done($.get("/places/" + idNum, function (places) {
            $(".divPlaceComplete" + idNum + "").remove();
            $(".divPlace" + idNum + "").remove();
        
        }));
     }); //end of delete
});//end of .ready()
