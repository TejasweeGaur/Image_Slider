const express = require('express');
const router = express.Router();
const axios = require('axios');
const apiCache = require('apicache');
require('dotenv').config();

const PEXELS_BASE_URL = process.env.PEXELS_BASE_URL;
const PEXELS_KEY_VALUE = process.env.PEXELS_KEY_VALUE;
let cache = apiCache.middleware;

// SINGLE IMAGE
router.get("/getPexelsImages", cache('10 minutes'), (req, res) => {
    const url = new URL(PEXELS_BASE_URL);
    const headers = {
        "Authorization": PEXELS_KEY_VALUE
    };
    url.searchParams.set("query", "ocean");
    url.searchParams.set("orientation", "portrait");
    url.searchParams.set("locale", "en-US");
    url.searchParams.set("page", "1");
    url.searchParams.set("per_page", "10");
    try {
        axios.get(url, { headers }).then(response => {
            let data = response.data;
            res.status(200).send(data);
        }).catch(err => { console.error(err); });
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;