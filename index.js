



(function () {
    "use strict";

     
    var MyApp = window.MyApp = { };
    
    // Uncomment the line below to disable platform-specific look and feel and to use the Generic theme for all devices
    // DevExpress.devices.current({ platform: "generic" });

    $(function () {
        MyApp.app = new DevExpress.framework.html.HtmlApplication({
            namespace: MyApp,
            
           
			navigationType: "slideout",
            navigation: [
              {
                title: "Map",
                action: "#map_page",
                icon: "map"
              },
             {
                title: "Search",
                action: "#artist_list",
                icon: "find"
              },/*
             {
                title: "Update - IMPORTANT",
                action: "#update_app"
              },*/
             {
                title: "About this app",
                action: "#about_this_app"
              },
             {
                title: "Elephant",
                action: "#elephant"
              },
             {
                title: "Banksy Bristol Trail",
                action: "#banksys_bristol"
              },
              {
                title: "Safety - please read",
                action: "#disclaimer"
              }
            ],
 
			
			

				
			
			
			
			
		});
        
        MyApp.app.router.register(":view/:id", { view: "map_page", id: null });
        MyApp.app.navigate();
        
        
        
        
        
    });
	
    
	
    
	
	
})();
/*
var hunt_questions = [
  {
	id: 1,
	lat: 51.452073,
	lng: -2.597729,
	title_image: '',
    title: "Ferry Stop 1 – Cascade Steps",
	question: 'How many steps does the  water cascade down?',
	answers: [
	    { id:1, answer: "9" },
	    { id:2, answer: "12" },
	    { id:3, answer: "15" }
	]
  }
];
*/

var footnote_other = '';

	

var ferry_stops = [
  
];






// Set the number of questions that must be answered before the entry form appears
//var trigger_level = hunt_questions.length;
trigger_level = 2;


var store_hunt_answers = new DevExpress.data.LocalStore({
    name: "store_hunt_answers",
    key: "id"
});

var store_trail_visits = new DevExpress.data.LocalStore({
    name: "store_trail_visits",
    key: "id"
});

var store_infobars = new DevExpress.data.LocalStore({
    name: "store_infobars",
    key: "id"
});

var store_map1_watchID = new DevExpress.data.LocalStore({
    name: "store_map1_watchID",
    key: "id"
});

var store_map2_watchID = new DevExpress.data.LocalStore({
    name: "store_map2_watchID",
    key: "id"
});



function update_store_infobars (infobar_id) {
		store_infobars.insert({id: infobar_id});
}





function update_store_trail_visits (item_id) {
		store_trail_visits.insert({id: item_id});
}
function store_update_hunt_answers (item_id,answer_id) {
	store_hunt_answers.update(item_id, { answer: answer_id })
   .done(function(values) {
        //handle successfull updating
	   DevExpress.ui.notify("Your answer has been saved", "info", 1000);
    })
    .fail(function(error) {
		// If the update failed, insert the new item
		store_hunt_answers.insert({id: item_id,answer: answer_id});
	   DevExpress.ui.notify("Your answer has been saved", "info", 1000);
    });
}



function clearHunt () {
	clear_confirm = DevExpress.ui.dialog.confirm("Are you sure? This will clear all of your answers from the Treasure Hunt.", "Reset the Big Green Treasure Hunt");
	clear_confirm.done(function (dialogResult) {
		if (dialogResult) {
			store_hunt_answers.clear();
			store_hunt_answers.totalCount()
		    .done(function(result) {
				if (!result) {
					//viewModel.hunt_count(store_hunt_answers_count() + '/27');
					DevExpress.ui.notify ('The Treasure Hunt answers have been reset.');
				} else {
					DevExpress.ui.notify ('There was an error resetting the Treasure Hunt answers.');
				}
		    })
		    .fail(function(error) {
		    });
		} else {
     	DevExpress.ui.notify("Canceled", "error", 2000);
		}
  });

	for(var key in markersHunt)
	{
		markersHunt[key].icon.url = "images/map_icons/hunt_flag_5.png";
	}
			
	
};

function clearTrail () {
	clear_confirm = DevExpress.ui.dialog.confirm("Are you sure?", "Reset the Treasure Island Trail counter");
	clear_confirm.done(function (dialogResult) {
		if (dialogResult) {
			store_trail_visits.clear();
			store_trail_visits.totalCount()
		    .done(function(result) {
				if (!result) {
					//viewModel.hunt_count(store_hunt_answers_count() + '/27');
					DevExpress.ui.notify ('The Treasure Island Trail counter has been reset.');
				} else {
					DevExpress.ui.notify ('There was an error resetting the Treasure Island Trail counter.');
				}
		    })
		    .fail(function(error) {
		    });
		} else {
     	DevExpress.ui.notify("Canceled", "error", 2000);
		}
  });

			var img = new Array();
			img[0] = "trail_flag_5_a.png";
			img[1] = "trail_flag_5_b.png";
			img[2] = "trail_flag_5_c.png";
			img[3] = "trail_flag_5_d.png";
			img[4] = "trail_flag_5_e.png";
			img[5] = "trail_flag_5_f.png";
			img[6] = "trail_flag_5_g.png";
			img[7] = "trail_flag_5_h.png";
			
			for (var key in markersTrail) {
				markersTrail[key].icon.url = "images/map_icons/"+img[key];
			}

};

showConfirm = function () {
  var result = DevExpress.ui.dialog.confirm("Are you sure?", "Confirm changes");
  result.done(function (dialogResult) {
    if (dialogResult)
      DevExpress.ui.notify("Confirmed", "success", 2000);
    else
      DevExpress.ui.notify("Canceled", "error", 2000);
  });
};

function store_hunt_answers_count () {
	
	hunt_count = 0;
	store_hunt_answers.totalCount()
    .done(function(result) {
        // 'result' contains the item count.
		hunt_count = result;
    })
    .fail(function(error) {
        // handle error
    });
	
	return hunt_count;
}





function store_trail_visits_count () {
	
	trail_visits_count = 0;
	store_trail_visits.totalCount()
    .done(function(result) {
        // 'result' contains the item count.
		trail_visits_count = result;
    })
    .fail(function(error) {
        // handle error
    });
	
	return trail_visits_count;
}


function goToMapInstructions() {
    MyApp.app.navigate('map_instructions', { target: 'current' });
}
function goToDisclaimer() {
    MyApp.app.navigate('disclaimer');
}

function goToMapFerry() {
    goToMap('Ferry');
}
function goToMap() {
	MyApp.app.navigate('map_page', { target: 'current' });
}
function goToDismaland1() {
    MyApp.app.navigate('dismaland-1', { target: 'current' });
}
function goToDismaland2() {
    MyApp.app.navigate('dismaland-2', { target: 'current' });
}
function goToDismaland3() {
    MyApp.app.navigate('dismaland-3', { target: 'current' });
}
function goToDismaland4() {
    MyApp.app.navigate('dismaland-4', { target: 'current' });
}
function goToMobileLovers() {
    MyApp.app.navigate('mobile-lovers', { target: 'current' });
}
function goToMuseum2() {
    MyApp.app.navigate('museum-2', { target: 'current' });
}
function goToDiscountCode() {
    MyApp.app.navigate('banksys_bristol', { target: 'current' });
}

/* Open links in system browser */
$(document).on('click','a',function(e) {
    if ($(this).attr('target') === '_blank') {
        window.open($(this).attr('href'),'_system','location=yes');
        e.preventDefault();
    }
});



/* Make an array of artist names with link to artist page, keyed by location */
 var artists_locations = [];
            var artists_list;
            for (var key in data_artists) {
                if (data_artists.hasOwnProperty(key)) {
                    var artist_name_link = '<p class="artist_name_link sba_blue" onClick=\"MyApp.app.navigate(\'artist_page/' + key + '\');"><i class="fa fa-arrow-circle-right icon-margin-right sba_pink"></i>' + data_artists[key].name + '</p>';
                    if (artists_locations.hasOwnProperty(data_artists[key].location_id)) {
                        artists_locations[data_artists[key].location_id] = artists_locations[data_artists[key].location_id] + artist_name_link;
                    } else {
                        artists_locations[data_artists[key].location_id] = artist_name_link;
                    }
                    
                }
            }


function close_element(element_id) {
    $('#' + element_id).hide();
};
function show_element(element_id) {
    $('#' + element_id).show();
};



	
	