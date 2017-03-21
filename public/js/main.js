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

  const mapCanvas = document.getElementById('map-canvas');

  // function makeNewMap(location) {
  //   var center = new google.maps.LatLng(location[0], location[1]);
  //   currentMap = new google.maps.Map(mapCanvas, {
  //     center: center,
  //     zoom: 13,
  //     mapTypeId: google.maps.MapTypeId.ROADMAP,
  //     styles: styleArr
  //   });
  // }

  var currentMap = new google.maps.Map(mapCanvas, {
    center: fullstackAcademy,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: styleArr
  });

  const iconURLs = {
    hotel: '/images/lodging_0star.png',
    restaurant: '/images/restaurant.png',
    activity: '/images/star-3.png'
  };

  var markerArray = [];

  function drawMarker (type, coords) {
    const latLng = new google.maps.LatLng(coords[0], coords[1]);
    const marker = new google.maps.Marker({
      position: latLng
    });
    marker.setMap(currentMap);
    markerArray.push(marker); // SS HYPOTHESIS TO SAVE / REMOVE MARKERS
  }

 //marker.setMap(null);
 var bounds = new google.maps.LatLngBounds();

  $("select").each(function(index, select) {
    if (index === 0) {
      hotels.forEach(function(hotel) {
        $(select).append(`<option>` + hotel.name + `</option>`);
      }, select)
    }
    if (index === 1) {
      restaurants.forEach(function(restaurant) {
        $(select).append(`<option>` + restaurant.name + `</option>`);
      }, select)
    }
    if (index === 2) {
      activities.forEach(function(activity) {
        $(select).append(`<option>` + activity.name + `</option>`);
      }, select)
    }
  });

  $("#hotel-add").on("click", function() {
    var selected = $("select")[0].selectedIndex;
    var hotelName = $("select")[0].options[selected].text;
    var theSpan = $("<span class='title'></span>").text(hotelName);
    var theButton = $("<button class='btn btn-xs btn-danger remove btn-circle'></button>").text("x");
    $(".itinerary-item")[0].append(theSpan[0]);
    $(".itinerary-item")[0].append(theButton[0]);

    var location = places[hotels[selected].placeId].location;
    drawMarker('hotel', location);
    var latLngObj = new google.maps.LatLng(location[0], location[1]);
    bounds.extend(latLngObj);
    currentMap.fitBounds(bounds);
  });

  $("#restaurants-add").on("click", function() {
    var selected = $("select")[1].selectedIndex;
    var restaurantsName = $("select")[1].options[selected].text;
    var theSpan = $("<span class='title'></span>").text(restaurantsName);
    var theButton = $("<button class='btn btn-xs btn-danger remove btn-circle'></button>").text("x");
    $(".itinerary-item")[1].append(theSpan[0]);
    $(".itinerary-item")[1].append(theButton[0]);

    var location = places[restaurants[selected].placeId].location;
    drawMarker('restaurant', location);
    var latLngObj = new google.maps.LatLng(location[0], location[1]);
    bounds.extend(latLngObj);
    currentMap.fitBounds(bounds);
  })

  $("#activities-add").on("click", function() {
    var selected = $("select")[2].selectedIndex;
    var activitiesName = $("select")[2].options[selected].text;
    var theSpan = $("<span class='title'></span>").text(activitiesName);
    var theButton = $("<button class='btn btn-xs btn-danger remove btn-circle'></button>").text("x");
    $(".itinerary-item")[2].append(theSpan[0]);
    $(".itinerary-item")[2].append(theButton[0]);

    var location = places[activities[selected].placeId].location;
    drawMarker('activity', location);
    var latLngObj = new google.maps.LatLng(location[0], location[1]);
    bounds.extend(latLngObj);
    currentMap.fitBounds(bounds);
  })

  

});




