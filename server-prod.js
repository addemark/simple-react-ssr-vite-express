import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import { availableLanguages, defaultLanguage } from "./src/locales/index.js";

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

    const { html: appHtml, preloadedState } = await render(url, language);

    // Inject the preloaded state and language into the HTML
    const stateScript = `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(
      preloadedState
    ).replace(/</g, "\\u003c")}</script>`;

    const languageScript = `<script>window.__SSR_LANGUAGE__ = ${JSON.stringify(
      language
    )};</script>`;

    const html = template
      .replace(`<!--outlet-->`, appHtml)
      .replace(`</head>`, `${stateScript}${languageScript}</head>`);

    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  } catch (error) {
    console.error("SSR Error:", error);
    res.status(500).end(error.message || "Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}.`);
});
