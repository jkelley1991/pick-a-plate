require("dotenv").config();

const express = require("express");
const app = express();
const axios = require("axios");
const apiUrl = "https://api.yelp.com/v3/businesses/search?location=78759&sort_by=best_match&limit=20";

console.log("token", process.env.YELP_API_TOKEN);

app.get("/", (req, res) => {
  res.send("Hello API");
});

app.get("/surprise", async (req, res, next) => {
  try {
    if (!process.env.YELP_API_TOKEN) {
      throw new Error("You forgot to set YELP_API_TOKEN");
    }
    const result = await axios.get(apiUrl, {
      headers: {
        "Authorization": process.env.YELP_API_TOKEN,
      },
    });
    res.json(result.data);
  } catch (err) {
    next(err);
  }
});

app.listen(3001, () => {
  console.log("started");
});