const express = require("express");
const aqi = require("../crawler/aqi");

const app = express();

app.get("/", (req, res) => {
  res.json("Hello World");
});

app.listen(3000, () => {
  console.log("listening on port 3000!");
})

app.get("/aqi", async(req, res) => {
  const { data, sites, aqiValue } = await aqi();
  res.send({ data, sites, aqiValue })
})
