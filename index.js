const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(formidable());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* ROUTES */
const userRoutes = require("./routes/user");
app.use(userRoutes);

app.all("*", (req, res) => {
  console.log("Route is not defined");
  res.status(400).json({ message: "Page not found" });
});

/* SERVER */
app.listen(process.env.PORT, () => {
  console.log(`Server has started on port ${process.env.PORT}`);
});
