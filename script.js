let video = document.getElementById("video");

//models
Promise.all([
  //face detector
  faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
  //detects the features of the face
  faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
  //detects the box around the face
  faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  //detects the facial expression
  faceapi.nets.faceExpressionNet.loadFromUri("/models"),
]).then(startVideo);

function startVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => (video.srcObject = stream))
    .catch((err) => console.log(err));
}
video.addEventListener("play", () => {
  const canvas = faceapi.createCanvasFromMedia(video);
  document.body.append(canvas);
  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);

  setInterval(async () => {
    const faces = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();

    const resizedDetections = faceapi.resizeResults(faces, displaySize);
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

    console.log("faces", faces);

    if (faces.length === 0) {
      let sendAlert = new Audio("./assets/warning.mp3");
      sendAlert.play();
      alert("Baby's face is covered!");
    }
  }, 100);
});
