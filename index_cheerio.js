const axios = require("axios");
const cheerio = require("cheerio");

const fetchEvents = async () => {
  try {
    const response = await axios.get(
      "https://www.lausanne-tourisme.ch/wp/wp-admin/admin-ajax.php?action=filter_events&lang=fr&starting_date=30%2F01%2F2023&ending_date=05%2F02%2F2023&text_search=&tags%5B%5D=36"
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
