import cron from "node-cron";
import { start } from "./scrapers/asako";

cron.schedule("0 */4 * * *", async () => {
  try {
    console.log("Starting scheduled scraper run...");
    await start();
  } catch (error) {
    console.error("Scraper run failed:", error);
  }
});