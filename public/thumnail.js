var script = document.createElement('script');
script.src = 'http://jqueryjs.googlecode.com/files/jquery-1.2.6.min.js';
script.type = 'text/javascript';

var images = [
"./images/xmas.jpeg","./images/xmas1.jpeg","./images/xmas2.jpeg","./images/xmas3.jpeg","./images/xmas4.jpeg"];

function loadThumbs (images) {
	for(var i = 0 ; images.length(); i++){
		$('#thumbnails').addClass(thumbnails).add(images);
	}
}

loadThumbs(images);