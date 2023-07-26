/// Intialize Eaxpress
const express = require("express");
const app = express();

/// Global Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('upload'));
const cors = require('cors');
app.use(cors());

/// Required Module
const auth = require('./routes/Auth');
const meds = require('./routes/Meds');
const patients = require('./routes/Patients');
const categories = require('./routes/Categories');
const orders = require('./routes/Orders');

/// Run the App
app.listen(4000, "localhost", () => {
    console.log("Server is Running");
});

/// API Routes {End Points}
app.use("/auth", auth);
app.use("/meds", meds);
app.use("/patients", patients);
app.use("/categories", categories);
app.use("/orders", orders);