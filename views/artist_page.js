MyApp.artist_page = function (params) {
    
    

    var viewModel = {
//  Put the binding properties here
		pageparams: params.id,
        
        data_artists: data_artists,
        
        
		
		
		
		
    };

	//pageContents = viewModel.pageContentsList[viewModel.pageparams];
    
    var artist = data_artists[params.id];
    var location = $.grep(mapMarkersTrail, function(e){ return e.id == artist.location_id; });
    var location_name_link = '';
    //var description = artist.description;
    var description = ''; // Changed to stop this appearing on pages where the artist has no long description. The short description looks odd in this context. JMR 20181115
    
    if (location.length != 0) {
        
        location_name_link = '<div class="button_holder"><p class="location_name_link" onClick=\"MyApp.app.navigate(\'map_page_2/' + location[0].id + '\');"><span class="dx-button-text"><i class="fa fa-map-marker icon-margin-right sba_pink"></i>' + location[0].title + '</span></p></div>';
        
        location_name_link_back = location[0].title;
    }
    var main_pic = '<img src="images/artist_pics/enhanced/' + artist.id + '.jpg" />';
    
    var longDescDownArrow = '';
    var extra_pics = '';
    if ("extra_pics" in artist) {
        for (i = 1; i <= artist.extra_pics; i++) {
            extra_pics += '<img src="images/artist_pics/enhanced/' + artist.id + '-' + i + '.jpg" /><br />';
        }
        if (artist.extra_pics > 0) {
            longDescDownArrow = '&nbsp;<i class="fa fa-arrow-circle-down sba_pink"></i>';
        }
    }
   
    var phone = '';
    var email = '';
    var url = '';
    var instagram = '';
    var facebook = '';
    var twitter = '';
    
    if ("enhanced" in artist) {
        
        main_pic = '<img src="images/artist_pics/enhanced/' + artist.id + '.jpg" />';
        
        if ("description_long" in artist) {
            if(artist.description_long !== null && artist.description_long !== '' && artist.description_long !== 'long_description') {
                description = artist.description_long + longDescDownArrow;
            }
        }
        
        if ("phone" in artist) {
            if(artist.phone !== null && artist.phone !== '') {
                phone = '<i class="fa fa-phone icon-margin-right sba_pink"></i>' + artist.phone;
            }
        }
        
        if ("email" in artist) {
            if(artist.email !== null && artist.email !== '') {
                email = '<i class="fa fa-envelope icon-margin-right sba_pink"></i><a href="mailto:' + artist.email + '?Subject=Message via North Bristol Art Trail App" class="href_no_decoration">' + artist.email + '</a>';
            }
        }
        
        if ("url" in artist) {
            if(artist.url !== null && artist.url !== '') {
                url = '<i class="fa fa-external-link-square icon-margin-right sba_pink"></i><a href="http://' + artist.url + '" class="href_no_decoration">' + artist.url + '</a>';
            }
        }
        
        if ("instagram" in artist) {
            if(artist.instagram !== null && artist.instagram !== '') {
                instagram = '<i class="fa fa-instagram icon-margin-right sba_pink"></i><a href="https://www.instagram.com/' + artist.instagram + '" class="href_no_decoration">@' + artist.instagram + '</a>';
            }
        }
        
        if ("facebook" in artist) {
            if(artist.facebook !== null && artist.facebook !== '') {
                facebook = '<i class="fa fa-facebook-square icon-margin-right sba_pink"></i><a href="https://www.facebook.com/' + artist.facebook + '" class="href_no_decoration">@' + artist.facebook + '</a>';
            }
        }
        
        if ("twitter" in artist) {
            if(artist.twitter !== null && artist.twitter !== '') {
                twitter = '<i class="fa fa-twitter-square icon-margin-right sba_pink"></i><a href="https://www.twitter.com/' + artist.twitter + '" class="href_no_decoration">@' + artist.twitter + '</a>';
            }
        }
    }
   
    viewModel.main_pic = main_pic;
    viewModel.location_name_link = location_name_link;
    viewModel.location_name_link_back = location_name_link_back;
    viewModel.description = description;
    viewModel.extra_pics = extra_pics;
    viewModel.phone = phone;
    viewModel.email = email;
    viewModel.url = url;
    viewModel.instagram = instagram;
    viewModel.facebook = facebook;
    viewModel.twitter = twitter;
    
    
	pageContents = viewModel.data_artists[viewModel.pageparams];


    return viewModel;
	
};


	
