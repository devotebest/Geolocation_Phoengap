MyApp.map_page = function (params) {


    dismaland = [
        {
            id: 99,
            lat: 51.340929,
            lng: -2.982730,
            title_image: '<img src="images/dismaland/exit.jpg" />',
            title: "Dismaland",
            subhead: 'Marine Parade, Weston-super-Mare, North Somerset',
            body_copy: '<p>It\'s possible that a Banksy piece will remain at The Tropicana, but because the site is being redeveloped it is not open to the pubic. Mind you, there is the rest of Weston-super-Mare to enjoy so who are we to tell you to stay at home? For those who choose to go we recommend lunch at the Oxford Cafe.</p>'
  }];






    mapZoom = (14);
    markersTrail = [];
    markersTrail2 = [];
    markersPub = [];
    var markersFerry = [];
    var markersDismaland = [];
    markersHunt = [];
    var markerLocation = [];
    var infowindow = [];
    var infowindowsTrail = [];
    var infowindowsHunt = [];
    var infowindowsFerry = [];
    var locationMarker = null;



    initial_location = ('51.477795,-2.599402');
    /* If link to map included specific location, highlight pin, centre on location and increase zoom. */
    if (params.id > 0) {
        var selected_location = $.grep(mapMarkersTrail, function (e) {
            return e.id == params.id;
        });
        if (selected_location.length != 0) {
            var selected_lat = selected_location[0].lat;
            var selected_lng = selected_location[0].lng;
            initial_location = (selected_lat + ',' + selected_lng);
            mapZoom = (16);
        }
    }



    // User location 

    var first_time = 1;
    var first_time_ferry = 1;
    var watchID = null;

    function onSuccess(position) {
        console.log(position);

        var location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);


        if (first_time == 1) {

            map.setCenter(location);
            map.setZoom(16);
            first_time = 0;
        } else {
            locationMarker.setMap(null);
            locationMarker = null;
        }

        gpslocmarker = {
            url: 'images/map_icons/gpsloc.png'
        }
        locationMarker = new google.maps.Marker({
            position: location,
            title: "You're here",
            icon: gpslocmarker,
            map: map
        });
    };

    
    
    function onError(error) {
        console.log(error);
        alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    }

    
    
    getCurrentLocation = function () {
    
        var test_position = null;

        var options = {
            maximumAge: 3000,
            timeout: 500,
            enableHighAccuracy: true
        }

           

        console.log("attempting to grab users position");
        navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

        /*

        //if(viewModel.mapToggle() == 1) {
        if (locationMarker === null) {
            
            viewModel.mapToggle(0);

            store_map2_watchID.load;
            console.log('store_map2_watchID load');
            console.log(store_map2_watchID);

            navigator.geolocation.clearWatch(store_map2_watchID);
            watchID = navigator.geolocation.watchPosition(onSuccess, onError);
            store_map1_watchID = watchID;
            $('#location_toggle_icon').removeClass('sba_blue');
            $('#location_toggle_icon').addClass('sba_pink');
        } else {

            $('#location_toggle_icon').removeClass('sba_pink');
            $('#location_toggle_icon').addClass('sba_blue');

            viewModel.mapToggle(1);

            navigator.geolocation.clearWatch(watchID);

            locationMarker.setMap(null);
            locationMarker = null;

            //map.setZoom(16);
            home_location = new google.maps.LatLng('51.477795,-2.599402');
            map.setCenter(home_location);
            first_time = 1;
        }
        
        */
    };

    function set_hunt_visited() {
        store_hunt_answers.load()
            .done(function (values) {
                if (values) {
                    $.each(values, function (index, element) {

                        for (var key in markersHunt) {
                            if (element.id == markersHunt[key].question_id) {
                                markersHunt[key].icon.url = "images/map_icons/hunt_flag_visited_5.png";
                            }
                        }
                    });

                    //FOR HUNT FLAG
                    /*
								if (markersHunt[0].visible) {
									viewModel.hideMarkers(markersHunt);
									viewModel.showMarkers(markersHunt);
								} else {
									viewModel.showMarkers(markersHunt);
									viewModel.hideMarkers(markersHunt);
								}
					        	*/


                }
            })
            .fail(function (error) {});
    }

    function set_trail_visited() {
        /*
				var img = new Array();
				img[0] = "map-icon-1.png";
				img[1] = "map-icon-2.png";

				store_trail_visits.load()
			    .done(function(values) {
			       
					if(values)
					        {
					        	 $.each(values, function(index, element) {
					        	 	for(var key in markersTrail)
										{
											if(element.id == markersTrail[key].visited_id)
											{
												markersTrail[key].icon.url = "images/map_icons/map-pointer.png";
											}
										}
					        	 });

					        	 //FOR TRAIL FLAG
								if (markersTrail[0].visible) {
									viewModel.hideMarkers(markersTrail);
									viewModel.showMarkers(markersTrail);
								} else {
									viewModel.showMarkers(markersTrail);
									viewModel.hideMarkers(markersTrail);
								}


					        }
			    })
			    .fail(function(error) {
			        
			    });
    */
    }

    var first_counter = 0;
    var map = null;
    var viewModel = {


        mapToggle: ko.observable(1),
        mapMarkersTrail: ko.observable(),
        trail_count: 0,

        trail_count: ko.observable(store_trail_visits_count() + '/8'),

        hunt_count: 0,

        //hunt_count: ko.observable(store_hunt_answers_count() + '/' + (hunt_questions.length)),


        onReadyAction: function (e) {



            map = e.originalMap;
            //Use map APIs


            /*
            Style the map.
            */
            var styles = [
                {
                    stylers: [
                        {
                            saturation: -25
                        },
                        {
                            lightness: -8
                        },
                        {
                            gamma: 0.76
                        },
                        {
                            hue: "#ff8000"
                        }
			    ]
			  },
                {
                    featureType: "landscape.man_made",
                    stylers: [
                        {
                            saturation: -100
                        },
                        {
                            lightness: 48
                        },
                        {
                            gamma: 0.73
                        }
			    ]
			  },
                {
                    elementType: "labels.icon",
                    stylers: [
                        {
                            visibility: "off"
                        }
			    ]
			  },
                {
                    featureType: 'water',
                    stylers: [
                        {
                            hue: "#0099ff"
                        },
                        {
                            saturation: -18
                        },
                        {
                            gamma: 0.5
                        },
                        {
                            lightness: 59
                        }
			      ]
			    },
                {
                    featureType: "transit.line",
                    elementType: "labels",
                    stylers: [
                        {
                            hue: "#0099ff"
                        },
                        {
                            saturation: -15
                        },
                        {
                            gamma: 0.5
                        },
                        {
                            lightness: 26
                        },
                        {
                            visibility: "off"
                        }
				    ]
				  },
                {
                    featureType: "road.highway",
                    stylers: [
                        {
                            hue: "#ff8000"
                        },
                        {
                            gamma: 0.76
                        },
                        {
                            saturation: -60
                        },
                        {
                            lightness: 43
                        }
			    ]
			  },
                {
                    featureType: "poi.park",
                    stylers: [
                        {
                            hue: "#99ff00"
                        },
                        {
                            saturation: -29
                        },
                        {
                            lightness: 42
                        }
			    ]
			  },
                {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [
                        {
                            visibility: "off"
                        }
			    ]
			  }
			];


            var styledMap = new google.maps.StyledMapType(styles, {
                name: "Styled Map"
            });



            map.mapTypes.set('map_style', styledMap);
            map.setMapTypeId('map_style');


            toggleHunt = 1;

            viewModel.drawMarkersTheGoogleWay(map);

            //set_trail_visited();
            //set_hunt_visited();


        },
        viewShowing: function () {

            //this.hunt_count(store_hunt_answers_count() + '/' + hunt_questions.length);
            this.trail_count(store_trail_visits_count() + '/8');






            if (first_counter == 0)
                first_counter = 1;
            else {
                set_trail_visited()
                set_hunt_visited();
            }


        },

        drawMarkersTheGoogleWay: function (map) {
            /* Moved to index.js
            var artists_locations = [];
            var artists_list;
            for (var key in data_artists) {
                if (data_artists.hasOwnProperty(key)) {
                    var artist_name_link = '<p class="artist_name_link" onClick=\"MyApp.app.navigate(\'artist_page/' + key + '\');">' + data_artists[key].name + '</p>';
                    if (artists_locations.hasOwnProperty(data_artists[key].location_id)) {
                        artists_locations[data_artists[key].location_id] = artists_locations[data_artists[key].location_id] + artist_name_link;
                    } else {
                        artists_locations[data_artists[key].location_id] = artist_name_link;
                    }
                    
                }
            }
            
  */
            for (var key in mapMarkersTrail) {
                if (mapMarkersTrail.hasOwnProperty(key)) {




                    //console.log([key]);
                    //alert ('key = ' + key);
                    var locationTitle = mapMarkersTrail[key].title;
                    if ("infoWindowTitle" in mapMarkersTrail[key]) {
                        locationTitle = mapMarkersTrail[key].infoWindowTitle;
                    }

                    location_name = '<p class="map_location_name"><i class="fa fa-map-marker icon-margin-right sba_pink"></i>' + locationTitle + '</p>';



                    infoWindowContent = '<div class="infoWindowWrapper"><div class="infoWindow infoWindowTrail">' + location_name + artists_locations[mapMarkersTrail[key].id] + '</div></div>';

                    infowindowsTrail[key] = new google.maps.InfoWindow({
                        content: infoWindowContent,
                        maxWidth: 200
                    });

                    var highlight_marker = '';
                    if (params.id == mapMarkersTrail[key].id) {
                        //highlight_marker = '-yellow';
                    }
                    var image = {
                        //url: mapMarkersTrail[key].iconSrc,
                        url: 'images/map_icons/map-pointer' + highlight_marker + '.png',
                        scaledSize: new google.maps.Size(28, 40),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(20, 30)
                    }






                    markerLocation = new google.maps.LatLng(mapMarkersTrail[key].lat, mapMarkersTrail[key].lng);
                    //console.log('markerLocation: ' + markerLocation);

                    markersTrail.push(new google.maps.Marker({
                        position: markerLocation,
                        visited_id: key,
                        /* JR to be updated before live to remove vars after title. */
                        /* title: mapMarkersTrail[key].title + ' ' + params.id + ' ' + mapMarkersTrail[key].id, */
                        title: mapMarkersTrail[key].title,
                        icon: image,
                        map: map
                    }));

                    google.maps.event.addListener(markersTrail[key], 'click', function (innerKey) {
                        return function () {
                            viewModel.closeAllInfoWindows();
                            //console.log([innerKey]);
                            infowindowsTrail[innerKey].open(map, markersTrail[innerKey]);
                            //console.log(infowindowsTrail[innerKey]);

                            //navigate_page('trail',innerKey);
                        }
                    }(key));



                    /*
                //Click on marker follows link to trail page
				google.maps.event.addListener(markersTrail[key], 'click', function(innerKey) {
					return function() {
						viewModel.closeAllInfoWindows();
						//infowindowsTrail[innerKey].open(map, markersTrail[innerKey]);
						navigate_page('trail',innerKey);
					}
				}(key));
                */

                    //marker.setMap(map);

                }


            }





            function navigate_page(page_type, page_key) {
                MyApp.app.navigate(page_type + '_page/' + page_key);
            }


            /*
			for (var key in hunt_questions) {
				
				if (hunt_questions.hasOwnProperty(key)) {
					pageLink = 'onClick=\"MyApp.app.navigate(\'hunt_page/' + hunt_questions[key].id + '\');"';
					infoWindowContent = '<div class="infoWindow infoWindowHunt" ' + pageLink + '>' + hunt_questions[key].title + '</div>';
			        infowindowsHunt[key] = new google.maps.InfoWindow({
			            content: infoWindowContent
			        });
				
				var shape = {
				      coords: [23, 1, 23, 54, 72, 54, 72 , 1],
				      type: 'poly'
				  };
				var image = {
					url: "images/map_icons/hunt_flag_5.png",
					origin: new google.maps.Point(0,0),
					anchor: new google.maps.Point(22,54)
				}
				markerLocation = new google.maps.LatLng(hunt_questions[key].lat,hunt_questions[key].lng);
				markersHunt.push(new google.maps.Marker({
				position:markerLocation,
				title: hunt_questions[key].title,
				question_id: hunt_questions[key].id,
				icon: image,
        		shape: shape,
				visible: false,
				map: map
				}));

				google.maps.event.addListener(markersHunt[key], 'click', function(innerKey) {
					return function() {
						viewModel.closeAllInfoWindows();
						//infowindowsHunt[innerKey].open(map, markersHunt[innerKey]);
						navigate_page('hunt',hunt_questions[innerKey].id);
					}
				}(key));
				//marker.setMap(map);
				
				}
			}
			*/


            for (var key in dismaland) {

                if (dismaland.hasOwnProperty(key)) {
                    pageLink = 'onClick=\"MyApp.app.navigate(\'dismal_page/' + key + '\');"';
                    infoWindowContent = '<div class="infoWindow infoWindowFerry" ' + pageLink + '>' + dismaland[key].title + '</div>';
                    infowindowsFerry[key] = new google.maps.InfoWindow({
                        content: infoWindowContent
                    });

                    var image = {
                        url: 'images/map_icons/dismaland-icon.png',
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(75, 100)
                    }
                    markerLocation = new google.maps.LatLng(dismaland[key].lat, dismaland[key].lng);
                    markersDismaland.push(new google.maps.Marker({
                        position: markerLocation,
                        title: dismaland[key].title,
                        icon: image,
                        visible: false,
                        map: map
                    }));

                    google.maps.event.addListener(markersDismaland[key], 'click', function (innerKey) {
                        return function () {
                            viewModel.closeAllInfoWindows();
                            //infowindowsFerry[innerKey].open(map, markersFerry[innerKey]);
                            navigate_page('dismal', innerKey);
                        }
                    }(key));
                    //marker.setMap(map);

                }
            }





            for (var key in ferry_stops) {

                if (ferry_stops.hasOwnProperty(key)) {
                    pageLink = 'onClick=\"MyApp.app.navigate(\'ferry_page/' + key + '\');"';
                    infoWindowContent = '<div class="infoWindow infoWindowFerry" ' + pageLink + '>' + ferry_stops[key].title + '</div>';
                    infowindowsFerry[key] = new google.maps.InfoWindow({
                        content: infoWindowContent
                    });

                    var image = {
                        url: 'images/map_icons/map-icon-' + ferry_stops[key].id + '.png',
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(20, 30)
                    }
                    markerLocation = new google.maps.LatLng(ferry_stops[key].lat, ferry_stops[key].lng);
                    markersFerry.push(new google.maps.Marker({
                        position: markerLocation,
                        title: ferry_stops[key].title,
                        icon: image,
                        visible: false,
                        map: map
                    }));

                    google.maps.event.addListener(markersFerry[key], 'click', function (innerKey) {
                        return function () {
                            viewModel.closeAllInfoWindows();
                            //infowindowsFerry[innerKey].open(map, markersFerry[innerKey]);
                            navigate_page('ferry', innerKey);
                        }
                    }(key));
                    //marker.setMap(map);

                }
            }

            /* Dismaland */
            /*
            var image = {
					url: 'images/map_icons/dismaland-icon.png',
					origin: new google.maps.Point(0,0),
					anchor: new google.maps.Point(12,30)
				}
				markerLocation = new google.maps.LatLng(51.340929, -2.982730);
				markersPub.push(new google.maps.Marker({
				position:markerLocation,
				visited_id: 99,
				title: "The Cottage pub",
				icon: image,
				visible: true,
				map: map
				}));
            
            google.maps.event.addListener(markersPub[0], 'click', function(innerKey) {
					return function() {
						viewModel.closeAllInfoWindows();
						//infowindowsFerry[innerKey].open(map, markersFerry[innerKey]);
						window.open('http://www.cottage.butcombe.com/', '_system');
					}
				}(key));
                
            */

            /* END Dismaland */



        },


        closeAllInfoWindows: function () {
            for (var i = 0; i < infowindowsTrail.length; i++) {
                infowindowsTrail[i].close(map);
            }
            /*
			for(var i=0; i<infowindowsFerry.length; i++){
				infowindowsFerry[i].close(map);
			}
			for(var i=0; i<infowindowsHunt.length; i++){
				infowindowsHunt[i].close(map);
			}
            */
        },

        hideMarkers: function (markerSet) {
            for (var i = 0; i < markerSet.length; i++) {
                markerSet[i].setVisible(false);
            }
        },
        showMarkers: function (markerSet) {
            for (var i = 0; i < markerSet.length; i++) {
                markerSet[i].setVisible(true);
            }
        },


        /*
        testj: function() {
        	var myLatlng = new google.maps.LatLng(51.450088,-2.595281);
        	alert('testj');
        	marker=new google.maps.Marker({
        	  position:myLatlng,
        	  animation:google.maps.Animation.BOUNCE
        	  });

        	marker.setMap(map);
        },
        */



        mapToggleHunt: function () {
            if (markersHunt[0].visible) {
                viewModel.hideMarkers(markersHunt);
            } else {
                viewModel.showMarkers(markersHunt);
            }
        },

        mapToggleDismaland: function () {
            viewModel.showMarkers(markersDismaland);
            map.setZoom(16);
            home_location_dismaland = new google.maps.LatLng(51.340929, -2.982730);
            map.setCenter(home_location_dismaland);
        },
        mapToggleFerry: function () {
            viewModel.showMarkers(markersFerry);
            map.setZoom(16);
            home_location_ferry = new google.maps.LatLng(51.465139, -2.574742);
            map.setCenter(home_location_ferry);
        },
        mapToggleTrail: function () {
            viewModel.showMarkers(markersTrail);
            map.setZoom(16);
            home_location = new google.maps.LatLng(51.443445, -2.604705);
            map.setCenter(home_location);
        },
        /*
        * The old way, including far too much toggling
        mapToggleDismaland: function() {
			if (markersDismaland[0].visible) {
				viewModel.hideMarkers(markersDismaland);
                $('#marker_switch_dismal').addClass('marker_switch_off');
			} else {
				viewModel.showMarkers(markersDismaland);
                map.setZoom(15);
                home_location_dismaland = new google.maps.LatLng(51.340929, -2.982730);
                map.setCenter(home_location_dismaland);
                $('#marker_switch_dismal').removeClass('marker_switch_off');
			}
		},
		mapToggleFerry: function() {
			if (markersFerry[0].visible) {
				viewModel.hideMarkers(markersFerry);
                $('#marker_switch_others').addClass('marker_switch_off');
			} else {
				viewModel.showMarkers(markersFerry);
                //if(first_time_ferry == 1) { 
                    map.setZoom(13);
                    home_location_ferry = new google.maps.LatLng(51.465139, -2.574742);
                    map.setCenter(home_location_ferry);
                    first_time_ferry = 0;
                    $('#marker_switch_others').removeClass('marker_switch_off');
                //}
			}
		},
		mapToggleTrail: function() {
			if (markersTrail[0].visible) {
				viewModel.hideMarkers(markersTrail);
                $('#marker_switch_trail').addClass('marker_switch_off');
			} else {
				viewModel.showMarkers(markersTrail);
                map.setZoom(14);
                home_location = new google.maps.LatLng(51.456073, -2.596790);
                map.setCenter(home_location);
                $('#marker_switch_trail').removeClass('marker_switch_off');
			}
		}, */






    };


    /* Infobar at top of map page */
    //store_infobars.clear();
    var initial_display_btn_map_help = 'none';
    var initial_display_infobar = 'block';

    var store_infobars_count = 0;
    store_infobars.totalCount()
        .done(function (result) {
            // 'result' contains the item count.
            store_infobars_count = result;
        });
    //console.log(store_infobars_count);
    if (store_infobars_count > 0) {
        var initial_display_btn_map_help = 'block';
        var initial_display_infobar = 'none';
    } else {

    }

    var btn_map_help = '<div id="btn-map-help" onclick="show_element(\'infobar\');close_element(\'btn-map-help\');" style="display:' + initial_display_btn_map_help + ';"><i class="fa fa-question-circle sba_pink"></i></div>';
    var map_infobar = '<div id="infobar" style="display:' + initial_display_infobar + ';"><i class="fa fa-close icon-margin-left icon-margin-right icon-margin-top icon-float-right" id="info_map" onclick="close_element(\'infobar\');update_store_infobars(\'infobar\');show_element(\'btn-map-help\');"></i><p><i class="fa fa-map-marker fa-2x icon-margin-right sba_pink"></i>Tap any map pin for a list of artists at that venue.</p><p><i class="fa fa-arrow-circle-right fa-2x icon-margin-right sba_pink"></i>Tap any artist name for more information.</p><p><i class="fa fa-bars fa-2x icon-margin-right sba_pink"></i>Tap menu (top left) for <i class="fa fa-search sba_pink"></i> search and more.</p><p><i class="fa fa-location-arrow fa-2x icon-margin-right sba_blue"></i>Tap location pointer (bottom) to switch location tracker on/off.</p></div>' + btn_map_help;


    viewModel.map_infobar = map_infobar;

    /* END Infobar at top of map page */


    mapTypes = [
        {
            text: "hybrid"
        },
        {
            text: "roadmap"
        }
		];
    currentMapType = ko.observable("roadmap");

    //Assigns the clicked tab text to the currentMapType variable
    tabClicked = function (itemClickOptions) {
        currentMapType(itemClickOptions.itemData.text);
    };

    return viewModel;


};
