
var slideIndex = 1;
function showPhotos()
{
	var p = system.place;
    if(p == null || p.photos.length == 0)
    {
        showWarning('There is no photos here');
        return;
    }
	console.log('there are photos in the object name:' + p.photos.length);	
    document.getElementById('content').setAttribute('content','photos');

    var numbers = document.createElement('div');
    numbers.setAttribute('id','idNumbers');
    numbers.style.fontWeight = '400';
    numbers.style.color = 'white';
    numbers.style.marginLeft = '40px';
    numbers.style.textAlign = 'left';
    numbers.innerText = '1 / ' + p.photos.length;
    document.getElementById('content').appendChild(numbers); 


	var container = document.createElement('div');
	container.setAttribute('class', 'slideshow-container');


	for(var i = 0 ; i < p.photos.length ; i++)
	{
		console.log('create element');
		var d1 = document.createElement("div");
		d1.setAttribute('class', 'mySlides fade');

		var d2 = document.createElement("div");
		d2.setAttribute('class', 'numbertext');
	
		var d3 = document.createElement("div");
		d3.setAttribute('class', 'text');
		d3.innerText = '';

		
		var img = document.createElement('img');
		img.setAttribute('src', p.photos[i]);
		
		d1.appendChild(d2);
		d1.appendChild(img);
		d1.appendChild(d3);
		container.appendChild(d1);
    }
    document.getElementById('content').innerHTML = '';
    document.getElementById('content').appendChild(numbers); 
    document.getElementById('content').appendChild(container); 
    

    //console.log('html fragment:' + document.getElementById('content').outerHTML);
	showDiv('content');
	slideIndex = 1;
	showSlides(1);
}
function nextPhoto()
{
    if(system.frame == 'content' 
        && document.getElementById('content').getAttribute('content') == 'photos' 
        && system.place && system.place.photos.length > 0)
    {

        console.log('next photo');
        showSlides(++slideIndex);
    }
}
function previousPhoto()
{
    if(system.frame == 'content' 
        && document.getElementById('content').getAttribute('content') == 'photos' 
        && system.place && system.place.photos.length > 0)
    	showSlides(--slideIndex);
}
function showSlides(n) {
	var i;
	var slides = document.getElementsByClassName("mySlides");
	//var dots = document.getElementsByClassName("dot");
	if (n > slides.length) {slideIndex = 1}    
	if (n < 1) {slideIndex = slides.length}
	console.log('slide converted:' + slideIndex);
	for (i = 0; i < slides.length; i++) {
	  slides[i].style.display = "none";  
	}
	//for (i = 0; i < dots.length; i++) {
	  //dots[i].className = dots[i].className.replace(" active", "");
	//}
    slides[slideIndex-1].style.display = "block";  
    document.getElementById('idNumbers').innerText = slideIndex + ' / ' + slides.length;

	//dots[slideIndex-1].className += " active";
}
