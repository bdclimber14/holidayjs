function startCamera() {
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia || navigator.msGetUserMedia;
  window.URL = window.URL || window.webkitURL;

  var video;
  navigator.getUserMedia({
    video: true
  }, function(localMediaStream) {
    video = document.getElementById("myVideo");
    video.src = window.URL.createObjectURL(localMediaStream);
  }, function(error) {
    console.log(error);
  });

}

// click to create
  window.addEventListener('load', function(e){
    document.getElementById('button').addEventListener('click', function(e){
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');

      context.drawImage(video, 0, 0);
    });

  });