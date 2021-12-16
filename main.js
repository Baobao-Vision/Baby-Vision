// const express = require("express");
// const app = express();

// async function quickstart() {
//   // Imports the Google Cloud client library
//   const vision = require("@google-cloud/vision");

//   // Creates a client
//   const client = new vision.ImageAnnotatorClient({
//     keyFilename: "./ApiKey.json",
//   });

//   // Performs label detection on the image file
//   const [result] = await client.labelDetection("./assets/baby.jpeg");
//   const labels = result.labelAnnotations;
//   console.log("Labels:");
//   //console.log("face", result.faceAnnotations);
//   labels.forEach((label) => console.log(label.description));
// }
// quickstart();

// app.listen(3000, "127.0.0.1", () => console.log("Server running"));
