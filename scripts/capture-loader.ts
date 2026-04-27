import { chromium } from '@playwright/test';
import { mkdir, rm } from 'fs/promises';

// Capture a high-res recording of the Saree DNA loader animation
// (rendered in isolation at /test-loader) for use as a marketing asset.
// Output: /tmp/loader-capture/<random>.webm — post-processed by ffmpeg.

const OUT_DIR = '/tmp/loader-capture';

async function main() {
  // Clean previous run so we always know which file is fresh.
  await rm(OUT_DIR, { recursive: true, force: true });
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });

  // Pre-warm the route + images BEFORE we arm recordVideo. This separates the
  // dev-server compile + first-paint cost from the actual recording window.
  const warmup = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const warmPage = await warmup.newPage();
  await warmPage.goto('http://localhost:3000/test-loader', {
    waitUntil: 'load',
  });
  // Touch each card url so the Next image cache is hot for the recording pass.
  const cardUrls = [
    'heir',
    'romantic',
    'wanderer',
    'maximalist',
    'tussar',
    'folklorist',
    'mul',
    'occasionalist',
    'modernist',
  ].map((s) => `http://localhost:3000/cards/${s}.jpg`);
  await Promise.all(
    cardUrls.map((u) => warmPage.goto(u).catch(() => undefined)),
  );
  await warmup.close();

  // Now the recording context.
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2, // retina-quality
    recordVideo: {
      dir: OUT_DIR,
      size: { width: 1920, height: 1080 },
    },
  });
  const page = await context.newPage();

  const startedAt = Date.now();
  await page.goto('http://localhost:3000/test-loader', {
    waitUntil: 'load',
  });

  // Wait until the page signals that all card images are decoded and the
  // ResultLoader has been mounted. This is the t=0 of the animation.
  await page.waitForFunction(
    () =>
      (window as unknown as { __loaderReady?: boolean }).__loaderReady === true,
    null,
    { timeout: 10000 },
  );

  // LaunchLoader runs PHASE1=2.0 + PHASE2=1.8 + PHASE3=0.7 = 4.5s of motion,
  // then we want ~1.8s of fullscreen hold on the Maximalist card. Total ~6.5s.
  // Add a small tail so the final frame settles cleanly before we close.
  await page.waitForTimeout(6800);

  await context.close(); // forces video flush
  await browser.close();

  console.log(`capture done in ${Date.now() - startedAt}ms — see ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
