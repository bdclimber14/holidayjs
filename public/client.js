var f = Flates()

jQuery(function ($) {
  $('body').html(
    f.div({ id: 'wrapper'}) +
    f.div({ id: 'thumbnail'}) +
    f.div({ id: 'message'}) +
    f.div({ id: 'main'}) +
    f.div({ id: 'bottom'})
  )
})
var photoLeft, photoRight, photoHeight = 0;
var currentThemeSrc = '';


var updateTheme = function($image) {
	currentThemeSrc = $image.src();
	$('#background').attr('src', currentThemeSrc);
	photoLeft = $image.data('left');
	photoRight = $image.data('top');
	photoHeight = $image.data('height');

	// reposition video of face
	video.css({ left: photoX, top: photoY, height: photoHeight });
}

var generateCard = function() {
  	$('#bottom').html('<canvas id="canvas" height="' + $('#background').height() + '" width="' + $('#background').width() + '"></canvas>');
  	
	// Create temporary canvas where both video and theme will go in
  	var canvas = $('#canvas');
  	var context = canvas.getContext('2d');

	// Get the snapshot image from video
  	var img = new Image();
	img.onload = function(){
  		context.drawImage(img, 0, 0);
	};
	img.src = currentThemeSrc;

	context.drawImage(video, photoLeft, photoRight);


	// Add theme to the temp canvas
	// Add photo to temp canvas

	// Capture temp canvas in data stream and add to new canvas
	// Replace live preview with new image... hide video?


}
