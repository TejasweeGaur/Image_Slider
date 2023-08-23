const express = require('express');
const cors = require('cors');
const rate_limit = require('express-rate-limit');
const unsplashRandomRouter = require('./routes/unsplashRandomRoute.js');
const pexelsRouter = require('./routes/pexelsRouter.js');
require('dotenv').config();

const app = express();

// Setting the PORT to run the server on.
const PORT = process.env.PORT || 5000;

// Setting up rate limiter to limit the number of requests per given time.
const limiter = rate_limit({
    windowMs: process.env.API_RATE_LIMIT, // 10 mins
    max: process.env.API_MAX_REQUESTS // 10 requests max in 10 mins
});

// Telling server to use limiter
app.use(limiter);

// Telling the application to render my static UI on localhost:PORT
app.use(express.static("../front_end"));

// Telling application to forward the requests coming from localhost:PORT/api to the unsplashRandomRouter
app.use("/api", unsplashRandomRouter);
app.use("/api", pexelsRouter);

// Setting up Cross Origin Reasource Sharing for the data fetch from Unsplash
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});