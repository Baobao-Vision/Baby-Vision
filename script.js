let video = document.getElementById("video");
console.log(video);
function startVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((res) => (video.srcObject = res))
    .catch((err) => console.log(err));
}
startVideo();
