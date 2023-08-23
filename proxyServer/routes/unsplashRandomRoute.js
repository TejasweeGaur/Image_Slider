const express = require('express');
const router = express.Router();
const axios = require('axios');
const apiCache = require('apicache');
require('dotenv').config();

const UNSPLASH_BASE_URL = process.env.BASE_URL;
const SINGLE_PHOTO_ENDPOINT = process.env.SINGLE_PHOTO_ENDPOINT;
const RANDOM_PHOTO_ENDPOINT = process.env.RANDOM_PHOTO_ENDPOINT;
const KEY_NAME = process.env.KEY_NAME;
const KEY_VALUE = process.env.KEY_VALUE;
let cache = apiCache.middleware;

// SINGLE IMAGE
router.get("/getImages", cache('10 minutes'), (req, res) => {
    const url = new URL(`${UNSPLASH_BASE_URL}${SINGLE_PHOTO_ENDPOINT}`);
    url.searchParams.set(KEY_NAME, KEY_VALUE);
    url.searchParams.set("order_by", "oldest");
    try {
        axios.get(url).then(response => {
            let data = response.data;
            res.status(200).send(data);
        }).catch(err => { console.error(err); });
    } catch (err) {
        console.error(err);
    }
});

// RANDOM IMAGES 
router.get("/getRandomImages", (req, res) => {
    const url = new URL(`${UNSPLASH_BASE_URL}${RANDOM_PHOTO_ENDPOINT}`);
    url.searchParams.set(KEY_NAME, KEY_VALUE);
    try {
        axios.get(url).then(response => {
            let data = response.data;
            res.status(200).send(data);
        }).catch(err => { console.error(err); });
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;