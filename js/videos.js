var player = null;
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
function videoPause()
{
	if(player != null)
		player.pauseVideo();
}
function videoMute()
{
	if(player != null)
		player.mute();
}
function videoUnmute()
{
	if(player != null)
		player.unMute();
}
function videoSize()
{
	//player.setSize(800,600);
	//alert(YT.PlayerState.PLAYING);
	if(player != null)
		alert(player.getPlayerState());
}
function onYouTubeIframeAPIReady() {
    console.log('Youtube API ready');
}
function onPlayerReady(event) {

	console.log('onPlayerReady Event');
	console.log(document.getElementById('idplayer').outerHTML);

    player.setLoop(true);
    player.setVolume(10);
    player.playVideo();
}

function onPlayerStateChange(event) {

}
function setPlayerById(id)
{
	player.loadVideoById(videoId)
}
function setPlayer(id)
{
	console.log('set player');
    player = new YT.Player('idplayer', {
        width: '853',
        height: '480',
        videoId: id,
        origin: 'http://poc.hotelclass.me',
        playerVars: {
            controls: 0,
            showinfo: 0,
            wmode: 'opaque',
            autoplay: 0,
        },
        events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
        }
    });

}
var videoIndex = 0;
async function videoPlay()
{
    console.log('video play');
    var p = system.place;

    if(p == null || p.videos.length == 0)
    {
        showWarning('There is no videos here');
        return;
    }
    else    
	{

        if(arguments.length > 0)
            videoIndex = arguments[0];
            else {
                videoIndex = 0;
                showDiv('content');
            }

        document.getElementById('content').setAttribute('content','videos');
        document.getElementById('content').innerHTML = '<div style="height:100%;"><center><div id="idplayer" /></center></div>';

        var numbers = document.createElement('div');
        numbers.setAttribute('id','idNumbers');
        numbers.style.fontWeight = '400';
        numbers.style.color = 'white';
        numbers.style.marginLeft = '40px';
        numbers.style.textAlign = 'left';
        numbers.innerText = (videoIndex + 1) + ' / ' + p.videos.length;
        document.getElementById('content').insertBefore(numbers, document.getElementById('content').childNodes[0]);
    

        console.log(document.getElementById('content').outerHTML);

		var id = system.place.videos[videoIndex];
        setPlayer(id);
	}

}
function nextVideo()
{
    if(system.frame == 'content' 
        && document.getElementById('content').getAttribute('content') == 'videos' 
        && system.place && system.place.videos.length > 0)
    {

        if( videoIndex < system.place.videos.length - 1)
            videoIndex++;
        else
            videoIndex = 0
        videoPlay(videoIndex);
    }
}
function previousVideo()
{
    if(system.frame == 'content' 
        && document.getElementById('content').getAttribute('content') == 'videos' 
        && system.place && system.place.videos.length > 0)
    {
        if( videoIndex > 0)
            videoIndex--;
        else
            videoIndex = system.place.videos.length - 1;
        videoPlay(videoIndex);
    }
 }
