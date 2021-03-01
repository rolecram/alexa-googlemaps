function zoomIn()
{
	if(system.frame == 'map')
	{
		var z = map.getZoom();
		if(z < 26)
			map.setZoom(z + 2);	
	}
}
function zoomOut()
{
	if(system.frame == 'map')
	{
		var z = map.getZoom();
		if(z > 2)
			map.setZoom(z - 2);	
	}
}
function zoomRestore()
{
	if(system.frame == 'map' && system.place != null)
	{
        map.setZoom(16);
        map.setCenter({lat: system.place.lat, lng:system.place.lng});
	}

}
function mapUp()
{
	if(system.frame == 'map')
		map.panBy(0,-200); // (x,y)
}
function mapDown()
{
	if(system.frame == 'map')
		map.panBy(0,200); // (x,y)
}
function mapLeft()
{
	if(system.frame == 'map')
		map.panBy(-200,0); // (x,y)
}
function mapRight()
{
	if(system.frame == 'map')
		map.panBy(200,0); // (x,y)
}

function hideMapInfo()
{
	if(system.frame == 'map' && system.place != null)
	{
        system.place.info.close();
	}

}
function showMapInfo()
{
	if(system.frame == 'map' && system.place != null)
	{
        system.place.info.open(map,system.place.mark);
	}

}