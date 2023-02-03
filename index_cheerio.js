const axios = require("axios");
const cheerio = require("cheerio");

const startDate = "30%2F01%2F2023";
const endDate = "05%2F02%2F2023";

const fetchEvents = async () => {
  try {
    const response = await axios.get(
      `https://www.lausanne-tourisme.ch/wp/wp-admin/admin-ajax.php?action=filter_events&lang=fr&starting_date=${startDate}&ending_date=${endDate}&text_search=&tags%5B%5D=36`
    );
    const json = response.data;
    const html = json.html;
    const $ = cheerio.load(html);
    let events = [];

    $(".teaser").each((index, el) => {
      const title = $(el).find(".teaser__title").text().trim();
      const link = $(el).find("a").attr("href");
      const date = $(el).find(".date__date").text();
      const location = $(el).find(".teaser__subtitle").text().trim();

      const event = {
        title: title,
        link: link,
        date: date,
        location: location,
      };

      events.push(event);
    });
    return events;
  } catch (err) {
    console.error(err);
  }
};

fetchEvents().then((events) => console.log(events));
