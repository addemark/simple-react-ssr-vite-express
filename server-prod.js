import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import { defaultLanguage } from "./src/locales/index.js";

const app = express();
const port = process.env.PORT || 3030;

app.use(
  express.static(
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), "dist/client"),
    { index: false }
  )
);

app.use("*", async (req, res) => {
  try {
    // Detect language from Accept-Language header or query parameter
    const acceptLanguage = req.headers["accept-language"];
    const queryLang = req.query.lang;
    console.log("*******Detected language:", queryLang || acceptLanguage);
    const url = req.originalUrl;

    let language = defaultLanguage; // default language

    if (queryLang && availableLanguages.includes(queryLang)) {
      language = queryLang;
    } else if (acceptLanguage) {
      // Simple language detection from Accept-Language header
      if (acceptLanguage.includes("de")) language = "de";
      else if (acceptLanguage.includes("ro")) language = "ro";
      else if (acceptLanguage.includes("en")) language = "en";
    }

    const template = fs.readFileSync("./dist/client/index.html", "utf-8");
    const { render } = await import("./dist/server/entry-server.js");

    const html = template.replace(`<!--outlet-->`, render(url, language));
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  } catch (error) {
    res.status(500).end(error);
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}.`);
});
