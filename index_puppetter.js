const puppeteer = require("puppeteer");

(async function () {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.lausanne-tourisme.ch/fr/evenements/");

  const data = await page.evaluate(function () {
    const events = document.querySelectorAll(".teaser__body");
    const array = [];

    for (i = 0; i < events.length; i++) {
      array.push({
        title: events[i].querySelector(".teaser__title").innerText,
        // date: events[i].querySelector(".date__date").innerText,
      });
    }
    return array;
  });

  console.log(data);
})();
