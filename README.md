# Baby-Vision

<script
  type="text/javascript"
  src="https://cdnjs.cloudflare.com/ajax/libs/webcamjs/1.0.24/webcam.js"
></script>
<!-- CSS -->
<style>
  #my_camera {
    width: 320px;
    height: 240px;
    border: 1px solid black;
  }
</style>

<!-- -->
<div id="my_camera"></div>
<input type="button" value="Take Snapshot" onclick="take_snapshot()" />

<div id="results"></div>

<!-- Code to handle taking the snapshot and displaying it locally -->
<script language="JavaScript">
  // Configure a few settings and attach camera
  Webcam.set({
    width: 500,
    height: 340,
    image_format: "jpeg",
    jpeg_quality: 90,
  });
  Webcam.attach("#my_camera");

  // preload shutter audio clip
  var shutter = new Audio();
  shutter.autoplay = true;
  shutter.src = navigator.userAgent.match(/Firefox/)
    ? "shutter.ogg"
    : "shutter.mp3";

  function take_snapshot() {
    // play sound effect
    shutter.play();

    // take snapshot and get image data
    Webcam.snap(function (data_uri) {
      // display results in page
      document.getElementById("results").innerHTML =
        '<img src="' + data_uri + '"/>';
    });
  }
</script>
