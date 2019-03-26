MyApp.artist_list = function (params) {
    
    
 
    
    
    var artist_list_html = '';
            for (var key in data_artists) {
                if (data_artists.hasOwnProperty(key)) {
                    /* Get the location details */
                    var location_id = data_artists[key].location_id;
                    var artist_id = data_artists[key].id;
                    var location = $.grep(mapMarkersTrail, function(e){ return e.id == location_id; });
                    var location_name = '';
                    if (location.length != 0) {
                        location_name = location[0].title;
                    }
                        
                    var artist_list_html = artist_list_html + '<div class="artist_list_item" onClick=\"MyApp.app.navigate(\'artist_page_search/' + key + '\');"><div class="artist_list_image" style="background: url(\'images/artist_pics/enhanced/' + artist_id + '.jpg\');background-position: center;background-size: auto 120px; background-repeat: no-repeat;"></div><div><h1 class="sba_blue"><i class="fa fa-arrow-circle-right icon-margin-right sba_pink"></i>' + data_artists[key].name + '</h1><p class="location_name"><i class="fa fa-map-marker icon-margin-left-4 icon-margin-right sba_pink"></i>' + location_name + '</p><p>' + data_artists[key].description + '</p></div></div>';
                    
                }
            }
            

    var viewModel = {
//  Put the binding properties here
		
        artist_list_html: artist_list_html,
        
        
		
    };
    
    

	pageContents = viewModel.artist_list_html;

    return viewModel;
    
    
   
	
};


