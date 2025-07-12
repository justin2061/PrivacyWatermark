import { setupVite, serveStatic, log } from "./vite";
import express from "express";
import { createServer } from "http";

const app = express();

(async () => {
  const server = createServer(app);

  if (process.env.NODE_ENV === "development") {
    try {
      await setupVite(app, server);
    } catch (error) {
      log(`Error setting up Vite: ${error}`);
      process.exit(1);
    }
  } else {
    serveStatic(app);
  }

  const port = 5000;
  server.listen(port, "0.0.0.0", () => {
    log(`serving watermark tool on port ${port}`);
  });
})();