$(function initializeMap () {

  const fullstackAcademy = new google.maps.LatLng(40.705086, -74.009151);

  const styleArr = [
    {
      featureType: 'landscape',
      stylers: [{ saturation: -100 }, { lightness: 60 }]
    },
    {
      featureType: 'road.local',
      stylers: [{ saturation: -100 }, { lightness: 40 }, { visibility: 'on' }]
    },
    {
      featureType: 'transit',
      stylers: [{ saturation: -100 }, { visibility: 'simplified' }]
    },
    {
      featureType: 'administrative.province',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'water',
      stylers: [{ visibility: 'on' }, { lightness: 30 }]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [{ color: '#ef8c25' }, { lightness: 40 }]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry.fill',
      stylers: [{ color: '#b6c54c' }, { lightness: 40 }, { saturation: -40 }]
    }
  ];

  var mapCanvas = document.getElementById('map-canvas-1');

  var currentMap = new google.maps.Map(mapCanvas, {
    center: fullstackAcademy,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: styleArr
  });

var makeMap = function(htmlId) {

  var mapCanvas = document.getElementById(htmlId);

  var thisMap = new google.maps.Map(mapCanvas, {
    center: fullstackAcademy,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: styleArr
  });

};

  const iconURLs = {
    hotel: 'https://cdn3.iconfinder.com/data/icons/map/500/hotel-32.png',
    restaurant: 'https://cdn3.iconfinder.com/data/icons/map/500/restaurant-32.png',
    activity: 'https://cdn3.iconfinder.com/data/icons/map/500/favorite-32.png'
  };

  var markerArray = [];

  function drawMarker (type, coords) {
    const latLng = new google.maps.LatLng(coords[0], coords[1]);
    const marker = new google.maps.Marker({
      position: latLng,
      icon: iconURLs[type]
    });
    marker.setMap(currentMap);
    // console.log("marker info", marker, typeof marker);
    markerArray.push(marker); // SS HYPOTHESIS TO SAVE / REMOVE MARKERS
    return marker;
    // jQuery.data(button, "marker", marker);
    // console.log(button);
  }

 //marker.setMap(null);


  // add all hotel, restaurant and activity to options under the first 3 selects
  $("select").each(function(index, select) {
    if (index === 0) hotels.forEach((hotel) => $(select).append(`<option>` + hotel.name + `</option>`));

    if (index === 1) restaurants.forEach((restaurant) => $(select).append(`<option>` + restaurant.name + `</option>`));

    if (index === 2) activities.forEach((activity) => $(select).append(`<option>` + activity.name + `</option>`));
  });

  // helper function to add h/r/a to itinerary andrecenter map
  var bounds = new google.maps.LatLngBounds();
  function addToItinerary(index, arrName, markerType) {
    var selected = $("select")[index].selectedIndex;
    var newName = $("select")[index].options[selected].text;
    var theSpan = $("<span class='title'></span>").text(newName);
    var theButton = $("<button class='btn btn-xs btn-danger remove btn-circle'></button>").text("x");
    $(".itinerary-item")[index].append(theSpan[0]);
    $(".itinerary-item")[index].append(theButton[0]);

    var location = places[arrName[selected].placeId].location;
    theButton[0].marker = drawMarker(markerType, location);
    bounds.extend(new google.maps.LatLng(location[0], location[1]));
    currentMap.fitBounds(bounds);
  }

  // add hotels to itinerary when '+' clicked
  $("#hotel-add").on("click", function() {
    addToItinerary(0, hotels, "hotel");
  });

  // add restaurants to itinerary when '+' clicked
  $("#restaurants-add").on("click", function() {
    addToItinerary(1, restaurants, "restaurant");
  });

  // add activities to itinerary when '+' clicked
  $("#activities-add").on("click", function() {
    addToItinerary(2, activities, "activity");
  });

  $(".itinerary-item").on("click", ".remove", function() {
    var button = $("event").prevObject[0].activeElement;
    // remove marker
    button.marker.setMap(null);
    // remove span
    $(button).prev().remove();
    // remove button
    button.remove();
  });

var nextDay = 2;

  $("#day-add").on('click', function() {
    var newButton = $("<button class='btn btn-circle day-btn'></button>").text(nextDay); // didn't add the class current-day to btn

    $("#day-add").before(newButton);
    // make a new map html element -- set to invisible (CSS)
    // make a new map to put in the html element
    var newMapDiv = $("<div visibility='visible' class='map-canvas' id='map-canvas-" + nextDay + "'></div>");
    $("#map-canvas").after(newMapDiv);



    nextDay++;

  });


});
