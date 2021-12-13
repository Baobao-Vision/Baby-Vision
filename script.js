let video = document.getElementById("video");
console.log(video);
function startVideo() {
  navigator.mediaDevices
    .getUserMedia(
      { video: true }
      // (stream) => (video.srcObject = stream),
      // (e) => console.error(e)
    )
    .then((res) => (video.srcObject = res))
    .catch((err) => console.log(err));
}
startVideo();
