var f = Flates();

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL;

var video;

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
    f.div({ id: 'thumbnail'}) +
    f.div({ id: 'message'}) +
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
