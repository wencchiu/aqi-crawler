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
  const data = [];
  $("option").each(function (i, e) {
    data[i] = $(e).text();
    console.log(data);
  })

  const site = data;
  return { site };
}

module.exports = selectAQIContent;


// [class^="category-section__FlexItem"]
//.each()

// category-section__CategoryName 分類
// category-section__Title 標題

// section-name__SectionName
