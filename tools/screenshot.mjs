// Renders public bsky.app pages with and without a theme file, for before/after checks.
//   cd tools && npm install && node screenshot.mjs ../TangerineBlue.css [light|dark]
// Output: tools/out/<view>__stock__<scheme>.png and <view>__themed__<scheme>.png
import { chromium } from 'playwright';
import fs from 'node:fs';

const [cssFile, scheme = 'light'] = process.argv.slice(2);
if (!cssFile) { console.error('usage: node screenshot.mjs <theme.css> [light|dark]'); process.exit(1); }
const css = fs.readFileSync(cssFile, 'utf8');
fs.mkdirSync('out', { recursive: true });

const browser = await chromium.launch();
for (const themed of [false, true]) {
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 1000 }, deviceScaleFactor: 2, colorScheme: scheme, locale: 'en-US',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
  });
  const page = await ctx.newPage();
  const tag = themed ? 'themed' : 'stock';
  async function settle() {
    await page.waitForTimeout(4500);
    const close = page.locator('[aria-label="Close welcome modal"]').first();
    if (await close.count()) { await close.click().catch(() => {}); await page.waitForTimeout(500); }
    if (themed) { await page.addStyleTag({ content: css }); await page.waitForTimeout(800); }
  }
  await page.goto('https://bsky.app/profile/bsky.app', { waitUntil: 'domcontentloaded' }); await settle();
  await page.screenshot({ path: `out/profile__${tag}__${scheme}.png` });
  const postHref = await page.evaluate(() => document.querySelector('[data-testid^="feedItem-by-"] a[href*="/post/"]')?.getAttribute('href') ?? null);
  await page.goto('https://bsky.app/', { waitUntil: 'domcontentloaded' }); await settle();
  await page.screenshot({ path: `out/feed__${tag}__${scheme}.png` });
  if (postHref) {
    await page.goto('https://bsky.app' + postHref, { waitUntil: 'domcontentloaded' }); await settle();
    await page.screenshot({ path: `out/thread__${tag}__${scheme}.png` });
  }
  console.log(tag, scheme, 'captured profile, feed' + (postHref ? ', thread' : ''));
  await ctx.close();
}
await browser.close();
