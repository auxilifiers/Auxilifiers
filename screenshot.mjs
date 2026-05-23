import { chromium } from 'playwright';

const sizes = [
  { name: '375', w: 375, h: 812 },
  { name: '768', w: 768, h: 1024 },
];

const browser = await chromium.launch();

for (const size of sizes) {
  const page = await browser.newPage({ viewport: { width: size.w, height: size.h } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(4000);
  await page.screenshot({ path: `.screenshots/mob-${size.name}-hero.png`, fullPage: false });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.2));
  await page.waitForTimeout(500);
  await page.screenshot({ path: `.screenshots/mob-${size.name}-services.png` });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.5));
  await page.waitForTimeout(500);
  await page.screenshot({ path: `.screenshots/mob-${size.name}-pillars.png` });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  await page.screenshot({ path: `.screenshots/mob-${size.name}-footer.png` });
  // Full page
  await page.screenshot({ path: `.screenshots/mob-${size.name}-full.png`, fullPage: true });
  await page.close();
}

await browser.close();
console.log('Done');
