const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

// Corrected knex configuration
const db = knex({
  client: "pg", // PostgreSQL client
  connection:
    "postgresql://face_reco_db_6iyn_user:p3dIEPRH3ZuqmMw4217rGlZt4TYdfMfX@dpg-css6vbi3esus739in04g-a/face_reco_db_6iyn?ssl=true",
});

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// app.post("/signin", (req, res) => signin.handleSignin(req, res, db, bcrypt));
app.post("/signin", (req, res) => {
  console.log("Request body:", req.body);
  res.json({ status: "success" });
});

app.post("/register", (req, res) =>
  register.handleRegister(req, res, db, bcrypt)
);
app.get("/profile/:id", (req, res) => profile.handleProfileGet(req, res, db));
app.put("/image", (req, res) => image.handleImage(req, res, db));
app.post("/imageurl", (req, res) => image.handleApiCall(req, res));

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
