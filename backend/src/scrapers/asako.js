import puppeteer from "puppeteer";
import createMessage from "../services/sendMessage.js";

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

  console.log(JSON.stringify(stages, null, 2));

  // Match the list with the criteria
  const possibleMatch = stages.filter((stage) => stage.title.toLowerCase().includes(target)
  );

  if (possibleMatch.length > 0) {
    for (const stage of possibleMatch) {
      // Open new Page to the browser
      const fullDescriptionPage = await browser.newPage();
      await fullDescriptionPage.goto(stage.link);

      // Get the article tag
      const fullDescriptionText = await fullDescriptionPage.evaluate(() => {
        const descriptions = document.querySelectorAll("article div p");
        let description = "";
        descriptions.forEach((p) => {
          description += `${p.textContent}\n`;
        });

        return description;
      });

      // Format offer details
      const offerDetails = `${stage.title}\n\n Company: ${stage.company}\n\n Link: ${stage.link}\n\nDescription:\n${fullDescriptionText}`;

      // Send the offer details as a message
      await createMessage(offerDetails);
      console.log(`Message sent for: ${stage.title}`);

      // Close the page
      await fullDescriptionPage.close();
    }
  }

  await browser.close();
}

export { start };


