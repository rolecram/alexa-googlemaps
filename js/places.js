var places = [];
function clearPlaces()
{
    //remove info and marks (except hotel mark)
    directionsDisplay.setDirections({routes: []});
    for(var i=0 ; i < places.length ; i++)
        places[i].mark.setMap(null);
    if(system.place && system.place.info)
        system.place.info.close();
    places = [];
    //

}
function showPlaces(p)
{
    if(p == null || p.length == 0)
        return;
    clearPlaces();

    places = Object.assign([], p);
    ;
	showDiv('map');
	var bounds = new google.maps.LatLngBounds();
	bounds.extend(hotel.mark.position);
	var mark, icon;
	for(var i = 0; i < places.length; i++)
	{
        icon = 'images/' + i + '.png';
		mark = new google.maps.Marker({
			position: new google.maps.LatLng(places[i].lat, places[i].lng),
			map: map,
			animation: google.maps.Animation.DROP,
			icon: { 
				url:icon
			},

        });
        var info = new google.maps.InfoWindow({
			content: getHTMLPlaceLabel(places[i])
            });

        places[i].mark = mark;
        places[i].info = info;
        places[i].index = i;
        //Ver
        if(places[i].locality == hotel.locality)
            places[i].travel = 'WALKING';
        else
            places[i].travel = "DRIVING";
		bounds.extend(mark.position);
    }
    if(places.length == 1)
    {
        
        system.place = places[0];
        showPlaceFromTo(hotel, places[0]);
    }
    else
    {
        map.fitBounds(bounds);
        system.place = places[0];
        places[0].info.open(map, places[0].mark);
    }
}


function showPlaceFromTo(origin, destination)
{
    directionsDisplay.setDirections({routes: []});
	//map.setCenter({lat: destination.lat, lng:destination.lng});
	//map.setZoom(16);

	directionsDisplay.setMap(map);
	
	directionsService.route({
		origin: {lat: origin.lat, lng:origin.lng},
		destination: {lat: destination.lat, lng:destination.lng},
		travelMode: destination.travel
		}, function(response, status) {
			if (status === google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(response);
			} else {
				console.log('Directions request failed due to ' + status);
			}
		}
    );
    destination.info.open(map, destination.mark);
    map.setCenter({lat: destination.lat, lng:destination.lng});

}
function showPlace(p)
{
    if(system.frame != 'map')
        return;
    if(system.place && system.place.info)
        system.place.info.close();

    console.log('place photos:' + p.photos.length);
    system.place = p;
    showPlaceFromTo(hotel, p);
}
function gotoPlace(n)
{
    if(typeof(n) == 'string')
        n = n.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0);
    console.log('n=' + n);
    if(n < places.length)
        showPlace(places[n]);

}
function firstPlace()
{
    if(system.frame == 'map' && places.length > 1)
    {
        showPlace(places[0]);
    }
}
function nextPlace()
{
    if(system.frame == 'map' && places.length > 1)
    {
        //var i = 0;
        //if(system.place)
        var i = system.place.index;
        if(i < places.length - 1 )
            i++;
        else
            i = 0;
        showPlace(places[i]);
    }
}
function previousPlace()
{
    if(system.frame == 'map' && places.length > 1)
    {
        //var i = places.length;
        //if(system.place)
        var i = system.place.index;
        if(i > 0)
            i--;
        else
            i = places.length - 1;
        showPlace(places[i]);
    }
}

function getHTMLPlaceLabel(p)
{
	var icon_photo="", icon_video="";
    if(p.photos != undefined && p.photos.length > 0)
        icon_photo = '<img src="images/icon-photo.png" />';
		//icon_photo = '<i class="material-icons"  style="font-size:24px;color:black;">camera_alt</i>';
	if(p.videos != undefined && p.videos.length > 0)
        icon_video = '<img src="images/icon-video.png" />';
       //icon_video = '<i class="material-icons" style="font-size:24px;color:black;">play_circle_filled</i>';
    var address = '';
    if(p.vicinity)
        address = p.vicinity; else address = p.address;
	var content =
              '<div style="width:328;overflow:hidden;">' + 
				  '<h4>' + p.name + '</h4>' +
				  '<hr/>' +
                   '<table style="font-size:9pt;">' +
						'<tr><td>' + address + '</td></tr>' +
                        '<tr><td>Phone:' + p.phone + '</td></tr>';
                        //if(p.photos.length >0)
                            //content += '<tr><td>' + '<div style="width:320px;height:240px"><img style="width:100%; height:100%; object-fit:contain; border:1px solid black;" src="' + p.photos[0] + '"/>' + '</div></td></tr>';
                        content += '<tr><td>' + icon_photo + icon_video + '</td></tr>' +
                   '</table>' +
              '</div>';
	return(content);
}
function getHTMLHotelLabel()
{
	var icon_photo="", icon_video="";
    if(hotel.photos != undefined && hotel.photos.length > 0)
        icon_photo = '<img src="images/icon-photo.png" />';
		//icon_photo = '<i class="material-icons" style="font-size:24px;color:black;">alarm</i>';
	if(hotel.videos != undefined && hotel.videos.length > 0)
        icon_video = '<img src="images/icon-video.png" />';
    //icon_video = '<i class="material-icons" style="font-size:24px;color:black;">error_outline</i>';
    var address = '';
    console.log('icon:' + icon_photo);
    if(hotel.vicinity)
        address = hotel.vicinity; else address = hotel.address;
	var content =
              '<div style="width:328;overflow:hidden;">' + 
				  '<h4>' + hotel.name + '</h4>' +
				  '<hr/>' +
                   '<table style="font-size:9pt;">' +
						'<tr><td>' + address + '</td></tr>' +
						'<tr><td>Phone:' + hotel.phone + '</td></tr>';
		
                        content += '<tr><td>' + '<div style="width:320px;height:240px"><img style="width:100%; height:100%; object-fit:contain; border:1px solid black;" src="' + hotel.photos[0] + '"/>' + '</div></td></tr>';
                        content += '<tr><td>' + icon_photo + icon_video + '</td></tr>' +
                   '</table>' +
              '</div>';
	return(content);
}
function showHotel()
{
    console.log('show hotel');
    document.getElementById('content').innerHTML = '';
    showDiv('map');
    clearPlaces();
    console.log('clear places');
    google.maps.event.trigger(map, 'resize');
    if(!hotel.mark)
    {
        var mark = new google.maps.Marker({
            position: {lat: hotel.lat, lng:hotel.lng},
            map: map,
            animation: google.maps.Animation.DROP,
            icon: { 
                    url:'images/hotel-red.png'
                },
            optimized: false,
            zIndex: 1
        });
        console.log('post mark');
        var info = new google.maps.InfoWindow({
                content: getHTMLHotelLabel()
                });

        hotel.mark = mark;
        hotel.info = info;
    }
    hotel.mark.setMap(map);
	hotel.info.open(map, hotel.mark);

	map.setZoom(16);
	map.setCenter({lat: hotel.lat, lng:hotel.lng});
    system.place = hotel;
}
