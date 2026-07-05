import puppeteer from "puppeteer";
import createMessage from "../services/sendMessage.js";
import getFullDescription from "../services/getFullDescription.js";
import { saveOfferIfNotExists } from "../services/scraperService.js";
import formatOffer from "../utils/formatOffer.js";

const offerType = "stages";
const target = "développeur";

async function start() {
  const URL = `https://www.asako.mg/${offerType}`;

  const browser = await puppeteer.launch();

  const stagePage = await browser.newPage();
  // Navigate to the URL
  await stagePage.goto(URL);

  // Get all Internships available
  const stages = await stagePage.evaluate(() => {
    const cards = Array.from(
      document.querySelectorAll('a[href^="/annonces/"]'),
    );

    return cards.map((card) => {
      const link = card.href;

      // Title: the div with classes "font-heading text-[15px] font-semibold ..."
      const titleEl = card.querySelector("div.font-heading.text-\\[15px\\]");
      const title = titleEl ? titleEl.textContent.trim() : null;

      // Company: the sibling div right after the title div (inline color style)
      const companyEl = titleEl ? titleEl.nextElementSibling : null;
      const company = companyEl ? companyEl.textContent.trim() : null;

      return { link, company, title };
    });
  });

  //console.log(JSON.stringify(stages, null, 2));

  // Match the list with the criteria
  const possibleMatch = stages.filter((stage) =>
    stage.title?.toLowerCase().includes(target.toLowerCase())
  );

  if (possibleMatch.length > 0) {
    for (const stage of possibleMatch) {
      const fullDescription = await getFullDescription(stage, browser);
      const offerResult = {
        title: stage.title,
        type: 'stage',
        source: 'https://asako.mg',
        link: stage.link,
        description: fullDescription,
        company: stage.company
      }

      // Save offer if not exists in the db
      const createdOffer = await saveOfferIfNotExists(offerResult);
      if (createdOffer) {
        // Send it via Twilio
        await createMessage(formatOffer(offerResult));
      }
    }
  }

  await browser.close();
}

export { start };


