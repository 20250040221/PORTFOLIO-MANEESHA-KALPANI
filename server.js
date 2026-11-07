
require("dotenv").config();

const path = require("path");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, "public")));


const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


app.post("/contact", (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill in your name, email, and message." });
  }

  if (!EMAIL_REGEX.test(String(email).trim())) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter a valid email address." });
  }

  
  console.log("New contact message:");
  console.log({ name, email, message, receivedAt: new Date().toISOString() });

  return res.json({ success: true, message: "Thank you! Your message has been sent." });
});


app.get("/download-cv", (req, res) => {
  const cvPath = path.join(__dirname, "public", "my-cv.pdf");
  res.download(cvPath, "R-M-Maneesha-Kalpani-CV.pdf", (err) => {
    if (err && !res.headersSent) {
      res.status(404).send("CV not found. Please add public/my-cv.pdf.");
    }
  });
});


app.listen(PORT, () => {
  console.log(`Portfolio running at http://localhost:${PORT}`);
});
