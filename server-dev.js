import fs from "fs";
import express from "express";
import { createServer } from "vite";
import { availableLanguages, defaultLanguage } from "./src/locales/index.js";

const app = express();
const port = process.env.PORT || 3030;

const vite = await createServer({
  server: {
    middlewareMode: true,
  },
  appType: "custom",
});

app.use(vite.middlewares);

app.use("*", async (req, res) => {
  const url = req.originalUrl;

  try {
    // Detect language from Accept-Language header or query parameter
    const acceptLanguage = req.headers["accept-language"];
    const queryLang = req.query.lang;

    let language = defaultLanguage; // default language

    if (queryLang && availableLanguages.includes(queryLang)) {
      language = queryLang;
    } else if (acceptLanguage) {
      // Simple language detection from Accept-Language header
      if (acceptLanguage.includes("ro")) language = "ro";
      else if (acceptLanguage.includes("de")) language = "de";
      else if (acceptLanguage.includes("en")) language = "en";
    }

    const template = await vite.transformIndexHtml(
      url,
      fs.readFileSync("index.html", "utf-8")
    );
    const { render } = await vite.ssrLoadModule("/src/entry-server.jsx");

    const { html: appHtml, preloadedState } = render(url, language);

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
