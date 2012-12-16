var f = Flates();

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL;

var video;
var photoLeft, photoTop, photoHeight = 0;
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
  
//thumbnails
var images = [
  {
    'src': "/image/xmas.jpg",
    'top': 25,
    'left': 208,
    'height': 100
  },  {
    'src': "/image/xmas1.jpg",
    'top': 1,
    'left': 200,
    'height': 100
  },  {
    'src': "/image/xmas2.jpg",
    'top': 31,
    'left': 116,
    'height': 150
  },  {
    'src': "/image/xmas3.jpg",
    'top': 0,
    'left': 155,
    'height': 140
  },  {
    'src': "/image/xmas4.jpg",
    'top': 160,
    'left': 225,
    'height': 120
  }
  ];

function loadThumbs () {
	$('#thumbnail').append('<p>Pick a holiday theme</p>');
	for(var i = 0 ; i < images.length; i++) {
		var img = $('<img />', {
      'src': images[i].src,
      'data-top': images[i].top,
      'data-left': images[i].left,
      'data-height': images[i].height
    });

    $('#thumbnail').append(img);
	}
}

loadThumbs();

//message
jQuery(function ($) {
	$('#message').html('<textarea placeholder="Write a greeting..." rows="2" cols="60" id="greeting"></textarea>');
});




  video = $('#myVideo');

  $('#main').append('<div><button id="capture">Preview Card</button></div>').append('<img id="background">').append('<video id="myVideo" autoplay></video>');


  startCamera();

  $('#thumbnail img').on('click', function (e) {
    updateTheme($(e.currentTarget));
  });

  updateTheme($($('#thumbnail img')[0]));

  $('#capture').on('click', function (e) {
    generateCard();
  });

  $(document).on('click', '#redo', function() {
  	redo();
  });
  $(document).on('click', '#save', function() {
  	save();
  });
});


var updateTheme = function($image) {
	currentThemeSrc = $image.attr('src');
	$('#background').attr('src', currentThemeSrc);
	photoLeft = $image.data('left');
	photoTop = $image.data('top');
	photoHeight = $image.data('height');

	// reposition video of face
	$(video).css({ left: photoLeft, top: photoTop, height: photoHeight });
}

var generateCard = function() {
  	$('#bottom').html('<canvas id="canvas" height="500px" width="500px"></canvas>');
  	
	// Create temporary canvas where both video and theme will go in
  	var canvas = $('#canvas')[0];
  	var context = canvas.getContext('2d');

	// Get the snapshot image from video
  	var img = new Image();
	img.src = currentThemeSrc;
	console.log(img.src);
	img.onload = function(){
		console.log('load');
  		context.drawImage(img, 0, 0);

		context.drawImage(video, photoLeft, photoTop, photoHeight, photoHeight);
		context.fillText($('#greeting').val(), 25, 400);
		

		var cardData = canvas.toDataURL();
		$('#card').html('<img id="card-data" src="' + cardData + '" width="' + $('#background').width() + '" height="' + $('#background').height() + '" />');
		$('#card').append('<button id="redo">Redo</button><button id="save">Save</button>');
	  	
		// Add theme to the temp canvas
		// Add photo to temp canvas

		// Capture temp canvas in data stream and add to new canvas
		// Replace live preview with new image... hide video?

		$('#main').hide();
		$('#card').show();
	};
}

var save = function() {
	// upload
  var imgData = $('#card-data').attr('src').replace(/^data:image\/png;base64,/, "")
  console.log(imgData)
	$.post('/upload', {
		file: imgData
	}).success(function(data) {
		window.open('/display');
	});
	redo();
};
var redo = function() {
	$('#card').hide().empty();
	$('#main').show();
}
