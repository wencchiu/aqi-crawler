const axios = require("axios");
const cheerio = require("cheerio");

const EPA_URL = process.env.EPA_URL || "https://airtw.epa.gov.tw/"

async function getAQIHtml() {
  const { data } = await axios.get(EPA_URL);
  return data;
}

async function selectAQIContent() {
  const aqiHtml = await getAQIHtml();
  const $ = cheerio.load(aqiHtml);
  const data = [], sites = [], aqiValue = [];
  $("option").each(function (i, e) {
    data[i] = $(e).text();
    // get AQI
    const tempStart = data[i].indexOf("=");
    const tempEnd = data[i].indexOf(")");
    const tempValue = data[i].slice(tempStart+1, tempEnd);
    const tempAQI = parseInt(tempValue, 10);
    if (tempAQI) {
      aqiValue.push(tempAQI);
    }
    // get sites
    const tempSite = [];
    for (var j = 0; j < data[i].length; j++) {
      if (data[i][j] !== "(") {
        tempSite.push(data[i][j]);
      } else if (!tempAQI) {
        break;
      } else {
        sites.push(tempSite.join(""));
        break;
      }
    }
  })
  return { data, sites, aqiValue };
}

module.exports = selectAQIContent;
