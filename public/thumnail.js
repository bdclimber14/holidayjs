var images = [
"./images/xmas.jpeg","./images/xmas1.jpeg","./images/xmas2.jpeg","./images/xmas3.jpeg","./images/xmas4.jpeg"];

function loadThumbs (images) {
	for(var i = 0 ; images.length(); i++){
		$('#thumbnail').addClass(thumbnails).append(images);
	}
}

loadThumbs(images);