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
      let sendAlert = new Audio("./assets/beep.mp3");
      sendAlert.play();
      alert("Baby's face is covered!");
    }
  }, 100);

  console.log("faceapi.detectALlFaces", faceapi.detectAllFaces);
  //   if (faces.length <= 0) {
  //     let sendAlert = new Audio("./assets/beep.mp3");
  //     sendAlert.play();
  //     alert("Baby's face is covered!");
  //   }
  //   for (const face of faces) {
  //     const features = {
  //       jaw: face.landmarks.positions.slice(0, 17),
  //       eyebrowLeft: face.landmarks.positions.slice(17, 22),
  //       eyebrowRight: face.landmarks.positions.slice(22, 27),
  //       noseBridge: face.landmarks.positions.slice(27, 31),
  //       nose: face.landmarks.positions.slice(31, 36),
  //       eyeLeft: face.landmarks.positions.slice(36, 42),
  //       eyeRight: face.landmarks.positions.slice(42, 48),
  //       lipOuter: face.landmarks.positions.slice(48, 60),
  //       lipInner: face.landmarks.positions.slice(60),
  //     };
  // }
});
