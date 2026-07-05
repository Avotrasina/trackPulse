async function getFullDescription(stage, browser) {
  const fullDescriptionPage = await browser.newPage();

  try {
    await fullDescriptionPage.goto(stage.link, { waitUntil: "networkidle2" });

    return await fullDescriptionPage.evaluate(() => {
      const descriptions = Array.from(document.querySelectorAll("article div p"));
      return descriptions
        .map((p) => p.textContent.trim())
        .filter(Boolean)
        .join("\n");
    });
  } finally {
    await fullDescriptionPage.close();
  }
}

export default getFullDescription;