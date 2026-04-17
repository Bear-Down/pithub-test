const {onRequest} = require("firebase-functions/v2/https");
const {setGlobalOptions} = require("firebase-functions/v2");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");

setGlobalOptions({ maxInstances: 10 });

const app = express();

// Allow cross-origin requests from your local React dev server
app.use(cors({ origin: true }));

app.get("/ping", (req, res) => {
    logger.info("Ping Request Received");
    res.json("PitHub Server is up and running via Cloud Functions");
});

// This "api" name must match the name used in firebase.json rewrites
exports.api = onRequest(app);
