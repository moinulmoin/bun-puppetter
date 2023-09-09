import puppeteer from "puppeteer";

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
    headless: false,
  });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto("https://duckduckgo.com/", {
    waitUntil: "networkidle2",
  });

  await page.waitForSelector("#searchbox_homepage");

  await page.screenshot({ path: "duckduckgo-homepage.png" });

  await page.type(`[aria-label="Search with DuckDuckGo"]`, "bun.sh", { delay: 300 });

  await page.keyboard.press("Enter");

  await page.waitForSelector(".react-results--main");

  await page.screenshot({ path: "duckduckgo-searchresults.png" });

  await browser.close();
})();
