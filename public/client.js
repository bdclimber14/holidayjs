var f = Flates();

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL;

var video;
var photoLeft, photoRight, photoHeight = 0;
var currentThemeSrc = '';

function startCamera() {
  navigator.getUserMedia({
    video: true
  }, function(localMediaStream) {
    video = document.getElementById("myVideo");
    video.src = window.URL.createObjectURL(localMediaStream);
  }, function(error) {
    console.log(error);
  });

}

jQuery(function ($) {
  $('body').html(
    f.div({ id: 'wrapper'}) +
    f.div({ id: 'thumbnail'}) +
    f.div({ id: 'message'}) +
    f.div({ id: 'card'}) +
    f.div({ id: 'main'}) +
    f.div({ id: 'bottom'})
  );

  video = $('#myVideo');

  $('#main').append('<img id="background">').append('<video id="myVideo" autoplay></video>').append('<button id="capture">Capture</button>');


  startCamera();

  $('#thumbnail img').on('click', function (e) {
    updateTheme($(e.currentTarget));
  });

  $('#capture').on('click', function (e) {
    generateCard();
  });
});


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
  	var canvas = $('#canvas')[0];
  	var context = canvas.getContext('2d');

	// Get the snapshot image from video
  	var img = new Image();
	img.onload = function(){
  		context.drawImage(img, 0, 0);
	};
	img.src = currentThemeSrc;

	context.drawImage(video, 0,  0);

	var cardData = canvas.toDataURL();
	$('#card').html('<img src="' + cardData + '" width="' + $('#background').width() + '" height="' + $('#background').height() + '" />');





	var img = document.getElementById('save');

	img.src = imgData;
	// Add theme to the temp canvas
	// Add photo to temp canvas

	// Capture temp canvas in data stream and add to new canvas
	// Replace live preview with new image... hide video?


}
