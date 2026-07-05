import "dotenv/config";
import express from "express";
import cors from "cors";
import { runScraper } from "./scheduler.js";
import initDatabase from "./db/init.js";

const app = express();
app.use(express.json());
app.use(cors());

// Init the database
await initDatabase();
// Entry Point
runScraper();

export default app;