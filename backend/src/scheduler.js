import cron from "node-cron";
import { start } from "./scrapers/asako.js";

// Run the scraper immediately once, then every 4 hours
export function runScraper() {
  const run = async () => {
    try {
      console.log("Starting scheduled scraper run...");
      await start();
    } catch (error) {
      console.error("Scraper run failed:", error);
    }
  };

  run();
  cron.schedule("0 */4 * * *", run);
}
